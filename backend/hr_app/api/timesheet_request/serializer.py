from rest_framework import serializers
from .models import TimeSheetRequest


class TimeSheetRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSheetRequest
        fields = ('request_id', 'timesheet_title', 'timesheet_startDate',
                  'timesheet_endDate', 'timesheet_hours')
