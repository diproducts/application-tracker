from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated

from ..serializers import PreferencesSerializer


class PreferencesRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    serializer_class = PreferencesSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = (
        MultiPartParser,
        JSONParser,
    )

    def get_object(self):
        return self.request.user.preferences  # type: ignore
