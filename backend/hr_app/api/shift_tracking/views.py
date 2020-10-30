import json
import datetime
from pytz import timezone

from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist

from .models import Shift_tracking
from .serializer import ShiftTrackingSerializer, CreateShiftTrackerSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class ShiftTrackingViewSet(viewsets.ModelViewSet):
    queryset = Shift_tracking.objects.all()
    permission_classes = (IsAuthenticated,)
    # http_methods = ['get', 'post', 'put']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateShiftTrackerSerializer
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            return ShiftTrackingSerializer
        return ShiftTrackingSerializer

    def list(self, request, *args, **kwargs):
        queryset = Shift_tracking.objects.filter(shift_start_date=datetime.date.today())
        if self.request.query_params.get('exclude') and self.request.query_params.get('exclude') == "self":
            queryset = queryset.exclude(employee__login=request.user.LoginID)
        else:
            queryset = queryset.filter(employee__login=request.user.LoginID)

        serializer = ShiftTrackingSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        try:
            Shift_tracking.objects.get(employee=request.user.LoginID, shift_start_date=datetime.date.today())
            return HttpResponse('You already ended your shift', status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            # data = {
            #     'error': 'Your shift is already ended'
            # }
            data = {
                'employee': request.user.LoginID,
                'track_shift_start_time': datetime.datetime.now(tz=timezone("Australia/Melbourne")).strftime("%H:%M:%S"),
                'shift_start_date': datetime.date.today(),
                'shift_status': 'Shift_Started'
            }
            serializer = CreateShiftTrackerSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                data = json.dumps(serializer.data, indent=4, sort_keys=True)
                return HttpResponse(data, status=status.HTTP_201_CREATED)

    def start_break(self, data):
        data.update({
            'break_start_time': datetime.datetime.now(tz=timezone("Australia/Melbourne")).strftime("%H:%M:%S"),
            'shift_status': 'Break_Started'
        })
        return data

    def end_break(self, data):
        data.update({
            'break_end_time': datetime.datetime.now(tz=timezone("Australia/Melbourne")).strftime("%H:%M:%S"),
            'shift_status': 'Break_Ended'
        })
        return data

    def end_shift(self, data):
        data.update({
            'track_shift_end_time': datetime.datetime.now(tz=timezone("Australia/Melbourne")).strftime("%H:%M:%S"),
            'shift_status': 'Shift_Ended'
        })
        return data

    def update(self, request, *args, **kwargs):
        data = {}
        instance = Shift_tracking.objects.get(pk=self.kwargs.get('pk'))
        if request.query_params.get("event_type") == "start_break":
            data = self.start_break(data)
        if request.query_params.get("event_type") == "end_break":
            data = self.end_break(data)
        if request.query_params.get("event_type") == "end_shift":
            data = self.end_shift(data)
        serializer = ShiftTrackingSerializer(instance=instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            data = json.dumps(serializer.data, indent=4, sort_keys=True)
            return HttpResponse(data, status=status.HTTP_200_OK)
        return HttpResponse(data, status=status.HTTP_400_BAD_REQUEST)
    #
    # def retrieve(self, request, pk=None):
    #     pass
    #
    # def update(self, request, pk=None):
    #     pass
    #
    # def partial_update(self, request, pk=None):
    #     pass
    #
    # def destroy(self, request, pk=None):
    #     pass
