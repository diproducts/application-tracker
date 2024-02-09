from django.core.files.base import ContentFile

from .models import Preferences


def save_cv_as_default(cv, preferences: Preferences) -> None:
    preferences.default_cv = ContentFile(cv.read(), name=cv.name)  # type: ignore
    preferences.save()
