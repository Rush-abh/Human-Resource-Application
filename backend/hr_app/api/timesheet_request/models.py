from django.db import models
from api.request.models import Request
# Create your models here.


class TimeSheetRequest(models.Model):
    LEAVE_CHOICES = (('Annual Leave', 'ANNUAL LEAVE'), ('Parental Leave', 'PARENTAL LEAVE'), ('Personal/Carer Leave', 'PERSONAL/CARER LEAVE'), ('Compassionate Leave', 'COMPASSIONATE LEAVE'),
                     ('Community Service Leave', 'COMMUNITY SERVICE LEAVE'), ('Long Service Leave', 'LONG SERVICE LEAVE'), ('Birthday Leave', 'BIRTHDAY LEAVE'), ('Default', 'NA'))
    request_id = models.ForeignKey(Request, on_delete=models.CASCADE)
    timesheet_title = models.CharField(max_length=50)
    timesheet_startDate = models.DateField()
    timesheet_endDate = models.DateField()
    timesheet_hours = models.IntegerField()
