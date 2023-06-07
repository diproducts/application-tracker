from rest_framework import generics
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated


from .models import Application
from .serializers import ApplicationSerializer
from .mixins import IsOwnerPermissionMixin

class ApplicationListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ApplicationSerializer
    parser_classes = [MultiPartParser, JSONParser]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        q = self.request.GET.get('q')
        if not q:
            qs = Application.objects.filter(owner=user)
        else:
            qs = Application.objects.search(q, owner=user)
        return qs
    

class ApplicationRetrieveAPIView(
    IsOwnerPermissionMixin,
    generics.RetrieveAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationUpdateAPIView(
    IsOwnerPermissionMixin,
    generics.UpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationDestroyAPIView(
    IsOwnerPermissionMixin,
    generics.DestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer