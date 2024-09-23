from api.models import FileUpload, Reconciliation, RecordEntry
from django.contrib.auth.models import User


class Reconciler:
    missing_in_target = set()
    missing_in_source = set()
    discrepancies = set()

    def record_file_upload(self, file_details, type):
        filename = file_details['fileName']

        # create upload
        created_source_upload = FileUpload.objects.create(
            file_name=filename,
            file_type=type,
        )

        # create each record in upload and link it to upload
        records = file_details['data']

        for record in records:
            RecordEntry.objects.create(
                external_id=record['id'],
                type=type,
                name=record['name'],
                date=record['date'],
                amount=float(record['amount']),
                upload=created_source_upload
            )
        return created_source_upload

    def record_reconciliation_results(self, source_upload, target_upload):
        # admin1:admin1@example.com
        # TO DO: Get user data from headers/auth stuff
        user = User.objects.get(pk=1)
        # create reconciliation
        created_reconciliation = Reconciliation.objects.create(
            source_file=source_upload,
            target_file=target_upload,
            status='completed',
            created_by=user
        )
        return created_reconciliation

    def reconcile(self, source, target):
        target_data = {record['id']: record for record in target}

        for source_entry in source:
            record_id = source_entry['id']
            if record_id not in target_data:
                self.missing_in_target.add(record_id)
            else:
                target_record = target_data[record_id]
                self.find_discrepancies(record_id, source_entry, target_record)

        self.find_missing_in_source(source, target)

    def find_missing_in_source(self, source, target):
        source_data = {record['id']: record for record in source}

        for target_entry in target:
            record_id = target_entry['id']
            if record_id not in source_data:
                self.missing_in_source.add(record_id)

    def find_discrepancies(self, record_id, source_record, target_record):
        for column in source_record.keys():
            if source_record[column] != target_record[column]:
                self.discrepancies.add(
                    (record_id, column, source_record[column], target_record[column]))
