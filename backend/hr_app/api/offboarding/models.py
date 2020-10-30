from django.db import models
import uuid
# Create your models here.
class Offboarding(models.Model):

    TaskID = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True, editable=False)
    # Left: Insert the Employee ID as foreign key, admin ID
    # EmpID = models.ForeignKey(employee, on_delete=models.CASCADE)
    # AdminID = models.ForeignKey(admin, on_delete=models.CASCADE)
    Task1 = models.CharField(max_length=320, blank=True, null=True)
    Task2 = models.CharField(max_length=320, blank=True, null=True)
    Task3 = models.CharField(max_length=320, blank=True, null=True)
    Task4 = models.CharField(max_length=320, blank=True, null=True)
    Task5 = models.CharField(max_length=320, blank=True, null=True)
