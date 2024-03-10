from allauth.account import app_settings
from allauth.account.adapter import get_adapter
from allauth.account.utils import filter_users_by_email, user_pk_to_url_str, user_username
from dj_rest_auth.forms import AllAuthPasswordResetForm
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import PasswordResetSerializer, UserDetailsSerializer
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from rest_framework import serializers

from application_tracker.preferences.serializers import PreferencesSerializer

User = get_user_model()


class UserSerializer(UserDetailsSerializer):
    preferences = PreferencesSerializer(read_only=True)

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('name', 'preferences')


class UserRegisterSerializer(RegisterSerializer):
    username = None

    name = serializers.CharField(required=True, max_length=255)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['name'] = self.validated_data.get('name', '')  # type: ignore
        return data_dict


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, validated_data):
        user = authenticate(username=validated_data['email'], password=validated_data['password'])
        if not user:
            raise serializers.ValidationError('Incorrect email or password')
        return user

    def validate_email(self, value):
        return value.lower().strip()


class CustomAllAuthPasswordResetForm(AllAuthPasswordResetForm):

    def clean_email(self):
        """
        Invalid email should not raise error, as this would leak users
        for unit test: test_password_reset_with_invalid_email
        """
        email = self.cleaned_data['email']
        email = get_adapter().clean_email(email)
        self.users = filter_users_by_email(email, is_active=True)
        return self.cleaned_data['email']

    def save(self, request, **kwargs):
        current_site = get_current_site(request)
        email = self.cleaned_data['email']
        token_generator = kwargs.get('token_generator', default_token_generator)

        for user in self.users:
            temp_key = token_generator.make_token(user)

            path = f'/auth/password/reset/confirm/{user_pk_to_url_str(user)}/{temp_key}'
            url = settings.FRONTEND_BASE_URL + path
            # Values which are passed to password_reset_key_message.txt
            context = {
                'current_site': current_site,
                'user': user,
                'password_reset_url': url,
                'request': request,
                'path': path,
            }

            if app_settings.AUTHENTICATION_METHOD != app_settings.AuthenticationMethod.EMAIL:
                context['username'] = user_username(user)
            get_adapter(request).send_mail('users/email/password_reset_key', email, context)

        return self.cleaned_data['email']


class MyPasswordResetSerializer(PasswordResetSerializer):

    def validate_email(self, value):
        # use the custom reset form
        self.reset_form = CustomAllAuthPasswordResetForm(data=self.initial_data)  # type: ignore
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(self.reset_form.errors)

        return value
