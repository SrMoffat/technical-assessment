from rest_framework import permissions, viewsets, mixins, generics

from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth.models import User, Group
from django.http import Http404

from api.serializers import GroupSerializer, UserSerializer, FileUploadSerializer, ReconciliationSerializer, RecordEntrySerializer
from api.models import FileUpload, Reconciliation, RecordEntry


class ReconcileViewSet(
        mixins.ListModelMixin,
        mixins.CreateModelMixin,
        generics.GenericAPIView):
    """
    Endpoint to start the reconciliation process or get reconciliations.

    It takes in a JSON object with {source, target} each with JSON data and file metadata
    """
    queryset = Reconciliation.objects.all()
    serializer_class = ReconciliationSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # return self.create(request, *args, **kwargs)
        print("request", request)
        return Response({
            "message": "Working on it"
        })


class UserViewSet(viewsets.ModelViewSet):
    """
    Endpoint to view or edit users
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    Endpoint to view or edit users
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
