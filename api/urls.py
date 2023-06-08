from django.urls import path

from .views import (
    ApplicationListCreateAPIView,
    ApplicationRetrieveAPIView,
    ApplicationUpdateAPIView,
    ApplicationDestroyAPIView,
)

urlpatterns = [
    path('applications/', ApplicationListCreateAPIView.as_view(), name='application-list'),
    path('applications/<int:pk>/', ApplicationRetrieveAPIView.as_view(), name='application-detail'),
    path('applications/<int:pk>/update/', ApplicationUpdateAPIView.as_view(), name='application-update'),
    path('applications/<int:pk>/delete/', ApplicationDestroyAPIView.as_view(), name='application-delete'),
]