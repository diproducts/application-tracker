from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(UserDetailsSerializer):

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('name',)


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
