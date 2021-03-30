import os
import dj_database_url

ALLOWED_HOSTS = ['nutrigeopacheco.herokuapp.com', 'nutrigeopacheco.com']

# Application definition
INSTALLED_APPS = [
    'gdstorage',
    'anymail',
]

MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
DATABASES = {
    'default':  dj_database_url.config(conn_max_age=600)
}

# Google Drive Storage Settings
GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE = None
GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE_CONTENTS = os.getenv(
    'GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE_CONTENTS')
GOOGLE_DRIVE_STORAGE_MEDIA_ROOT = 'nutrigropacheco/media'

# Simplified static file serving.
# https://warehouse.python.org/project/whitenoise/
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

# SSL Configuration
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_CONTENT_TYPE_NOSNIFF = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
# For session dictionary modifications between request
SESSION_SAVE_EVERY_REQUEST = True

# EMAIL SETTINGS
EMAIL_SENDER_CONSULTA = os.getenv('EMAIL_SENDER_CONSULTA')
EMAIL_SENDER_COMPRAS = os.getenv('EMAIL_SENDER_COMPRAS')
EMAIL_ERROR_REPORT = os.getenv('EMAIL_ERROR_REPORT')
EMAIL_OWNER = os.getenv('EMAIL_OWNER')

EMAIL_HOST = os.getenv('MAILGUN_SMTP_SERVER')
EMAIL_HOST_USER = os.getenv('MAILGUN_SMTP_LOGIN')
EMAIL_HOST_PASSWORD = os.getenv('MAILGUN_SMTP_PASSWORD')
EMAIL_PORT = os.getenv('MAILGUN_SMTP_PORT')
EMAIL_USE_TLS = True

MAILGUN_API_KEY = os.getenv('MAILGUN_API_KEY')
MAILGUN_DOMAIN = os.getenv('MAILGUN_DOMAIN')
EMAIL_BACKEND = "anymail.backends.mailgun.EmailBackend"

# Defaults email values
DEFAULT_FROM_EMAIL = EMAIL_OWNER
# ditto (default from-email for Django errors)
SERVER_EMAIL = EMAIL_ERROR_REPORT


CORS_ORIGIN_WHITELIST = [
    "https://nutrigeopacheco.herokuapp.com",
    "https://nutrigeopacheco.com",
]
