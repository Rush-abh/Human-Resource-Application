from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import EmergencyContact


class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = "__all__"


class UpdateEmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        exclude = ['gender', 'id', 'employee']
