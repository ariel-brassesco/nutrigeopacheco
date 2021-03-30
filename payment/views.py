import json
from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.core.mail import send_mail
from django.template.loader import render_to_string

from functools import reduce
import uuid
import mercadopago as mp_payment
from nutrigeopacheco.settings import MERCADOPAGO_ACCESS_TOKEN
from nutrigeopacheco.settings import EMAIL_SENDER_COMPRAS, EMAIL_OWNER, EMAIL_ERROR_REPORT

from nutri.models import Product, Place, Promotion
from nutri.serializers import ProductSerializer, PromotionSerializer
from .models import Order, OrderItem

# Define some constant data
FIELDS_FORM = (
    'name', 'email', 'tel',
    'country', 'province', 'city',
    'street', 'number', 'depto',
    'comment', 'payment_method', 'apply_discount'
)
REQUIRED_FIELDS = ('name', 'email', 'payment_method')
PAYMENT_METHODS = ('mercadopago', 'efectivo', 'transferencia')
DISCOUNT_FIELD = 'apply_discount'

# Create your views here.


def payment(request):
    if (request.method == 'POST'):
        items = json.loads(request.body).get("items", [])
        customer_data = json.loads(request.body).get("data", {})
        check_data, data = get_form_data(customer_data)
        # Redirect to home page if the email and name are not in the request
        if not check_data:
            return JsonResponse({"text": "Por favor verifica los datos ingresados."}, status=400)
        # Create cart in session
        # Retrieve products and general promotions from database
        products = map(lambda item: (
            Product.objects.get(id=item["id"]), item["quantity"]), items)
        promos = Promotion.objects.filter(
            is_active=True,
            target__in=['shipping', 'all', 'payment']
        )
        # Serialize the product objects and add the quantity key
        items = [
            {**ProductSerializer(prod).data, 'quantity': int(q)} for prod, q in products]
        # Serialize the promotion objects
        discounts = PromotionSerializer(promos, many=True).data
        # Create the context dictionary, set and uuid for cart_id
        context = {
            'cart_id': str(uuid.uuid4()),
            'items': items,
            'discounts': discounts,
            'user': data
        }
        # Save the items in session
        request.session['cart'] = context
        # Check available stock and update
        if not check_stock(items):
            return JsonResponse({"payment": False})
        # Save the data in session
        payment_method = data['payment_method']
        PAYMENT_ACTIONS = dict(
            zip(PAYMENT_METHODS, (mercadopago, efectivo, transferencia)))

        if (payment_method in PAYMENT_METHODS):
            return PAYMENT_ACTIONS[payment_method](context, request=request)

    # Redirect to home page
    return JsonResponse({"text": "Upss!! Algo salió mal inténtalo de nuevo."}, status=400)


def efectivo(data, request=None):
    create_order(data)
    print("Success Payment")
    return JsonResponse({"payment": True, "method": data['user']['payment_method']})


def transferencia(data, request=None):
    create_order(data)
    print("Success Payment")
    return JsonResponse({"payment": True, "method": data['user']['payment_method']})


def mercadopago(data, request=None):
    # Create the mercadopago payment and redirect to mercadopago page
    mp = mp_payment.MP(MERCADOPAGO_ACCESS_TOKEN)
    # Define the key items for preference
    ITEMS_KEYS = (
        'id', 'title', 'description',
        'category_id', 'picture_url',
        'quantity', 'currency_id', 'unit_price'
    )
    # Get items from session
    items = data['items']
    discount = data['user'].get(DISCOUNT_FIELD)
    # Convert items to dictionary for preference
    logo_picture = Place.objects.first().logo.url
    items = [
        {
            **item,
            'category_id': 'others',
            'picture_url': logo_picture,
            'currency_id': 'ARS',
            'unit_price': apply_discount(item.get('price'), discount)[0]
        } for item in items
    ]
    items = [{key: item.get(key) for key in ITEMS_KEYS} for item in items]
    # Define the preference
    preference = {
        'items': items,
        'binary_mode': True,
        'back_urls': {
            "success": f"{request.scheme}://{request.get_host()}/pago/success/{data['cart_id']}/",
            "failure": f"{request.scheme}://{request.get_host()}/pago/failure",
        },
        'auto_return': 'approved',
        'payment_methods': {
            "excluded_payment_types": [
                {
                    "id": "ticket"
                },
                {
                    "id": "atm"
                }
            ]
        },
        # "notification_url": "https://www.your-site.com/ipn",
        "external_reference": data['cart_id'],
    }
    # Create the preference
    preferenceResult = mp.create_preference(preference)
    # Save preference response in session
    request.session['cart']['preference'] = preferenceResult
    # Create the context dict with url of mercadopago
    context = {
        'payment': True,
        'method': PAYMENT_METHODS[0],
        'url': preferenceResult['response']['init_point'],
    }
    return JsonResponse(context)
    # return render(request, 'payment/mercadopago.html', context=context)


def success_payment(request, cart_id):
    check_uuid = str(cart_id) == request.session['cart']['cart_id']
    check_status = request.GET.get('collection_status') == 'approved'

    if check_uuid and check_status:
        cart = request.session['cart']
        mp_data = {
            'collection_id': request.GET.get('collection_id'),
            'payment_type': request.GET.get('payment_type'),
            'merchant_order_id': request.GET.get('merchant_order_id')
        }

        create_order(cart, **mp_data)
        # Clean the session['cart'] data
        del request.session['cart']
        print("Success Payment")
        return JsonResponse({'payment': True, 'method': PAYMENT_METHODS[0]})
    return JsonResponse({'payment': False, 'method': PAYMENT_METHODS[0]})


