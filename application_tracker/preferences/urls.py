from django.urls import path

from .views import PreferencesRetrieveUpdateAPIView

urlpatterns = [
    path('', PreferencesRetrieveUpdateAPIView.as_view(), name='preferences'),
]
