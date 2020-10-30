from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import validate_email


# Database model for login
class Login(AbstractUser):

    # Account Type choices
    ADMIN = 'ADMIN'
    EMPLOYEE = 'EMPLOYEE'
    ACCOUNT_TYPE_CHOICES = [(ADMIN, 'Admin'), (EMPLOYEE, 'Employee')]

    # Validator function for email
    def validate_email_address(value):
        try:
            validate_email(value)
            valid_email = True
        except validate_email.ValidationError:
            valid_email = False

    # fields of model
    LoginID = models.AutoField(primary_key=True, unique=True, null=False, editable=False)
    # Left: Insert the Employee ID as foreign key
    # EmpID = models.ForeignKey(employee, on_delete=models.CASCADE)
    email = models.CharField(max_length=255, validators=[validate_email_address],
                             error_messages={"blank": "EmailAddress cannot be left blank"}, unique=True)
    password = models.CharField(max_length=128, blank=True, null=True,
                                error_messages={"blank": "Password cannot be left blank"})
    username = models.CharField(blank=True, null=True, unique=False, max_length=50)
    AccountType = models.CharField(max_length=8, choices=ACCOUNT_TYPE_CHOICES, default=EMPLOYEE)

    last_login = None
    # objects = LoginManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # @property
    # def __str__(self):
    #     return 'Login of %s ' % self.email
