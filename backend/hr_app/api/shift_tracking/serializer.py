from rest_framework import serializers
from .models import Shift_tracking
from ..employee.serializer import EmployeeSerializer


class ShiftTrackingSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()

    class Meta:
        model = Shift_tracking
        fields = "__all__"


class CreateShiftTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift_tracking
        fields = ['employee', 'shift_start_date', 'track_shift_start_time', 'shift_status']