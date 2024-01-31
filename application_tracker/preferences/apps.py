from django.apps import AppConfig


class PreferencesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'application_tracker.preferences'

    def ready(self) -> None:
        from . import signals  # noqa: F401
