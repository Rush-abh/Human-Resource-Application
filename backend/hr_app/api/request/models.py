# Create your models here.
from django.db import models
from api.employee.models import Employee
from api.project.models import Project
# Create your models here.


class Request(models.Model):
    REQUEST_CHOICES = (('Leave Request', 'LEAVE REQUEST'), ('Time Sheet', 'TIME SHEET'),
                       ('Others', 'NA'))
    requestedBy = models.ForeignKey(Employee, on_delete=models.CASCADE)
    requestToManager = models.ForeignKey(
        Project, on_delete=models.CASCADE)
    request_type = models.CharField(choices=REQUEST_CHOICES,
                                    default='NA', max_length=13)
    request_submitted_time = models.TimeField()
    request_submitted_date = models.DateField()
