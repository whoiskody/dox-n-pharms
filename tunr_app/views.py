from django.shortcuts import render
from rest_framework import viewsets
from .serializers import LocationSerializer, DoctorSerializer, PharmacySerializer
from .models import Location, Doctor, Pharmacy


class LocationView(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class DoctorView(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class PharmacyView(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmacySerializer


