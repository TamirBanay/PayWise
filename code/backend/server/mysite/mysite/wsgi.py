import os
import sys

from django.core.wsgi import get_wsgi_application

SERVER_BASE = '/var/www/paywise/server'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

sys.path.append(SERVER_BASE)
sys.path.append(f'{SERVER_BASE}/mysite')
sys.path.append(f'{SERVER_BASE}/users')
sys.path.append(f'{SERVER_BASE}/notifications')


application = get_wsgi_application()
