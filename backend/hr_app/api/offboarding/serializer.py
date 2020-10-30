from rest_framework import serializers
from .models import Offboarding


class OffboardingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offboarding
        fields = ('TaskID',
                  'Task1',
                  'Task2',
                  'Task3',
                  'Task4',
                  'Task5')
