from rest_framework import permissions, viewsets, mixins, generics
from rest_framework.response import Response

from django.contrib.auth.models import User, Group

from api.serializers import GroupSerializer, UserSerializer, ReconciliationSerializer
from api.models import Reconciliation
from api.reconciler import Reconciler

reconciler_instance = Reconciler()


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
        source_label = "source"
        target_label = "target"

        data = request.data

        source_data = data[source_label]
        target_data = data[target_label]

        source_records = source_data['data']
        target_records = target_data['data']

        # find in source but not in target and discrepancies
        reconciler_instance.reconcile(
            source_records,
            target_records
        )
        results = {
            "missing_in_source": reconciler_instance.missing_in_source,
            "missing_in_target": reconciler_instance.missing_in_target,
            "discrepancies": reconciler_instance.discrepancies
        }

        # create source and target files in DB
        source_upload = reconciler_instance.record_file_upload(
            source_data, source_label)
        target_upload = reconciler_instance.record_file_upload(
            target_data, target_label)

        created_reconciliation = reconciler_instance.record_reconciliation_results(
            source_upload, target_upload)

        reconciliation = ReconciliationSerializer(created_reconciliation)

        return Response({
            "reconciliation": reconciliation.data,
            "results": results
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
