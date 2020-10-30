from django.db import models
from api.request.models import Request
from api.document.models import Document
# Create your models here.


class LeaveRequest(models.Model):
    LEAVE_CHOICES = (('Annual Leave', 'ANNUAL LEAVE'), ('Parental Leave', 'PARENTAL LEAVE'), ('Personal/Carer Leave', 'PERSONAL/CARER LEAVE'), ('Compassionate Leave', 'COMPASSIONATE LEAVE'),
                     ('Community Service Leave', 'COMMUNITY SERVICE LEAVE'), ('Long Service Leave', 'LONG SERVICE LEAVE'), ('Birthday Leave', 'BIRTHDAY LEAVE'), ('Default', 'NA'))
    request_id = models.ForeignKey(Request, on_delete=models.CASCADE)
    leave_document = models.ForeignKey(Document, on_delete=models.CASCADE)
    leave_type = models.CharField(choices=LEAVE_CHOICES,
                                  default='NA', max_length=35)
    requested_leave_hours = models.IntegerField()
    request_message = models.CharField(max_length=100)