def failure_payment(request):
    print("Failure Payment")
    # Get items from request and release the stock
    items = generate_items_data(request.session['cart']['items'])
    release_stock(items)
    # Clean the session['cart'] data
    del request.session['cart']
    return JsonResponse({"ok": True})

# Auxiliary functions


def get_form_data(form_data):
    # Get the data from request
    data = {field: form_data.get(field, '') for field in FIELDS_FORM}
    data_required = tuple([form_data.get(field, '')
                           for field in REQUIRED_FIELDS])
    # Check required data has a value
    if not all(data_required):
        return (False, {})
    # Check payment_mehod has a valid value
    if not (data['payment_method'] in PAYMENT_METHODS):
        return (False, {})
    # Tranform data 'country' and 'province'
    data['country'] = 'argentina'
    data['province'] = data['province'].replace('_', ' ')

    return (True, data)


def check_stock(items):
    check = map(lambda item: Product.objects.get(
        id=item['id']).check_available_stock(item['quantity']), items)
    if all(check):
        for item in items:
            prod = Product.objects.get(id=item['id'])
            prod.set_available_stock(item['quantity'])
        return True
    return False


def generate_items_data(cart_items):
    KEYS = ['id', 'title', 'price', 'quantity']
    items = [{key: item[key] for key in KEYS} for item in cart_items]
    return items


def generate_order_data(cart, **mpargs):
    cart_id = cart['cart_id']
    user_data = cart['user']
    user_name = f"{user_data['name']}"
    user_address = f"{user_data['street']} {user_data['number']} {user_data['depto']}"
    user_city = f"{user_data['city']}, {user_data['province']}, {user_data['country']}"
    payment_method = user_data['payment_method']

    order_data = {
        'order_id': cart_id,
        'user': user_name,
        'address': user_address,
        'city': user_city,
        'comment': user_data['comment'],
        'email': user_data['email'],
        'phone_number': user_data['tel']
    }

    if payment_method == 'mercadopago':
        order_data = {
            **order_data,
            'collection_id': mpargs.get('collection_id'),
            'payment_type': mpargs.get('payment_type'),
            'merchant_order_id': mpargs.get('merchant_order_id')
        }
    else:
        order_data = {
            **order_data,
            'collection_id': payment_method,
            'payment_type': payment_method,
            'merchant_order_id': payment_method
        }
    return order_data


def update_stock(items):
    '''
    Equal the value of stock to available_stock for each item in items argument.
    '''
    for item in items:
        prod = Product.objects.get(id=item['id'])
        prod.update_stock()


def release_stock(items):
    '''
    Equal the value of available_stock to stock for each item in items argument.
    '''
    for item in items:
        prod = Product.objects.get(id=item['id'])
        prod.release_stock()


def apply_discount(amount, discount_id):
    try:
        dis = Promotion.objects.filter(is_active=True).get(id=discount_id)
    except:
        return (amount, None)

    if dis._type == 'percent':
        amount_dis = float(dis.code.split('-')[0])/100*amount
        return ((amount - amount_dis), amount_dis)
    return (amount, None)


def create_order(cart, **mpargs):
    items = generate_items_data(cart['items'])
    order_data = generate_order_data(cart, **mpargs)
    total_order = reduce(lambda x, y: x + y['price']*y['quantity'], items, 0)
    payment_method = cart['user']['payment_method']
    status = 'approved' if payment_method == 'mercadopago' else 'pending'

    # Aplicar descuentos
    discount = cart['user'].get(DISCOUNT_FIELD)
    amount_discount = None
    if discount:
        total_order, amount_discount = apply_discount(total_order, discount)

    # Generate Order
    try:
        new_order = Order.objects.create(
            status=status, total=total_order, **order_data)  # sirve
        new_order.save()  # sirve
        # Generate OrderItems
        for item in items:
            new_item = OrderItem.objects.create(
                order=new_order,
                product=item['title'],
                quantity=item['quantity'],
                unitary_price=item['price']
            )
            new_item.save()
        # Update the stock in database for each item
        update_stock(items)
    except:
        send_error_email(
            cart_id=cart['cart_id'],
            user=cart['user']['email'],
            payment_method=payment_method
        )
    # Send email to payer
    user_info = cart['user']
    items_info = cart['items']

    send_order_email(
        user=user_info,
        items=items_info,
        payment_method=payment_method,
        OWNER=Place.objects.first(),
        total_order=total_order,
        discount=amount_discount
    )


def send_order_email(**kargs):
    # Set email data
    subject = 'Tu Compra NutriGeoPacheco'
    template_email = 'payment/emails/purchase_email.html'
    content = render_to_string(template_email, context=kargs)
    payer_email = kargs['user']['email']

    try:
        send_mail(
            subject,
            content,
            EMAIL_SENDER_COMPRAS,
            [payer_email, EMAIL_OWNER],
            html_message=content,
            fail_silently=False,
        )
    except Exception as err:
        print("Send email error")
        print(err)
        return False
    return True


def send_error_email(**kargs):
    # Set email data
    subject = 'Error en Compra de NutriGeoPacheco'
    content = f'Ocurrio un error al guardar la orden {kargs["card_id"]}.'
    content += f'Email del usuario: {kargs["user"]}.'
    content += f'Metodo de pago: {kargs["payment_method"]}.'

    send_mail(
        subject,
        content,
        EMAIL_SENDER_COMPRAS,
        [EMAIL_ERROR_REPORT],
        html_message=content,
        fail_silently=False,
    )


def test_email(request):
    return render(request, 'payment/emails/purchase_email.html', context={'success': False})
