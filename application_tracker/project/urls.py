from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('application_tracker.users.urls')),
    path('api/', include('application_tracker.api.urls')),
]
