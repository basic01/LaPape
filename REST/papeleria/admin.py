from django.contrib import admin
from .models import Producto, Usuario, Direccion, Compra

admin.site.register(Producto)
admin.site.register(Usuario)
admin.site.register(Direccion)
admin.site.register(Compra)
