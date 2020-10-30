from .views import ApprovalViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', ApprovalViewSet, basename='approval')
urlpatterns = router.urls
