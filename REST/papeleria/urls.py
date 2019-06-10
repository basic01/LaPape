from papeleria import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('productos/', views.ProductoList.as_view()),
    path('productos/<pk>/', views.ProductoDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
