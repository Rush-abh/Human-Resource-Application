from .views import LeaveRequestViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', LeaveRequestViewSet, basename='leave_request')
urlpatterns = router.urls
