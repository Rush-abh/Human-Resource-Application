from rest_framework import serializers
from .models import Approval


class ApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Approval
        fields = ('employee', 'notification', 'approval_message',
                  'approval_status', 'approval_received_date', 'approval_received_time', 'approval_finish_date', 'approval_finish_time')
