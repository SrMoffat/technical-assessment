# Generated by Django 5.1.1 on 2024-09-22 10:12

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="RecordEntry",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("external_id", models.CharField(max_length=255)),
                (
                    "type",
                    models.CharField(
                        choices=[("source", "Source"), ("target", "Target")],
                        max_length=100,
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("date", models.CharField(max_length=255)),
                ("amount", models.DecimalField(decimal_places=2, max_digits=15)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ["created_at"],
            },
        ),
    ]
