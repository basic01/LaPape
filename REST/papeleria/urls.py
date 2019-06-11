from papeleria import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('productos/', views.ProductoList.as_view()),
    path('productos/<pk>/', views.ProductoDetail.as_view()),
    path('usuarios/', views.UsuarioList.as_view()),
    path('usuarios/<pk>/', views.UsuarioDetail.as_view()),
    path('usuariosLogin/', views.UsuarioLogin.as_view()),
    path('direcciones/', views.DireccionList.as_view()),
    path('direcciones/<pk>/', views.DireccionDetail.as_view()),
    path('compras/', views.CompraList.as_view()),
    path('compras/<pk>/', views.CompraDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
