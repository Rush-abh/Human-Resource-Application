from rest_framework import serializers
from .models import Employee, Document


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('employee', 'document_name', 'document_description', 'document_type',
                  'document_upload_time', 'document_upload_date', 'file_location')


class DocumentUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = ['employee', 'document_name', 'document_description',
                  'document_type', 'document_upload_time', 'document_upload_date']
