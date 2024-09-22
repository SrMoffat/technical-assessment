from django.urls import path, include

from .views import ReconcileViewSet

urlpatterns = [
    path('reconcile', ReconcileViewSet.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework_auth'))
]
