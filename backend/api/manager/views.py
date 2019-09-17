from django.utils.translation import gettext_lazy as _
from rest_framework import permissions, viewsets

from .models import Car, Garage
from .serializers import CarSerializer, GarageSerializer


class CarCreateDeletePermission(permissions.IsAdminUser):
    """
    Custom permissions class for allowing
    adding and deleting cars only to superuser.
    """
    message = _('Only superuser can add or delete car.')
    PERMS_MAP = ['PUT', 'PATCH']

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_superuser:
            return True
        if request.method in self.PERMS_MAP:
            return True

        return False


class CarsViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = (CarCreateDeletePermission,)


class GaragesViewSet(viewsets.ModelViewSet):
    queryset = Garage.objects.all()
    serializer_class = GarageSerializer
