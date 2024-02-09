from django.db import models
from django.db.models import F
from django.db.models.functions import Coalesce

from .application import Application


class ApplicationPhase(models.Model):
    PHASE_NAME_CHOICES = [('applied', 'Applied'), ('phone_screening', 'Phone screening'), ('interview', 'Interview'),
                          ('technical_interview', 'Technical interview'), ('rejected', 'Rejected'), ('offer', 'Offer')]

    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='phases')
    name = models.CharField(max_length=30, choices=PHASE_NAME_CHOICES)
    date = models.DateField(help_text='The date of the event', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    contacts = models.CharField(
        max_length=255, help_text='Provide contacts of the person of reference', null=True, blank=True
    )
    notes = models.TextField(help_text='Any notes', null=True, blank=True)

    class Meta:
        ordering = [Coalesce(F('date'), F('created')).desc()]

    def __str__(self):
        return f'{self.name} for {self.application}'
