from rest_framework import serializers
from .models import * 
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from rest_framework.response import Response
from django.contrib.auth import get_user_model,  authenticate
import json
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

from django import forms
from rest_framework.exceptions import APIException

class CustomException(APIException):
    status_code = 401 # Customize the status code
    default_detail = "A custom error occurred."  # Customize the error message
    default_code = "custom_error"

User = get_user_model()
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        
class OrderSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    class Meta:
        model = Orders
        fields = "__all__"

    def create(self, validated_data):
        
     
        
        ordered_items = validated_data.pop('ordered_items')
        if isinstance(ordered_items, str):
            try:
                ordered_items = json.loads(ordered_items)
            except json.JSONDecodeError:
                raise serializers.ValidationError({"ordered_items": "Invalid format for ordered_items"})
            
        address_data = validated_data.pop("address")
        # Create address
        address = Address.objects.create(**address_data)
        
      # Create order
        order = Orders.objects.create(
            address=address, 
            ordered_items= ordered_items,
            **validated_data
        )
        
        # Add order to products' orders list
        for item in ordered_items:
            product = Products.objects.get(id=item['id'])
            order.products.add(product)  # This is the correct way to add orders to products
        
        return order





class UpdatePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)  # Django's built-in password validators
        return value

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", 'lastName', 'firstName', 'countryCode' ,'gender', 'email', 'birthDate', 'country', 'address', 'joined_at']
        read_only_fields = ['id', 'joined_at']

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = (
            "id",
            "firstName",
            "lastName",
            "gender",
            "email",
            "password",
            "birthDate",
            "country",
            'countryCode', 
            "address",
            "is_staff",
            "joined_at",
        )
        extra_kwargs = {'password': {'write_only': True}, }

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            "id",
            "firstName",
            "lastName",
            "gender",
            "email",
            "password",
            "country",
        )
        
    def validate_email(self, value):
        """
        Check if the email is already in use.
        """
        if Users.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email address is already registered.")
        return value
    
    def create(self, validated_data):
        user = Users.objects.create_user(
            firstName =  validated_data["firstName"],
            lastName  =  validated_data["lastName"],
            gender  = validated_data["gender"],
            email  = validated_data["email"],
            password  = validated_data["password"],
            country = validated_data["country"],
            
        )
        return user
    
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    
    def validate(self, data):
        print(data)
        email = data.get('email')
        password = data.get('password')
        
        if  not Users.objects.filter(email=email).exists():
            raise CustomException("This email address not registered.")
        


        if  email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            
            if user is None:
                
                raise serializers.ValidationError("Invalid login credentials. Please try again.")
                
        else:
            raise serializers.ValidationError("Username or email is required.")
        
        data['user'] = user
        return data 


class UserRatingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            "firstName",
            "lastName",
            "country",
            'countryCode'
        )
        
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ['id', 'stars', 'review', 'user', 'product', 'created_at']
        read_only_fields = ['id', 'created_at']
        
class getRatingSerializer(serializers.ModelSerializer):
    user = UserRatingsSerializer(read_only=True)
    class Meta:
        model = Ratings
        fields = ['id', 'stars', 'review', 'user', 'product', 'created_at']
        read_only_fields = ['id', 'created_at']
               

class AliExpressRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AliExpressRatings
        fields = ['id', 'stars', 'review', 'user', 'product', 'created_at']
        read_only_fields = ['id', 'created_at']
        
class ProductSerializer(serializers.ModelSerializer):
    available_shipping = serializers.JSONField()
    specifications = serializers.JSONField()
    images = serializers.JSONField()
    ali_express_ratings = serializers.JSONField(required= False)
    seo = serializers.JSONField(required= False)
    tags = serializers.JSONField(required= False)
    colors = serializers.JSONField()
    sizes = serializers.ListField(required= False, default=[])

    read_only_fields = ['id', 'release_date'] 
    aliexpress_ratings = AliExpressRatingSerializer(source='aliratings', many=True, read_only=True)
    ratings=  getRatingSerializer(source='rating', many=True, read_only=True, default=[])
    
    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative.")
        return value
    
       
    class Meta:
        model = Products
        fields = '__all__'
        
class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
        
class NewsLetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = '__all__'
    
    

