from .views import InviteViewSet
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', InviteViewSet, basename='invite')
urlpatterns = router.urls
