from rest_framework import serializers
from .models import Invite

class InviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invite
        fields = ('Admin_ID', 'EMP_ID', 'Invite_Status', 'Invite_Date', 'Invite_Time')
