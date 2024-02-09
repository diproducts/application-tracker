from rest_framework import viewsets
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated

from application_tracker.preferences.services import save_cv_as_default

from ..serializers import ApplicationSerializer


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
        user = self.request.user
        instance = serializer.save(owner=user)
        if serializer.save_cv_as_default and instance.cv:
            save_cv_as_default(instance.cv, user.preferences)  # type: ignore
