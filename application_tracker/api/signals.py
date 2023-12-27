from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

from .models import Application


@receiver(post_delete, sender=Application)
def application_post_delete(sender, instance, **kwargs):
    """
    Deleting cv and cover_letter files from storage after deleting an application.
    """
    instance.cv.delete(save=False)
    instance.cover_letter.delete(save=False)


@receiver(pre_save, sender=Application)
def application_pre_save(sender, instance, **kwargs):
    """
    Deleting old cv and cover_letter files from storage if they are modified.
    """
    try:
        obj = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        pass
    else:
        if not obj.cv == instance.cv:
            obj.cv.delete(save=False)
        if not obj.cover_letter == instance.cover_letter:
            obj.cover_letter.delete(save=False)
