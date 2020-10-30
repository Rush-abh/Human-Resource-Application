from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from .import views


router = DefaultRouter()
router.register(r'login-view', views.LoginViewSet, basename="login-viewset")


# append router.urls to a list of existing views

urlpatterns = router.urls + [
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate_account, name='activate'),
    url(r'^reset-password/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.reset_password, name='reset-password'),
    url(r'^user-login/$', views.user_login, name="user-login"),
    url(r'password-reset-request/', views.password_reset_request, name='password-reset-request'),
    url(r'^logout/$', views.user_logout, name="logout"),
]
