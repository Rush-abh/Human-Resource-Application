import os
from .base import *

DEBUG = True


ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

INSTALLED_APPS += [
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'read_default_file': './hr_app.cnf',
        },
    }
}

STATICFILES_DIRS = [os.path.join(FRONTEND_DIR, 'build', 'static')]

STATICFILES_STORAGE = (
    'whitenoise.storage.CompressedManifestStaticFilesStorage')

STATIC_ROOT = os.path.join(BACKEND_DIR, '../../static')

STATIC_URL = '/static/'

WHITENOISE_ROOT = os.path.join(FRONTEND_DIR, 'build', 'root')
