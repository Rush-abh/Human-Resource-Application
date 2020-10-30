from .views import AnnouncementViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', AnnouncementViewSet, basename='announcement')
urlpatterns = router.urls
