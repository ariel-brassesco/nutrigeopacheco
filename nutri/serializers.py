from rest_framework.serializers import ModelSerializer, RelatedField, StringRelatedField, SlugRelatedField
from .models import Product, ProductImages


class ProductImagesSerializer(RelatedField):
    '''
        Serialize the url for each image.
    '''
    def to_representation(self, value):
        return value.image.url

class ProductSerializer(ModelSerializer):
    '''
        Serialize the data of product and the url's images as a list.
    '''
    images = ProductImagesSerializer(many=True, read_only=True)
    #main_image = images.first()
    class Meta:
        model = Product
        fields = (
            'id',
            'title',
            'description',
            'created_at',
            'new_enabled',
            'is_new',
            'available_stock',
            'images',
            'price'
        )

