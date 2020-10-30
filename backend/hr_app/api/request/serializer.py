from rest_framework import serializers
from .models import Request


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ('requestedBy', 'requestToManager', 'request_type',
                  'request_submitted_time', 'request_submitted_date')
