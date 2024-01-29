from django.apps import AppConfig


class ApplicationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'application_tracker.applications'

    def ready(self):
        from . import signals  # noqa: F401
