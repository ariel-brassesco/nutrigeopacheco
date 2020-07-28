from django.contrib import admin
from .models import Product, ProductImages, Category, Promotion, Place
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

class PlaceAdmin(admin.ModelAdmin):
    list_display =  ('id',
                    'name',
                    'surname',
                    'email',
                    'phone_number',
                    'logo',
                    'instagram',
                    'whatsapp')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id',
                    'name',
                    'orden',
                    'is_active',
                    'message',
                    'slug')


# Register your models here.
admin.site.register(Promotion)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImages, ProductImagesAdmin)
admin.site.register(Place, PlaceAdmin)