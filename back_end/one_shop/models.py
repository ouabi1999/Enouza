from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import uuid
from django.utils import timezone
from django.conf import settings

def get_uuid():
    return str(uuid.uuid4())
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class Users(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=get_uuid, editable=False)
    lastName = models.CharField(max_length=35)
    firstName = models.CharField(max_length=30)
    gender = models.CharField(max_length=30)
    email = models.EmailField(max_length=100, unique=True)
    birthDate = models.DateField(null=True, blank=True)
    country = models.CharField(max_length=30)
    countryCode = models.CharField(max_length=30)
    address = models.TextField(null=True, blank=True)
    joined_at = models.DateField(default=timezone.now, blank=True, null=True)
    reset_token = models.CharField(null=True, max_length=30, blank=True)
    token_expiration = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.lastName

class Products(models.Model):
    id = models.BigAutoField(primary_key=True, unique=True)
    name = models.TextField()
    description =  models.TextField()
    brand = models.CharField(max_length=100, blank=True, null=True)
    SKU = models.CharField(max_length=100, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=5, decimal_places=2)
    sizes = models.JSONField(blank=True, null=True, default=[])  # Stores sizes as a JSON array
    colors = models.JSONField()  # Stores color image URLs as a JSON array
    specifications = models.JSONField(blank=True, null=True)
    images = models.JSONField(blank=True, null=True)
    quantity = models.IntegerField()
    in_stock = models.BooleanField(default=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    tags = models.JSONField(blank=True, null=True)
    seo = models.JSONField(blank=True, null=True)
    warranty = models.CharField(max_length=100, blank=True, null=True)
    care_instructions = models.TextField(blank=True, null=True)
    release_date = models.DateField(default=timezone.now, blank=True, null=True)
    sale_end_date = models.CharField(max_length=255, blank=True, null=True)
    available_shipping = models.JSONField(blank=True, null=True)
    return_policy = models.TextField(blank=True, null=True)
    country_of_origin = models.CharField(max_length=100, blank=True, null=True)
    social_media_links = models.JSONField(blank=True, null=True)
    orders = models.ManyToManyField('Orders', related_name='products', blank=True)

   

    def __str__(self):
        return self.name

class GlobalCoupon(models.Model):
    id = models.UUIDField(primary_key=True, default=get_uuid, editable=False)
    global_coupon_code = models.CharField(max_length=30, blank=True, null=True)
    product = models.ForeignKey('Products', on_delete=models.CASCADE, related_name='global_coupons', blank=True, null=True)

    def __str__(self):
        return f"{self.global_coupon_code}"
class Address(models.Model):
    id = models.BigAutoField(primary_key=True, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    address1 = models.CharField(max_length=255)
    address2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.address1}, {self.city}, {self.country}"
    
class Orders(models.Model):
    id = models.BigAutoField(primary_key=True, unique=True)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    ordered_items = models.JSONField()
    shipping_method = models.CharField(max_length=100)
    shipping_price = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_time = models.CharField(max_length=100)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    ordered_at = models.DateField(auto_now_add=True)
    # Association to User
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders")


    def __str__(self):
        return f"Order {self.id} by {self.payment_method}"
    
    


class Ratings(models.Model):
    id = models.BigAutoField(primary_key=True, unique=True)
    stars = models.IntegerField()
    review = models.JSONField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey('Products', on_delete=models.CASCADE, related_name='rating')
    created_at = models.DateField(auto_now_add=True)
    def __str__(self):
        return f"{self.stars} stars by {self.review}"
    
class AliExpressRatings(models.Model):
    id = models.BigAutoField(primary_key=True, unique=True)
    stars = models.IntegerField()
    review = models.JSONField()
    user = models.JSONField()
    product = models.ForeignKey('Products', on_delete=models.CASCADE, related_name='aliratings')
    created_at = models.DateField(auto_now_add=True)
    def __str__(self):
        return f"{self.stars} stars by {self.review}"



class ShoppingCart(models.Model):
    id = models.BigAutoField(primary_key=True, unique=True)
    selected_color = models.CharField(max_length=50, blank=True, null=True)
    seledcted_color = models.CharField(max_length=50, blank=True, null=True)
    selected_quantity = models.IntegerField(blank=True, null=True)
    selected_size = models.CharField(max_length=50, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"Cart {self.id} with subtotal {self.subtotal}"


class Contact(models.Model):
    id = models.BigAutoField(primary_key=True, unique=True)
    email = models.EmailField(max_length=200)
    message = models.TextField()

    def __str__(self):
        return f"Contact from {self.email}"
    
    
class Newsletter(models.Model):
    id = models.BigAutoField(primary_key=True, unique=True)
    email = models.EmailField(max_length=200, unique=True)

    def __str__(self):
        return self.email

