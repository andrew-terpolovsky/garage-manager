import re

from django.utils.timezone import now
from rest_framework import serializers

from .models import Manufacturer, Car, Garage


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    manufacturer = ManufacturerSerializer()

    def validate_year(self, data):
        if not re.match(r'^\d{4}$', str(data)):
            raise serializers.ValidationError('Year should have 4 digits.')
        elif data > now().year:
            raise serializers.ValidationError('Year cannot be in future.')
        return data

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
    cars = CarSerializer(many=True, read_only=True)

    class Meta:
        model = Garage
        fields = '__all__'
