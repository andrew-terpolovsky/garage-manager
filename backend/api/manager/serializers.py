from rest_framework import serializers

from .models import Manufacturer, Car, Garage


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    manufacturer = ManufacturerSerializer()

    def validate_manufacturer(self, data):
        name = data['name']
        try:
            instance = Manufacturer.objects.get(name__iexact=name)
        except Manufacturer.DoesNotExist:
            instance = Manufacturer.objects.create(name=name)
        return instance

    class Meta:
        model = Car
        fields = '__all__'


class GarageSerializer(serializers.ModelSerializer):
    cars = CarSerializer(many=True)

    class Meta:
        model = Garage
        fields = '__all__'
