from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'password')
        extra_kwargs = {'id': {'read_only': True}, 'password': {'write_only': True}}

    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e)
        return value

    def validate_email(self, value):
        return value.lower().strip()

    def create(self, validated_data):
        user = User.objects.create(email=validated_data['email'], name=validated_data['name'])

        user.set_password(validated_data['password'])
        user.save()

        return user


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
