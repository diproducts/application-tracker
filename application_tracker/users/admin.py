from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = (
        'email',
        'is_staff',
        'is_active',
        'name',
        'date_joined',
    )
    list_filter = (
        'email',
        'is_staff',
        'is_active',
        'date_joined',
    )
    fieldsets = (
        (None, {
            'fields': ('email', 'password', 'name', 'date_joined', 'last_login')
        }),
        ('Permissions', {
            'fields': (
                'is_staff',
                'is_active',
                'groups',
                'user_permissions',
            )
        }),
    )
    add_fieldsets = ((
        None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'password1',
                'password2',
                'name',
                'is_staff',
                'is_active',
                'groups',
                'user_permissions',
            )
        }
    ),)
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(User, CustomUserAdmin)
