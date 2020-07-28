from .models import Place
from django.conf import settings

def place_info(request):
    return {
        'OWNER': Place.objects.first(),
        }