from django.db import models
from django.db.models import Q
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import (
    post_delete,
    pre_save,
    post_save
)
from django.utils import timezone


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
    cv = models.FileField('CV', null=True, blank=True, validators=[pdf_or_word_file_validator])
    cover_letter = models.FileField(null=True, blank=True, validators=[pdf_or_word_file_validator])
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    objects = ApplicationManager()

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.company_name
    
@receiver(post_delete, sender=Application)
def application_post_delete(sender, instance, **kwargs):
    '''
    Deleting cv and cover_letter files from storage after deleting an application.
    '''
    instance.cv.delete(save=False)
    instance.cover_letter.delete(save=False)

@receiver(pre_save, sender=Application)
def application_pre_save(sender, instance, **kwargs):
    '''
    Deleting old cv and cover_letter files from storage if they are modified.
    '''
    try:
        obj = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        pass
    else:
        if not obj.cv == instance.cv:
            obj.cv.delete(save=False)
        if not obj.cover_letter == instance.cover_letter:
            obj.cover_letter.delete(save=False)


@receiver(post_save, sender=Application)
def application_post_save(sender, instance, created, **kwargs):
    '''
    Creating the initial "not_applied" phase for the newly created application.
    '''
    if created:
        ApplicationPhase.objects.create(application=instance, name='not_applied')


class ApplicationPhase(models.Model):
    PHASE_NAME_CHOICES = [
        ('not_applied', 'Not applied'),
        ('applied', 'Applied'),
        ('phone_screening', 'Phone screening'),
        ('interview', 'Interview'),
        ('technical_interview', 'Technical interview'),
        ('rejected', 'Rejected'),
        ('offer', 'Offer')
    ]

    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='phases')
    name = models.CharField(max_length=30, choices=PHASE_NAME_CHOICES)
    date = models.DateTimeField(default=timezone.now)
    contacts = models.CharField(max_length=255, help_text='Provide contacts of the person of reference', null=True, blank=True)
    notes = models.TextField(help_text='Any notes', null=True, blank=True)
    offered_salary = models.PositiveIntegerField(help_text='Your offered salary', null=True, blank=True)

    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return f'{self.name} for {self.application}' 