from rest_framework import viewsets
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated

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
        serializer.save(owner=self.request.user)
