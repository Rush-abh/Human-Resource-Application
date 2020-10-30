from .views import GoalViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', GoalViewSet, basename='goal')
urlpatterns = router.urls
