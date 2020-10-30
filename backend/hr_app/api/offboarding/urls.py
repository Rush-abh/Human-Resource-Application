from rest_framework.routers import DefaultRouter

from .import views

urlpatterns = [

]


router = DefaultRouter()
router.register(r'offboarding-view',views.OffboardingViewSet, basename='offboarding-viewset')
urlpatterns += router.urls