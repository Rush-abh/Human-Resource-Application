from .views import AdministratorViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', AdministratorViewSet, basename='administrator')
urlpatterns = router.urls
