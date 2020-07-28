from django import template

register = template.Library()

@register.inclusion_tag('nutri/components/header.html')
def header(owner):
    return {'logo': owner.logo.url}


@register.inclusion_tag('nutri/components/footer.html')
def footer_social_network(owner):
    context = {
        'instagram_link': owner.instagram,
        'whatsapp_link': owner.whatsapp,
        'cel_phone': owner.phone_number,
        'email': owner.email,
        'name': owner.name,
        'surname': owner.surname
    }
    return context

@register.inclusion_tag('nutri/components/contact_form.html')
def contact_form():
    return {
        'content': 'Consultorio de Nutrición Clínica para adultos y familias. '
                    'Se realizan consultas virtuales y presenciales. '
                    'Envíanos tu consulta para más información.'
    }
