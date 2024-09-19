from django.urls import path

from .views import api_health_check

urlspatterns = [
    path('', api_health_check)
]