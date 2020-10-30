from rest_framework import serializers

from api.employee.serializer import EmployeeSerializer
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('teams', 'project_leader', 'project_name',
                  'project_description')


class ProjectSerializerWithManager(serializers.ModelSerializer):
    project_leader = EmployeeSerializer()

    class Meta:
        model = Project
        fields = "__all__"
