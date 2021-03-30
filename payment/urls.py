from django.urls import path
from . import views

app_name = 'payment'
urlpatterns = [
    path("pagar/", views.payment, name="payment"),
    path("success/<uuid:cart_id>/", views.success_payment, name="success"),
    path("failure/", views.failure_payment, name="failure"),
]
