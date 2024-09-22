from django.db import models

reconciliation_file_types = [('source', 'Source'), ('target', 'Target')]
reconciliation_job_statuses = [(
    'pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed')]


class RecordEntry(models.Model):
    external_id = models.CharField(max_length=255)
    type = models.CharField(
        max_length=100,
        choices=reconciliation_file_types)
    name = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']


class FileUpload(models.Model):
    file_name = models.CharField(max_length=255)
    file_type = models.CharField(
        choices=reconciliation_file_types, max_length=100)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    records = models.ForeignKey(
        RecordEntry, related_name='entries', on_delete=models.CASCADE)


class Reconciliation(models.Model):
    source_file = models.ForeignKey(
        FileUpload, related_name='source_file', on_delete=models.CASCADE)
    target_file = models.ForeignKey(
        FileUpload, related_name='target_file', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        'auth.User', related_name='reconciliations', on_delete=models.CASCADE)
    status = models.CharField(
        max_length=100, choices=reconciliation_job_statuses)
