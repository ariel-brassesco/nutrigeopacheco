from rest_framework.serializers import ModelSerializer, RelatedField, StringRelatedField, SlugRelatedField, PrimaryKeyRelatedField
from .models import Product, ProductImages, Category, Promotion


class ExtraFieldsSerializer(ModelSerializer):
    '''
     This class override th get_field_names to add extra field defined in Meta class
     as extra_fields
    '''
    def get_field_names(self, declared_fields, info):
        expanded_fields = super(ExtraFieldsSerializer, self).get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields

class CategorySerializer(ExtraFieldsSerializer):
    '''
    Serializer of Category Class.
    '''
    class Meta:
        model = Category
        fields = '__all__'
        extra_fields = [
            'slug'
        ]

class PromotionSerializer(ModelSerializer):
    '''
    Serializer of Promotion Class.
    '''
    #products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Promotion
        #fields = ['product_list']
        fields = '__all__'

class ProductImagesSerializer(RelatedField):
    '''
        Serialize only the url of each image.
    '''
    def to_representation(self, value):
        return value.image.url

class ProductSerializer(ExtraFieldsSerializer):
    '''
        Serialize the data of product.
    '''
    images = ProductImagesSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    promotions = PromotionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'
        extra_fields = [
            'has_stock',
            'is_new',
            'slug'
        ]
