from django import template
from nutrigeopacheco.settings import EMAIL_OWNER, TEL_OWNER, INSTAGRAM_OWNER, WHATSAPP_OWNER


register = template.Library()

@register.inclusion_tag('nutri/components/header.html')
def header():
    context = {}
    return context


@register.inclusion_tag('nutri/components/footer.html')
def footer_social_network():
    context = {
        'instagram_link': INSTAGRAM_OWNER,
        'whatsapp_link': WHATSAPP_OWNER,
        'cel_phone': TEL_OWNER,
        'email': EMAIL_OWNER,
    }
    return context

@register.inclusion_tag('nutri/components/contact_form.html')
def contact_form():
    return {
        'content': 'Consultorio de Nutrición Clínica para adultos y familias. '
                    'Se realizan consultas virtuales y presenciales. '
                    'Envíanos tu consulta para más información.'
    }
