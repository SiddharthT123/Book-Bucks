"""
Asynchronous server gateway interface config for discount_books project.
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'discount_books.settings')
application = get_asgi_application()
