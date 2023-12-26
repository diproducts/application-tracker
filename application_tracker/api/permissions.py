from rest_framework.permissions import BasePermission


class IsOwnerPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'owner'):
            return obj.owner == request.user

        if hasattr(obj, 'application'):
            return obj.application.owner == request.user
