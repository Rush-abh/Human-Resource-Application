from django.db import models

# Create your models here.


class Country(models.Model):
    name = models.CharField(max_length=100)
    country_code = models.CharField(max_length=3)

    def __str__(self):
        return self.name + " - " + self.country_code


class State(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    state_code = models.CharField(max_length=10)

    def __str__(self):
        return self.name + " - " + self.state_code
