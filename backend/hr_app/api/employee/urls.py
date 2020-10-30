from .views import EmployeeViewSet, BasicInfoViewset, MedicalProfileViewSet, GeneralPractitionerViewSet, CompensationViewSet, ResidencyStatusViewSet, PayrollViewSet
from django.conf.urls import url
from .views import EmployeeViewSet, BasicInfoViewset, MedicalProfileViewSet, GeneralPractitionerViewSet, \
	CompensationViewSet, employee_job_info, ProfileContactViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'basic-info', BasicInfoViewset, basename='basic-info')
router.register(r'medical-profile', MedicalProfileViewSet, basename='medical-profile')
router.register(r'general-practitioner', GeneralPractitionerViewSet, basename='general-practitioner')
router.register(r'profile-contact', ProfileContactViewSet, basename='profile-contact')
router.register(r'compensation', CompensationViewSet, basename='compensation')
router.register(r'residency-status', ResidencyStatusViewSet, basename='residencystatus')
router.register(r'payroll', PayrollViewSet, basename='payroll')
router.register(r'', EmployeeViewSet, basename='employee')

urlpatterns = [
	url(r'job-info', employee_job_info, name='job-info'),
] + router.urls
