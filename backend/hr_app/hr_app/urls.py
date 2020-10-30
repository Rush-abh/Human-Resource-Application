"""hr_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token

from . import settings


routes = getattr(settings, 'REACT_ROUTES', [])

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('api/schedule/', include('api.schedule.urls')),
    path('api/employee/', include('api.employee.urls')),
    path('api/document/', include('api.document.urls')),
    path('api/shift_tracking/', include('api.shift_tracking.urls')),
    path('api/notification/', include('api.notification.urls')),
    path('api/approval/', include('api.approval.urls')),
    path('api/teams/', include('api.teams.urls')),
    path('api/project/', include('api.project.urls')),
    path('api/request/', include('api.request.urls')),
    path('api/leave_request/', include('api.leave_request.urls')),
    path('api/timesheet_request/', include('api.timesheet_request.urls')),
    path('api/goal/', include('api.goal.urls')),
    path('api/comment/', include('api.comment.urls')),
    path('api/accounts/', include('django.contrib.auth.urls')),
    path('api/login/', include('api.login.urls')),
    path('api/loginlog/', include('api.loginlog.urls')),
    path('api/offboarding/', include('api.offboarding.urls')),
    path('api/emergency-contact/', include('api.emergency.urls')),
    path('api/leave', include('api.leave.urls')),
    path('api/announcement/', include('api.announcement.urls')),
    path('api/administrator/', include('api.administrator.urls')),
    path('api/invite/', include('api.invite.urls')),
    path('api/archive/', include('api.archive.urls')),
    path('api/teammember/', include('api.teammember.urls')),

    url(r'^(%s)?$' % '|'.join(routes),
        TemplateView.as_view(template_name='index.html')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
