# Create your models here.
from django.db import models
from api.employee.models import Employee
import datetime
# Create your models here.


class Shift_tracking(models.Model):
    # this model is missing date for which the shift is being tracked.
    SHIFT_STATUS_CHOICES = [('Shift_Not_Started', 'Shift_Not_Started'), ('Shift_Started', 'Shift_Started'),
                            ('Break_Started', 'Break_Started'), ('Break_Ended', 'Break_Ended'),
                            ('Shift_Ended', 'Shift_Ended')]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    shift_start_date = models.DateField(default=datetime.date.today())
    track_shift_start_time = models.TimeField()
    track_shift_end_time = models.TimeField(blank=True, null=True)
    shift_status = models.CharField(choices=SHIFT_STATUS_CHOICES, default="Shift_Not_Started", max_length=17)
    break_start_time = models.TimeField(blank=True, null=True)
    break_end_time = models.TimeField(blank=True, null=True)
    latitude = models.DecimalField(max_digits=8, decimal_places=3, blank=True, null=True)
    longitude = models.DecimalField(max_digits=8, decimal_places=3, blank=True, null=True)
