from datetime import datetime
from calendar import monthrange

from .filters import ScheduleFilter
from .models import Schedule
from .serializer import ScheduleSerializer
from api.employee.models import Employee

from rest_framework import viewsets
from django_filters import rest_framework as filters


class ScheduleViewSet(viewsets.ModelViewSet):
    serializer_class = ScheduleSerializer
    queryset = Schedule.objects.all()
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = ScheduleFilter

    def get_queryset(self):
        # employee = Employee.objects.get(login=self.request.query_params['login_id'])
        queryset = Schedule.objects.filter(employee=self.request.user.LoginID)
        default_from_date = datetime.today().replace(day=1).date()
        date_year = default_from_date.year
        date_month = default_from_date.month
        default_to_date = datetime.today().replace(day=monthrange(date_year, date_month)[1]).date()

        if self.request.method == 'GET':
            if self.request.query_params:
                return queryset.filter(fromDate__range=[self.request.query_params['fromDate'],
                                                        self.request.query_params['toDate']]).order_by('fromDate')
            return queryset.filter(fromDate__range=[default_from_date, default_to_date]).order_by('fromDate')
        return queryset

