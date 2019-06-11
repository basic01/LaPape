from rest_framework import serializers
from .models import Producto, Usuario, Direccion, Compra

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ('id', 'nombre', 'descripcion', 'imagen', 'precio', 'categoria')

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'nombre', 'apellidos', 'correo', 'contraseña')

class UsuarioLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('correo', 'contraseña')

class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = ('id', 'usuario', 'direccion', 'codigoPostal', 'ciudad', 'municipio')

class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = ('id', 'usuario', 'direccion', 'subtotal', 'envio', 'total', 'status')
