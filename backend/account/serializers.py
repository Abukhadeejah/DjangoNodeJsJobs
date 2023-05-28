from django.contrib.auth.models import User
# from django.db.models import Q
from rest_framework import serializers


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            # 'username': {'required': True, 'allow_blank': False},
            'first_name': {'required': True, 'allow_blank': False},
            'last_name': {'required': True, 'allow_blank': False},
            'email': {'required': True, 'allow_blank': False},
            'password': {'required': True, 'allow_blank': False, 'min_length': 6},
            # 'passport_number': {'required': True, 'allow_blank': False},
        }

    # def validate(self, attrs):
    #     email = attrs.get('email')
    #     passport_number = attrs.get('passport_number')
    #     username = attrs.get('username')

    #     # Check if a user with the same email, passport number, or username already exists
    #     if User.objects.filter(Q(email=email) | Q(passport_number=passport_number) | Q(username=username)).exists():
    #         raise serializers.ValidationError(
    #             'An account with this email, passport number, or username already exists.\n'
    #             'Kindly login with the previously registered account. If you have forgotten the password, '
    #             'click on "Forgot Password" to reset it.'
    #         )

    #     return attrs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username')