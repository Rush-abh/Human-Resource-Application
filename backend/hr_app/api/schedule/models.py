# Create your models here.
from django.db import models
from api.employee.models import Employee
import datetime
# Create your models here.


class Schedule(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    shift_start_time = models.TimeField()
    shift_end_time = models.TimeField()
    fromDate = models.DateField()
    toDate = models.DateField()
    branch_location = models.CharField(max_length=30)
    break_duration = models.DurationField(default=datetime.timedelta(minutes=30))
    deleted = models.BooleanField(default=False)
