from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated

from .mixins import IsOwnerPermissionMixin
from .models import Application, ApplicationPhase
from .serializers import ApplicationPhaseSerializer, ApplicationSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    parser_classes = (
        MultiPartParser,
        JSONParser,
    )
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return user.applications.all().prefetch_related('phases')  # type: ignore

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ApplicationPhaseViewSet(IsOwnerPermissionMixin, viewsets.ModelViewSet):
    serializer_class = ApplicationPhaseSerializer
    permission_classes = (IsAuthenticated,)  # type: ignore

    def get_queryset(self):
        user = self.request.user
        return ApplicationPhase.objects.filter(
            Q(application=self.kwargs['application_pk']) & Q(application__owner=user)
        )

    def perform_create(self, serializer):
        application = get_object_or_404(Application, pk=self.kwargs['application_pk'], owner=self.request.user)
        serializer.save(application=application)
