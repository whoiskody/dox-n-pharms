from django.db import models

class Location(models.Model):
    name = models.CharField(max_length=255)
    photo_url = models.CharField(max_length=400)

    def __str__(self):
        return self.name

class Doctor(models.Model):
    name = models.CharField(max_length=255)
    contact = models.CharField(max_length=255)
    address = models.CharField(max_length=310)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='doctors')

    def __str__(self):
        return self.name

class Pharmacy(models.Model):
    name = models.CharField(max_length=255)
    contact = models.CharField(max_length=255)
    address = models.CharField(max_length=310)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='pharmacies')

    def __str__(self):
        return self.name