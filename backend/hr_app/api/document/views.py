

from rest_framework import viewsets, status, filters
import datetime
from pytz import timezone

from .models import Document
from .serializer import DocumentSerializer, DocumentUploadSerializer


class DocumentViewSet(viewsets.ModelViewSet):
    #serializer_class = DocumentSerializer
    queryset = Document.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['document_name', 'document_description', 'document_type']

    def get_serializer_class(self):
        if self.request.method == "POST":
            return DocumentUploadSerializer
        return DocumentSerializer

    def create(self, request, *args, **kwargs):
        data = {
            'employee': request.user.LoginID,
            'document_upload_date': datetime.date.today(),
            'document_upload_time': datetime.datetime.now(tz=timezone("Australia/Melbourne")).strftime("%H:%M:%S")
        }
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
