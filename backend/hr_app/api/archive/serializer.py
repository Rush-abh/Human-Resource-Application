from rest_framework import serializers
from .models import Employee_Archive, ResidencyStatus_Archive

class ResidencyStatus_ArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResidencyStatus_Archive
        fields = "__all__"

class Employee_ArchiveSerializer(serializers.ModelSerializer):

    residencystatus = ResidencyStatus_ArchiveSerializer(many = True, read_only = True)

    class Meta:
        model = Employee_Archive
        fields = "__all__"
