from django.contrib import admin
from .models import Location, Doctor, Pharmacy

admin.site.register([Location, Doctor, Pharmacy])