from django.db import models
from api.employee.models import Employee


class Document(models.Model):

    DOCUMENT_CHOICES = (('Pdf', 'PDF'), ('Doc', 'DOC'), ('Docx', 'DOCX'), ('Jpeg', 'JPEG'), ('Jpg', 'JPG'), ('Png', 'PNG'), ('Xls', 'XLS'), ('Xlsx', 'XLSX'),
                        ('Others', 'OTHERS'))
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

    document_name = models.CharField(max_length=50)
    document_description = models.CharField(max_length=50)
    document_type = models.CharField(choices=DOCUMENT_CHOICES,
                                     default='OTHERS', max_length=13)
    document_upload_time = models.TimeField()
    document_upload_date = models.DateField()
    file_location = models.FileField(upload_to='documents/')
