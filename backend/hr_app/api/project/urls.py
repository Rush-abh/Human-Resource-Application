from .views import ProjectViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', ProjectViewSet, basename='project')
urlpatterns = router.urls
