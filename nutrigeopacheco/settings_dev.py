import os
from .settings import BASE_DIR

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']


# Application definition

INSTALLED_APPS = []

MIDDLEWARE = []

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Media files for FileFields and ImageFields
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = "/media/"

# EMAIL SETTINGS
EMAIL_SENDER_CONSULTA = os.getenv('EMAIL_SENDER_CONSULTA')
EMAIL_SENDER_COMPRAS = os.getenv('EMAIL_SENDER_COMPRAS')
EMAIL_ERROR_REPORT = os.getenv('EMAIL_ERROR_REPORT')
EMAIL_OWNER = os.getenv('EMAIL_OWNER')
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
]
