from django.urls import path, include

from .views import reconcile_records

urlpatterns = [
    path('reconcile', reconcile_records),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework_auth'))
]
