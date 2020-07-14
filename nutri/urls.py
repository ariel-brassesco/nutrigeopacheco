from django.urls import path
from . import views

app_name = 'nutri'
urlpatterns = [
    path("", views.index, name="index"),
    path("contact", views.contact, name="contact"),
    path("api/products/", views.get_products),
    path("api/products/<int:pk>/", views.get_product_detail),
]