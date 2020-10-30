from rest_framework import serializers
from .models import Leave


class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = ('AnnualLeave',
                  'ParentalLeave',
                  'SickandCarerLeave',
                  'CompassionateandBereavementLeave',
                  'CommunityServiceLeave',
                  'LongServiceLeave',
                  'BirthdayLeave')
