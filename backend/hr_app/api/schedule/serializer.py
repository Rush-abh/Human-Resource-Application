from rest_framework import serializers
from .models import Schedule


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ('employee', 'shift_start_time', 'shift_end_time',
                  'fromDate', 'toDate', 'branch_location', 'break_duration', 'deleted')
