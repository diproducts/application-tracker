from typing import List

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    name = models.CharField(max_length=255, unique=False, null=False, blank=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS: List[str] = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
