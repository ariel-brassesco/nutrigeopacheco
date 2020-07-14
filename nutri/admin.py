from django.contrib import admin
from .models import Product, ProductImages
# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id',
                    'title',
                    'description',
                    'stock',
                    'created_at',
                    'price')

class ProductImagesAdmin(admin.ModelAdmin):
    list_display = ('id',
                    'product',
                    'image',
                    'uploaded_at')
# Register your models here.
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImages, ProductImagesAdmin)