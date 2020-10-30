import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
# from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MaxLengthValidator, EmailValidator

from api.login.models import Login


class Person(models.Model):
    GENDER_CHOICES = (('Male', 'MALE'), ('Female', 'FEMALE'),
                      ('Dont disclose', 'NA'))

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(choices=GENDER_CHOICES,
                              default='NA', max_length=13)
    mobile_number = models.CharField(
        max_length=15, blank=False, null=False, unique=True)
    telephone_number = models.CharField(
        max_length=15, blank=False, null=False, unique=True)
    street = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    postcode = models.IntegerField(default=0)
    country = models.CharField(max_length=50)

    class Meta:
        abstract = True


class Identification(models.Model):

    RESIDENCY_TYPES = (('AUS_CITIZEN', 'Australian Citizen'), ('NZ_CITIZEN', 'New Zealand Citizen'), ('PR', 'Permanent Resident'))
    residency_status = models.CharField(choices=RESIDENCY_TYPES, null=False, blank=False, max_length=20)
    nationality = models.CharField(max_length=50)
    emp = models.ForeignKey('employee.Employee', on_delete=models.DO_NOTHING)
    visa_number = models.CharField(max_length=16, primary_key=True)
    visa_class = models.IntegerField()
    visa_expiry = models.DateField()
    visa_restrictions = models.CharField(max_length=255)
    pp_number = models.CharField(max_length=10)
    pp_issue_date = models.DateField()
    pp_expiry_date = models.DateField()
    pp_country = models.CharField(max_length=50)
    dl_number = models.CharField(max_length=10)
    dl_expiry_date = models.DateField()
    dl_state = models.CharField(max_length=3)

    class Meta:
        abstract = True


class Employee(Person):

    EMPLOYEE_STATUS_CHOICES = (
        ('Active', 'ACTIVE'), ('Inactive', 'INACTIVE'))

    Emp_ID = models.AutoField(primary_key=True, editable=False)
    login = models.ForeignKey(Login, on_delete=models.CASCADE)
    preferred_name = models.CharField(max_length=50)
    personal_email_address = models.EmailField(
        blank=False, null=False, unique=True, validators=[EmailValidator])
    company_email_address = models.EmailField(
        blank=False, null=False, unique=True, validators=[EmailValidator])

    date_of_birth = models.DateField()
    position = models.CharField(max_length=50)
    employee_status = models.CharField(
        choices=EMPLOYEE_STATUS_CHOICES, default='ACTIVE', max_length=8)

    start_date = models.DateField()
    termination_date = models.DateField(blank=True, null=True)

    def save(self, *args, **kwargs):
        start_date = self.start_date
        termination_date = self.termination_date
        date_today = datetime.datetime.today().date()
        if termination_date <= date_today or self.employee_status == "Inactive":
            self.employee_status = "Inactive"
            self.login.is_active = False
            self.login.save()
        if self.employee_status == "Active":
            self.login.is_active = True
            self.login.save()
        if termination_date and termination_date < start_date:
            raise ValidationError(
                "Termination date occuring prior to start date. Please correct.")
        super(Employee, self).save()

    def __str__(self):
        return "{} {} ({})".format(self.first_name, self.last_name, self.company_email_address)


class MedicalProfile(models.Model):
    BLOOD_GROUP = (('+AB', '+AB'), ('+A', '+A'), ('+B', '+B'), ('+O', '+O'),
                   ('-AB', '-AB'), ('-A', '+A'), ('-B', '+B'), ('-O', '-O'))
    Login = models.OneToOneField(Login, on_delete=models.CASCADE)
    blood_type = models.CharField(choices=BLOOD_GROUP, max_length=3, blank=True)
    allergies = models.CharField(max_length=255, blank=True, null=True)
    special_condition = models.TextField(blank=True, null=True)


class GeneralPractitioner(Person):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    # need to ask what is it
    medical_condition = models.TextField()


class Compensation(models.Model):
    PAY_SCHEDULE = (('Weekly', 'Weekly'), ('Fortnightly', 'Fortnightly'), ('Monthly', 'Monthly'),
                    ('Quarterly', 'Quarterly'), ('Annually', 'Annually'))
    PAY_TYPE = (('Cash', 'Cash'), ('Bank Deposit', 'Bank Deposit'))
    employee = models.OneToOneField(Employee, on_delete=models.CASCADE)
    effective_date = models.DateField()
    pay_rate = models.DecimalField(max_digits=10, decimal_places=2)
    pay_schedule = models.CharField(choices=PAY_SCHEDULE, max_length=12)
    pay_type = models.CharField(choices=PAY_TYPE, max_length=12)

class ResidencyStatus(Identification):
    pass

# Model for the employee bank details
class Payroll(models.Model):

    emp = models.OneToOneField(Employee, on_delete=models.CASCADE)
    account_name = models.CharField(max_length=128)
    account_number = models.IntegerField(validators=[MaxValueValidator(999999999)], null=True, blank=False)
    bank_name = models.CharField(max_length=48)
    branch = models.CharField(max_length=255)
    bsb = models.IntegerField(validators=[MaxValueValidator(999999)], null=True, blank=False)
    tfn = models.IntegerField(null=True, blank=False)
    super_number = models.IntegerField(null=True, blank=False)
