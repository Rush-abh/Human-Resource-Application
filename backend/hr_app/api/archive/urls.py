from .views import Employee_ArchiveViewSet, ResidencyStatus_ArchiveViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'employee_archive', Employee_ArchiveViewSet, basename='employee_archive')
router.register(r'residencystatus_archive', ResidencyStatus_ArchiveViewSet, basename='residencystatus_archive')
urlpatterns = router.urls
