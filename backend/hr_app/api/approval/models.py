# Create your models here.
from django.db import models
from api.employee.models import Employee
# Create your models here.


class Approval(models.Model):
    APPROVAL_STATUS = (('Approved', 'APPROVED'),
                       ('Not Approved', 'NOT APPROVED'), ('Default', 'NA'))
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    approval_message = models.CharField(max_length=100)
    approval_status = models.CharField(choices=APPROVAL_STATUS,
                                       default='NA', max_length=50)

    approval_received_date = models.DateField()
    approval_received_time = models.TimeField()
    approval_finish_date = models.DateField()
    approval_finish_time = models.TimeField()
