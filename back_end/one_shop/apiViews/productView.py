from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.paginator import Paginator
from django.http.response import JsonResponse
import json
from rest_framework.views import APIView
from ..models import Products, Address, Users, Orders, AliExpressRatings, Ratings
from ..serializer import ProductSerializer, OrderSerializer,  AliExpressRatingSerializer, RatingSerializer
from rest_framework.exceptions import ValidationError
from django.db import transaction
from rest_framework.permissions import IsAuthenticated




import cloudinary.uploader





class ProductView(APIView):
    parser_classes = [MultiPartParser, FormParser]
   
    def post(self, request):
        data = request.data.copy() # Make a copy to modify
        images_object = {}
        

        # Cloudinary - Upload main image, check if file exists in request.FILES
        if 'main_image' in request.data:
            main_image = request.data['main_image']
            main_image_result = cloudinary.uploader.upload(main_image)
            images_object["main_image"] = main_image_result["secure_url"]

        color_urls = []

        # Get the color images from the request files
        color_images = request.data.getlist('colors')
        # Upload each color image to Cloudinary and get the URL
        for color_img in color_images:
            upload_result = cloudinary.uploader.upload(color_img)
            # Append the secure URL of the uploaded image
            color_urls.append(upload_result['secure_url'])
            print(upload_result['secure_url'])
        # Update the 'colors' field with the list of color image URLs (flat list)
        data['colors'] = json.dumps(color_urls)

        # Cloudinary - Upload additional images, if they are provided in request.FILES
        additional_urls = []
        additional_images = request.data.getlist("additional_images")
        for additional_img in additional_images:
            if additional_img:  # Ensure the file is not empty
                upload_result = cloudinary.uploader.upload(additional_img)
                additional_urls.append(upload_result["secure_url"])
                
        images_object["additional_images"] = additional_urls
        data["images"] = json.dumps(images_object)

        
        serializer = ProductSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        product_data = Products.objects.all()
        serializer = ProductSerializer(product_data, many=True)
        return Response(serializer.data)
    
  


class ProductDetailsView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, pk=None):
        product = Products.objects.get(id = pk)
        serializer =  ProductSerializer(product)
        if serializer.is_valid():
            return Response(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


    
    def delete(self, request, pk=None):
        product_to_delete = Products.objects.get(id = pk)
        product_to_delete.delete()
        
        return JsonResponse("Student Deleted Successfully", safe=False)
    def put(self, request, pk=None):
        product_to_update = Products.objects.get(id = pk)
        data = request.data.copy() # Make a copy to modify
        images_object = {}
       
        # Cloudinary - Upload main image, check if file exists in request.FILES
        if 'main_image' in request.data: 
            
            main_image = request.data['main_image']
            main_image_result = cloudinary.uploader.upload(main_image)
            images_object["main_image"] = main_image_result["secure_url"]

        color_urls = []

        # Get the color images from the request files
        color_images = request.data.getlist('colors')
        print(color_images)
        # Upload each color image to Cloudinary and get the URL
        for color_img in color_images:
            upload_result = cloudinary.uploader.upload(color_img)
            # Append the secure URL of the uploaded image
            color_urls.append(upload_result['secure_url'])
            print(upload_result['secure_url'])
        # Update the 'colors' field with the list of color image URLs (flat list)
        data['colors'] = json.dumps(color_urls)

        # Cloudinary - Upload additional images, if they are provided in request.FILES
        additional_urls = []
        additional_images = request.data.getlist("additional_images")
        for additional_img in additional_images:
            if additional_img:  # Ensure the file is not empty
                upload_result = cloudinary.uploader.upload(additional_img)
                additional_urls.append(upload_result["secure_url"])
                
        images_object["additional_images"] = additional_urls
        data["images"] = json.dumps(images_object)

        
        serializer = ProductSerializer( product_to_update, data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DashboardProductsView(APIView):
    def get(self, request):
        current_page = int(request.GET.get('currentPage', 1))
        per_page = int(request.GET.get('per_page', 10))  # Default 10 products per page
    
        # Fetch all products
        products = Products.objects.all()
        
        # Apply pagination
        paginator = Paginator(products, per_page)
        page = paginator.get_page(current_page)
    
        # Serialize the products data
        serializer = ProductSerializer(page.object_list, many=True)
    
        # Return response with paginated data
        return Response({
            'products': serializer.data,
            'total_products': paginator.count,
            'total_pages': paginator.num_pages
           })


class OrderCreateView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                serializer = OrderSerializer(data=request.data)

                if serializer.is_valid():
                    order = serializer.save()
                    return Response({
                        "message": "Order created successfully",
                        "order_id": order.id
                    }, status=status.HTTP_201_CREATED)
                    
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get(self, request):
        Ordersdata = Orders.objects.all()
        serializer = OrderSerializer(Ordersdata, many= True, default=[])
        
        return Response(serializer.data)
        
class AliExpressRatingView(APIView):
    serializer_class = AliExpressRatingSerializer
    def post(self, request):
        data = request.data.copy() 
        product_id = request.data.get('product')
        
        
        
        product = Products.objects.get(id=product_id) 
        if not product:
            return Response(
                    {"error": "Product not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
        images_urls = []
        review = data.get('review')
        if isinstance(review, str):
            try:
                review = json.loads(review)  # Parse string to dictionary
            except json.JSONDecodeError as e:
                return Response({"error": "Invalid JSON format for review."}, status=400)
     
        for img in review["images"]:
            if img:  # Ensure the file is not empty
                upload_result = cloudinary.uploader.upload(img)
                images_urls.append(upload_result["secure_url"])
                print(upload_result["secure_url"])
                
        review["images"] =  images_urls
        data["review"] =  review

        
        serializer = AliExpressRatingSerializer(data=request.data)
        if serializer.is_valid():
                serializer.save()
                return Response({
                    "message": "Rating submitted successfully",
                    "data": serializer.data
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RatingView(APIView):
    def get(self, requst):
        ratings = Ratings.objects.all()

        serializer = RatingSerializer(ratings, many=True)
       
        return Response(serializer.data)
        
    def post(self, request):
        data = request.data.copy() 
        product_id = data.get('product')
        
        
        
        product = Products.objects.get(id=product_id) 
        if not product:
            return Response(
                    {"error": "Product not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
        images_urls = []
        review = data.get('review')
        if isinstance(review, str):
            try:
                review = json.loads(review)  # Parse string to dictionary
            except json.JSONDecodeError as e:
                return Response({"error": "Invalid JSON format for review."}, status=400)
     
        for img in review["images"]:
            if img:  # Ensure the file is not empty
                upload_result = cloudinary.uploader.upload(img)
                images_urls.append(upload_result["secure_url"])
                print(upload_result["secure_url"])
                
        review["images"] =  images_urls
        data["review"] =  review

                
        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
                serializer.save()
                return Response({
                    "message": "Rating submitted successfully",
                    "data": serializer.data
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    