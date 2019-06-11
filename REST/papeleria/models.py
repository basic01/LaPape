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


class Usuario(models.Model):
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=100)
    correo = models.EmailField()
    contraseña = models.CharField(max_length=50)

class Direccion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    direccion = models.CharField(max_length=255)
    codigoPostal = models.IntegerField()
    ciudad = models.CharField(max_length=50)
    municipio = models.CharField(max_length=50)

class Compra(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    direccion = models.ForeignKey(Direccion, on_delete=models.CASCADE)
    subtotal = models.DecimalField(max_digits=6, decimal_places=2)
    envio = models.DecimalField(max_digits=6, decimal_places=2)
    total = models.DecimalField(max_digits=6, decimal_places=2)
    status = models.IntegerField()