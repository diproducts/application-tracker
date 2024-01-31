from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Preferences


@receiver(post_save, sender=get_user_model())
def create_preferences(sender, instance, created, **kwargs):
    """
    Creating Preferences for every newly registered user.
    """
    if created:
        Preferences.objects.create(user=instance)
