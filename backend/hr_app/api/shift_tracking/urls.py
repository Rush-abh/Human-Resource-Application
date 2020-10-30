from .views import ShiftTrackingViewSet
from django.urls import path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', ShiftTrackingViewSet, basename='shift_tracking')
urlpatterns = router.urls

shift_tracking_list = ShiftTrackingViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

shift_tracking_detail = ShiftTrackingViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
})

# urlpatterns = [
#     path(r'', ShiftTrackingViewSet, basename='shift_tracking'),
# ]