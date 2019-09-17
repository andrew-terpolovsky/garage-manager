from django.db import models
from django.utils.translation import gettext_lazy as _


class Manufacturer(models.Model):
    """
    Manufacturer model keep list of car manufacturers.
    """
    name = models.CharField(
        verbose_name=_('name'),
        max_length=24,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)


class Car(models.Model):
    """
    Car model keep information about car.
    """
    color = models.CharField(
        verbose_name=_('color'),
        max_length=16,
    )
    manufacturer = models.ForeignKey(
        verbose_name=_('manufacturer'),
        to=Manufacturer,
        on_delete=models.CASCADE,
    )
    model = models.CharField(
        verbose_name=_('model'),
        max_length=36,
    )
    year = models.PositiveSmallIntegerField(
        verbose_name=_('production year'),
    )

    def __str__(self):
        return f'{self.model} ({self.manufacturer})'


class Garage(models.Model):
    """
    Garage model keep information carts in garage.
    """
    title = models.CharField(
        verbose_name=_('title'),
        max_length=24,
    )
    cars = models.ManyToManyField(
        verbose_name=_('add cars'),
        to=Car,
        blank=True,
    )

    def __str__(self):
        return self.title

    @property
    def cars_amount(self):
        return self.cars.count()
