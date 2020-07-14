from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.core.mail import send_mail
from django.template.loader import render_to_string

from nutrigeopacheco.settings import EMAIL_OWNER, EMAIL_SENDER

# Create your views here.

def index(request):
    return HttpResponseRedirect(reverse("nutri:contact"))

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name', None)
        email = request.POST.get('email', None)
        tel = request.POST.get('tel', None)
        message = request.POST.get('message', None)
        
        check_send = send_contact_email(email, message, name, tel)

        return JsonResponse({'success': check_send})

    return render(request, 'nutri/contact.html')

def send_contact_email(email, message, name, tel=None):
    
    if not all([email, message, name]): return False
    
    # Set email data
    subject = 'Consulta Web'
    template_email ='nutri/components/contact_email.html'
    context = {
        'name': name,
        'email': email,
        'tel': tel,
        'message': message,
    }

    content = render_to_string(template_email, context=context)
    #content_html = render(template_email, context=context)
    try:
        send_mail(
            subject,
            content,
            EMAIL_SENDER,
            [EMAIL_OWNER],
            html_message= content,
            fail_silently=False,
        )
    except Exception as err:
        print(err)
        return False

    return True



# DEFINE REST API
# Import modules
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product, ProductImages
from .serializers import ProductSerializer

# Define view functions
@api_view(['GET'])
def get_products(request):
    """
        Return a JSON format list of all products that are active.
    """
    if request.method == 'GET':
        print('request')
        # Get all active products
        products = Product.objects.filter(is_active=True).order_by('title')
        #serialize the data
        serializer = ProductSerializer(products, many=True)
        
        return Response(serializer.data)
        #return JsonResponse(serializer.data, safe=False)
    #return JsonResponse([])
    return Response([], status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_product_detail(request, pk):
    """
        Return a JSON format list of all products that are active.
    """
    if request.method == 'GET':
        # Get all active products
        products = Product.objects.filter(pk=pk, is_active=True)
        #serialize the data
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
        #return JsonResponse(serializer.data, safe=False)
    #return JsonResponse([])s
    return Response([], status=status.HTTP_400_BAD_REQUEST)


