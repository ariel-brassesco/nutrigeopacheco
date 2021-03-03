#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import json
import os
from pathlib import Path
import sys
from dotenv import load_dotenv


def main():
    try:
        dir = Path(__file__).resolve().parent
        env_path = os.path.join(dir, ".env")
        load_dotenv(env_path)
    except Exception as e:
        print('no .env file, using default os env')

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nutrigeopacheco.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
