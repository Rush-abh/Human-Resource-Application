from .views import TimeSheetRequestViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', TimeSheetRequestViewSet, basename='timesheet_request')
urlpatterns = router.urls
