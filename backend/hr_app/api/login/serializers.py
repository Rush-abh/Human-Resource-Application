from rest_framework import serializers
from .models import Login


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        # fields = ('LoginID',
        #           'EmailAddress',
        #           'Password',
        #           'AccountType')
        fields = ('email', 'password')
