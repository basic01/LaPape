# Generated by Django 2.1.1 on 2019-06-10 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=120)),
                ('descripcion', models.TextField()),
                ('imagen', models.CharField(max_length=255)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=6)),
                ('categoria', models.CharField(choices=[('Accesorios', 'Accesorios'), ('Papel', 'Papel'), ('Oficina', 'Oficina'), ('Escolar', 'Escolar')], max_length=15)),
            ],
            options={
                'ordering': ('categoria', 'nombre'),
            },
        ),
    ]
