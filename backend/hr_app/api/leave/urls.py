from django.urls import path
from rest_framework.routers import DefaultRouter

from .import views

urlpatterns = [

]

router = DefaultRouter()
router.register(r'leave-view', views.LeaveViewSet, basename="leave-viewset")


# append router.urls to a list of existing views
urlpatterns += router.urls