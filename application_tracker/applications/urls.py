from rest_framework_nested.routers import NestedSimpleRouter, SimpleRouter

from .viewsets import ApplicationPhaseViewSet, ApplicationViewSet

router = SimpleRouter()
router.register(r'', ApplicationViewSet, basename='application')

applications_router = NestedSimpleRouter(router, r'', lookup='application')
applications_router.register(r'phases', ApplicationPhaseViewSet, basename='applicationphase')

urlpatterns = []

urlpatterns += router.urls
urlpatterns += applications_router.urls
