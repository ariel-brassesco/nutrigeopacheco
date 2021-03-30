from django.urls import path
from . import views

app_name = 'nutri'
urlpatterns = [
    path("contact/", views.contact),
    path("place/", views.get_place),
    path("category/", views.get_category),
    path("promotion/", views.get_promotion),
    path("products/", views.get_products),
    path("products/<int:pk>/", views.get_product_detail),
]
