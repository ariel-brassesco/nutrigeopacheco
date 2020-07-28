from django.urls import path
from . import views

app_name = 'payment'
urlpatterns = [
    path("", views.index, name="index"),
    path("pago/<uuid:cart_id>", views.payment, name="payment"),
    #path("mercadopago/<uuid:cart_id>", views.mercadopago, name="mercadopago"),
    path("success/<uuid:cart_id>", views.success_payment, name="success"),
    path("failure", views.failure_payment, name="failure"),
]