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
