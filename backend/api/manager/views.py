from rest_framework import viewsets

from .models import Car, Garage
from .serializers import CarSerializer, GarageSerializer


class CarsViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer


class GaragesViewSet(viewsets.ModelViewSet):
    queryset = Garage.objects.all()
    serializer_class = GarageSerializer
