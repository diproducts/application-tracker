from django.conf import settings
from django.db import models

from application_tracker.general.validators import pdf_or_word_file_validator


class Application(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    company_name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    url = models.URLField(null=True, blank=True)
    job_description = models.TextField(null=True, blank=True)
    cv = models.FileField('CV', null=True, blank=True, validators=[pdf_or_word_file_validator])
    cover_letter = models.FileField(null=True, blank=True, validators=[pdf_or_word_file_validator])
    offered_salary = models.PositiveIntegerField(help_text='Your offered salary', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{str(self.pk)}. {self.company_name}'
