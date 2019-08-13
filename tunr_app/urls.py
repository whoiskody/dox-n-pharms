from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('locations', views.LocationView)
router.register('doctors', views.DoctorView)
router.register('pharmacies', views.PharmacyView)

urlpatterns = [
    path('', include(router.urls))
]