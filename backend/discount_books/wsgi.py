"""
WSGI config for discount_books project.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'discount_books.settings')
application = get_wsgi_application()
