from rest_framework import routers

from . import views

router = routers.SimpleRouter(trailing_slash=False)
router.register(r'garages', views.GaragesViewSet)
router.register(r'cars', views.CarsViewSet)

urlpatterns = router.urls
