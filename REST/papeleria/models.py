from django.db import models

class Producto(models.Model):

    CHOICES_CATEGORIAS = (
        ('Accesorios', 'Accesorios'),
        ('Papel', 'Papel'),
        ('Oficina', 'Oficina'),
        ('Escolar', 'Escolar'),
    )

    nombre = models.CharField(max_length=120)
    descripcion = models.TextField()
    imagen = models.CharField(max_length=255)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    categoria = models.CharField(max_length=15, choices=CHOICES_CATEGORIAS)

    class Meta:
        ordering = ('categoria', 'nombre')