from django.db import models

# Create your models here.
class Order(models.Model):
    STATUS_CHOICES = [
        ('approved', 'approved'),
        ('cancel', 'cancel'),
        ('pending', 'pending')
        ]

    order_id = models.UUIDField(primary_key=True)
    collection_id = models.CharField(max_length=20)
    payment_type = models.CharField(max_length=20)
    merchant_order_id = models.CharField(max_length=20)
    date_order = models.DateTimeField(auto_now_add=True)
    user = models.CharField(max_length=100)
    address = models.CharField(max_length=200, default='')
    city = models.CharField(max_length=200, default='')
    comment = models.TextField(default='')
    email = models.EmailField()
    phone_number = models.CharField(max_length=25, default='')
    status = models.CharField(max_length=8, choices=STATUS_CHOICES)
    total = models.FloatField(default=0.0)

    def __str__(self):
        return str(self.order_id)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=1)
    unitary_price = models.FloatField(default=0.0)
    total = models.FloatField(default=0.0)

    def __str__(self):
        return f"#{self.id}"

    def save(self, *args, **kwargs):
        self.total = self.quantity*self.unitary_price
        super(OrderItem, self).save(*args, **kwargs)

