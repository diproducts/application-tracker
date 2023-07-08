from django.db import models
from django.db.models import Q, F
from django.db.models.functions import Coalesce
from django.conf import settings


from .validators import pdf_or_word_file_validator

User = settings.AUTH_USER_MODEL

class ApplicationQuerySet(models.QuerySet):
    def search(self, query, user):
        lookup = Q(company_name__icontains=query) | Q(position__icontains=query)
        qs = self.filter(owner=user).filter(lookup)
        return qs
    

class ApplicationManager(models.Manager):
    def get_queryset(self):
        return ApplicationQuerySet(self.model, using=self._db)

    def search(self, query, owner):
        return self.get_queryset().search(query, user=owner)


class Application(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    company_name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    url = models.URLField(null=True, blank=True)
    cv = models.FileField('CV', null=True, blank=True, validators=[pdf_or_word_file_validator])
    cover_letter = models.FileField(null=True, blank=True, validators=[pdf_or_word_file_validator])
    offered_salary = models.PositiveIntegerField(help_text='Your offered salary', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    objects = ApplicationManager()

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'{str(self.id)}. {self.company_name}'
    

class ApplicationPhase(models.Model):
    PHASE_NAME_CHOICES = [
        ('applied', 'Applied'),
        ('phone_screening', 'Phone screening'),
        ('interview', 'Interview'),
        ('technical_interview', 'Technical interview'),
        ('rejected', 'Rejected'),
        ('offer', 'Offer')
    ]

    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='phases')
    name = models.CharField(max_length=30, choices=PHASE_NAME_CHOICES)
    date = models.DateField(help_text='The date of the event', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    contacts = models.CharField(max_length=255, help_text='Provide contacts of the person of reference', null=True, blank=True)
    notes = models.TextField(help_text='Any notes', null=True, blank=True)

    class Meta:
        ordering = [Coalesce(F('date'), F('created')).desc()]
    
    def __str__(self):
        return f'{self.name} for {self.application}' 