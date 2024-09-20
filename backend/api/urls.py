from django.urls import path

from .views import api_health_check

urlpatterns = [
    path('', api_health_check)
]