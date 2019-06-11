from .models import Producto, Usuario, Direccion, Compra
from .serializer import ProductoSerializer, UsuarioSerializer, DireccionSerializer, CompraSerializer, UsuarioLoginSerializer
from rest_framework  import generics

#imports para class UsuarioList Y UsuarioDetail
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404


#Clases para vistas Productos
    #Método GET all
class ProductoList(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    #Método GET único
class ProductoDetail(generics.RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


#Clases para vistas Usuarios
class UsuarioList(APIView):
    #Metodo GET all
    def get(self, request, format=None):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)
    
    #Metodo POST
    def post(self, request, format=None):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            #Validar si usuario por registrar ya existe en la base de datos
            existencia = Usuario.objects.filter(correo=serializer.validated_data['correo']).exists() 
            banderaExist = 0
        
            #Si existe regresar una bandera con valor de 1
            if existencia:
                banderaExist = 1

            #Si no existe regresar una bandera con valor de 0 y guardar el POST
            else:
                serializer.save()
                banderaExist = 0

            #Regresar valor banderaExist
            return Response(banderaExist, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Método GET único
class UsuarioDetail(generics.RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer



#Clase para vistas Usuario Loign
class UsuarioLogin(APIView):
    #Metodo GET all
    def get(self, request, format=None):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)
    
    #Metodo POST
    def post(self, request, format=None):
        serializer = UsuarioLoginSerializer(data=request.data)
        if serializer.is_valid():
            #Validar si usuario por loguear ya existe en la base de datos
            existencia = Usuario.objects.filter(correo=serializer.validated_data['correo']).exists() 
            banderaExist = 0
        
            #Si existe regresar serializer con datos usuario
            if existencia:
                usuario = Usuario.objects.filter(correo=serializer.validated_data['correo'], contraseña=serializer.validated_data['contraseña'])
                if(usuario):
                    banderaExist = 1
                    usuario = Usuario.objects.get(correo=serializer.validated_data['correo'])
                    serializer = UsuarioSerializer(usuario)
                    return Response(serializer.data)
                else:
                    banderaExist = 2
                    return Response(banderaExist)

            #Si no existe regresar una bandera con valor de 0 
            else:
                banderaExist = 0
                return Response(banderaExist)

        return Response(3, status=status.HTTP_400_BAD_REQUEST)


#Clases para vistas Direcciones
    #Método GET all, POST
class DireccionList(generics.ListCreateAPIView):
    queryset = Direccion.objects.all()
    serializer_class = DireccionSerializer

    #Método GET único
class DireccionDetail(generics.RetrieveAPIView):
    queryset = Direccion.objects.all()
    serializer_class = DireccionSerializer


#Clases para vistas Compras
    #Método GET all, POST
class CompraList(generics.ListCreateAPIView):
    queryset = Compra.objects.all()
    serializer_class = DireccionSerializer

    #Método GET único, UPDATE
class CompraDetail(generics.RetrieveUpdateAPIView):
    queryset = Compra.objects.all()
    serializer_class = DireccionSerializer