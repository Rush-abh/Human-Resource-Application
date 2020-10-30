from .views import TeamMemberViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', TeamMemberViewSet, basename='teammember')
urlpatterns = router.urls
