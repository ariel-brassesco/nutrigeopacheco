from django.contrib import admin

from .models import Order, OrderItem
# Register your models here.


class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'collection_id', 'date_order',
                    'email', 'phone_number', 'payment_type',
                    'merchant_order_id', 'user',
                    'address', 'city', 'total', 'status')
    ordering = ('-date_order',)


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product',
                    'quantity', 'unitary_price', 'total')


# Register your models here.
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
