from django import template
from functools import reduce

register = template.Library()

PROVINCIAS_ARGENTINAS = (
    ('buenos_aires','buenos aires'),
    ('capital_federal','capital federal'),
    ('catamarca', 'catamarca'),
    ('chaco', 'chaco'),
    ('chubut', 'chubut'),
    ('córdoba', 'córdoba'),
    ('corrientes', 'corrientes'),
    ('entre_ríos', 'entre ríos'),
    ('formosa', 'formosa'),
    ('jujuy', 'jujuy'),
    ('la_pampa', 'la pampa'),
    ('la_rioja', 'la rioja'),
    ('mendoza', 'mendoza'),
    ('neuquén', 'neuquén'),
    ('río_negro', 'río negro'),
    ('salta', 'salta'),
    ('san_juan', 'san juan'),
    ('san_luis', 'san luis'),
    ('santa_cruz', 'santa cruz'),
    ('santa_fe', 'santa fe'),
    ('santiago_del_estero', 'santiago del estero'),
    ('tierra_del_fuego', 'tierra del fuego'),
    ('tucuman', 'tucumán')
)

@register.inclusion_tag('payment/components/payment_form.html')
def payment_form(cart_id):
    return {'cart_id': cart_id}

@register.inclusion_tag('payment/components/province_select.html')
def select_province(regions=None, default='santa_fe'):
    
    provincias = PROVINCIAS_ARGENTINAS if not regions else regions

    return {
        'provincias': provincias,
        'default': default
        }

@register.inclusion_tag('payment/components/show_item.html')
def show_item(item):
    return {
        'img': item['images'][0],
        'title': item['title'],
        'quantity': item['quantity'],
        'unit_price': item['price'],
    }

@register.filter(name='total_purchase')
def total_purchase(items):
    subtotal = [(float(item['price']), int(item['quantity'])) for item in items]
    return reduce(lambda x, y: x + y[0]*y[1], subtotal,0)

@register.inclusion_tag('payment/components/show_gen_promo.html')
def gen_promo_info(promo):
    res = {**promo, 'type': promo['_type']}
    del res['_type']
    return res
