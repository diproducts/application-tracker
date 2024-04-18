from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import PasswordResetConfirmTokenVerifySerializer


class PasswordResetConfirmTokenVerifyView(GenericAPIView):
    """
    Verifies a password reset confirm token.
    Accepts the following POST parameters: uid, token
    Returns the success/fail message.
    """
    serializer_class = PasswordResetConfirmTokenVerifySerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        # Create a serializer with request.data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response({}, status=status.HTTP_200_OK)
