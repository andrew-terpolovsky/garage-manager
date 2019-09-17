from django.contrib import admin

from .models import Manufacturer, Car, Garage


@admin.register(Manufacturer)
class ManufacturerAdmin(admin.ModelAdmin):
    list_display = (
        'name',
    )


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = (
        'manufacturer', 'model', 'year', 'color',
    )


class CarInline(admin.TabularInline):
    model = Car


@admin.register(Garage)
class GarageAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'cars_amount',
    )
    inlines = (
        CarInline,
    )
