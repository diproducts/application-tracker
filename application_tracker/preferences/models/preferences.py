from django.conf import settings
from django.db import models

from application_tracker.general.validators import pdf_or_word_file_validator


class Preferences(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='preferences')
    default_cv = models.FileField('Default CV', null=True, blank=True, validators=[pdf_or_word_file_validator])
