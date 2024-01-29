from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import Application, ApplicationPhase
from ..serializers import ApplicationPhaseSerializer


class ApplicationPhaseViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationPhaseSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return ApplicationPhase.objects.filter(
            Q(application=self.kwargs['application_pk']) & Q(application__owner=user)
        )

    def perform_create(self, serializer):
        application = get_object_or_404(Application, pk=self.kwargs['application_pk'], owner=self.request.user)
        serializer.save(application=application)
