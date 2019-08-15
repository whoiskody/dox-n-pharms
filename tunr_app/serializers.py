from rest_framework import serializers

from .models import Location, Doctor, Pharmacy


class PharmacySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = ('id', 'name', 'contact', 'address', 'location')

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('id', 'name', 'contact', 'address', 'location')

class LocationSerializer(serializers.ModelSerializer):
    doctors = DoctorSerializer(many=True, read_only=True)
    pharmacies = PharmacySerializer(many=True, read_only=True)
    class Meta:
        model = Location
        fields = ('id', 'name', 'photo_url', 'doctors', 'pharmacies')