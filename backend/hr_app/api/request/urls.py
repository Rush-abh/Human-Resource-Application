from .views import RequestViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', RequestViewSet, basename='request')
urlpatterns = router.urls
