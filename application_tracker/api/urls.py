from django.urls import path
from rest_framework_nested.routers import SimpleRouter, NestedSimpleRouter

from .views import ApplicationViewSet, ApplicationPhaseViewSet

router = SimpleRouter()
router.register(r'applications', ApplicationViewSet, basename='application')

applications_router = NestedSimpleRouter(router, r'applications', lookup='application')
applications_router.register(r'phases', ApplicationPhaseViewSet, basename='applicationphase')

urlpatterns = []

urlpatterns += router.urls
urlpatterns += applications_router.urls
