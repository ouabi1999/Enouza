from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("one_shop", "0006_rename_aliexpressratings_rating"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            state_operations=[
                migrations.DeleteModel(
                    name="Ratings",
                ),
            ],
            database_operations=[],
        ),

        migrations.AlterField(
            model_name="rating",
            name="created_at",
            field=models.DateField(
                default=django.utils.timezone.now,
            ),
        ),
    ]