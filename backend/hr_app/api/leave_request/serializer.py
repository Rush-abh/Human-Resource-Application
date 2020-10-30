from rest_framework import serializers
from .models import LeaveRequest


class LeaveRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = ('request_id', 'leave_document', 'leave_type',
                  'requested_leave_hours', 'request_message')
