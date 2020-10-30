from .views import TeamsViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', TeamsViewSet, basename='teams')
urlpatterns = router.urls
