from django.contrib.auth.models import Group, User
from rest_framework import serializers

from api.models import RecordEntry, FileUpload, Reconciliation


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class RecordEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecordEntry
        fields = ['id', 'external_id', 'type', 'name', 'date', 'amount']


class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = ['id', 'file_name', 'file_type', 'uploaded_at']


class ReconciliationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reconciliation
        fields = ['id', 'source_file', 'target_file', 'created_at', 'status']
