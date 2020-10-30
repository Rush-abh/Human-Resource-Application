from .views import ScheduleViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', ScheduleViewSet, basename='schedule')
urlpatterns = router.urls
