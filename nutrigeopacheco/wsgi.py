"""
WSGI config for nutrigeopacheco project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os
from pathlib import Path
from dotenv import load_dotenv

from django.core.wsgi import get_wsgi_application

try:
    dir = Path(__file__).resolve().parent.parent
    env_path = os.path.join(dir, ".env")
    load_dotenv(dotenv_path=env_path)
except Exception as e:
    print('no .env file, using default os env')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nutrigeopacheco.settings')

application = get_wsgi_application()
