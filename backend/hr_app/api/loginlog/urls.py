from django.urls import path
from rest_framework.routers import DefaultRouter

from .import views

urlpatterns = [

]

router = DefaultRouter()
router.register(r'login-log', views.LoginLogViewSet, basename="login-log")


# append router.urls to a list of existing views
urlpatterns += router.urls
