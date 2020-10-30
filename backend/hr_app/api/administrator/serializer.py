from rest_framework import serializers
from .models import Administrator

class AdministratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrator
        fields = ('Login_ID', 'Admin_Type', 'Super_Admin_ID')
