from rest_framework import serializers
from .models import Announcement


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ('ID', 'Approval_Message', 'Approval_Status', 'Approval_Received_Date', 'Approval_Received_Time',
                  'Approval_Finish_Date', 'Approval_Finish_Time')
