from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from django.contrib.auth.models import User, Group
from rest_framework import permissions, viewsets

from api.serializers import GroupSerializer, UserSerializer


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


@api_view(["POST"])
def reconcile_records(request, *args, **kwargs):
    body = request.body
    print("Details", body)
    return Response(body)
