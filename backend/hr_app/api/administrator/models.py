from django.db import models
from ..login.models import Login

# Create your models here.


class Administrator(models.Model):

    ADMIN_TYPES = (('Super Admin', 'SUPER_ADMIN'), ('Sub Admin', 'SUB_ADMIN'))
    login_ID = models.ForeignKey(Login, on_delete=models.CASCADE)
    admin_type = models.CharField(
        choices=ADMIN_TYPES, max_length=15, blank=False, null=False)
    super_admin_ID = models.ForeignKey(
        "Administrator", on_delete=models.CASCADE)
