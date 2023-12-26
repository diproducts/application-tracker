from rest_framework.permissions import IsAuthenticated


from .permissions import IsOwnerPermission


class IsOwnerPermissionMixin:
    permission_classes = (
        IsAuthenticated,
        IsOwnerPermission,
    )