import os

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'application_tracker.project.settings')

app = Celery('application_tracker')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()
