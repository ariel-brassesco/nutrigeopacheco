import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse
from django.shortcuts import render
from django.core.mail import send_mail
from django.template.loader import render_to_string

from nutrigeopacheco.settings import EMAIL_SENDER_CONSULTA, EMAIL_OWNER
from .serializers import ProductSerializer, CategorySerializer, PromotionSerializer, PlaceSerializer
from .models import Product, Category, Promotion, Place

# Create your views here.


def contact(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        check_send = send_contact_email(**data)

        return JsonResponse({'success': check_send})

    return JsonResponse({'success': False}, status=400)


def send_contact_email(email=None, message=None, name=None, tel=None):

    if not all([email, message, name]):
        return False

    # Set email data
    subject = 'Consulta Web'
    template_email = 'nutri/components/contact_email.html'
    context = {
        'name': name,
        'email': email,
        'tel': tel,
        'message': message,
    }

    content = render_to_string(template_email, context=context)
    #content_html = render(template_email, context=context)
    try:
        send_mail(
            subject,
            content,
            EMAIL_SENDER_CONSULTA,
            [EMAIL_OWNER],
            html_message=content,
            fail_silently=False,
        )
    except Exception as err:
        print(err)
        return False

    return True

# Define view functions


@api_view(['GET'])
def get_products(request):
    """
        Return a JSON format list of all products that are active.
    """
    if request.method == 'GET':
        # Get all active products
        products = Product.objects.filter(is_active=True).order_by('title')
        # serialize the data
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)
    return Response([], status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_product_detail(request, pk):
    """
        Return a JSON format list of all products that are active.
    """
    if request.method == 'GET':
        # Get all active products
        products = Product.objects.filter(pk=pk, is_active=True)
        # serialize the data
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    return Response([], status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_category(request):
    """
        Return a JSON format list of all categories that are active.
    """
    if request.method == 'GET':
        # Get all active categories
        categories = Category.objects.filter(is_active=True).order_by('orden')
        # serialize the data
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data)
    return Response([], status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_promotion(request):
    """
        Return a JSON format list of all promotions that are active.
    """
    if request.method == 'GET':
        # Get all active promotions
        promotions = Promotion.objects.filter(is_active=True)
        # serialize the data
        serializer = PromotionSerializer(promotions, many=True)
        return Response(serializer.data)
    return Response([], status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_place(request):
    """
        Return a JSON format for place data.
    """
    if request.method == 'GET':
        # Get all active promotions
        place = Place.objects.first()
        # serialize the data
        serializer = PlaceSerializer(place)
        return Response(serializer.data)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)
