from django.urls import include, path

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/register/', include('dj_rest_auth.registration.urls')),
    path('applications/', include('application_tracker.applications.urls')),
]
