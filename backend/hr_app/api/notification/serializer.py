from rest_framework import serializers
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('employee', 'notification_type', 'notification_title',
                  'notification_message', 'notification_date', 'notification_time')
