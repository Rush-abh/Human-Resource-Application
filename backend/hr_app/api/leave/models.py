from django.db import models
#from .models import Employee
import uuid


# Create your models here.

class Leave(models.Model):
    # fields for model
    LeaveID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    #EmpID = models.ForeignKey(Employee, on_delete=models.CASCADE)
    AnnualLeave = models.PositiveIntegerField(default=0)
    ParentalLeave = models.PositiveIntegerField(default=0)
    SickandCarerLeave = models.PositiveIntegerField(default=0)
    CompassionateandBereavementLeave = models.PositiveIntegerField(default=0)
    CommunityServiceLeave = models.PositiveIntegerField(default=0)
    LongServiceLeave = models.PositiveIntegerField(default=0)
    BirthdayLeave = models.PositiveIntegerField(default=0)
