from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.paginator import Paginator
from django.http.response import JsonResponse
import json
from rest_framework.views import APIView
from ..models import Products, Address, Users, Orders, AliExpressRatings, Ratings
from django.db.models import Count
from django.http import JsonResponse
from django.db.models import Avg, Count, Value
from django.db.models.functions import Coalesce

from ..serializer import (
    ProductSerializer,
    OrderSerializer,
    AliExpressRatingSerializer,
    RatingSerializer,
)
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.db.models import Q, Case, When, IntegerField, Count, Min, Max, FloatField
from django.db.models.functions import Cast


import cloudinary.uploader


class ProductView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        data = request.data.copy()  # Make a copy to modify

        serializer = ProductSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        start = int(request.GET.get("start", 0))
        per_page = int(request.GET.get("per_page", 10))

        products_qs = Products.objects.annotate(
              ratings_count=Count("aliratings", distinct=True),
              orders_count=Count("orders", distinct=True)
              ).order_by("orders_count", "-ratings_count", "-release_date")





        total_products = products_qs.count()

        products = products_qs[start : start + per_page]

        serializer = ProductSerializer(products, many=True)

        return JsonResponse(
            {
                "products": serializer.data,
                "total_products": total_products,
                "has_more": start + per_page < total_products,
            }
        )


class ProductDetailsView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, pk=None):
        product = get_object_or_404(Products, id=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk=None):
        product_to_delete = Products.objects.get(id=pk)
        product_to_delete.delete()

        return JsonResponse("User Deleted Successfully", safe=False)

    def put(self, request, pk=None):
        product_to_update = Products.objects.get(id=pk)
        data = request.data.copy()  # Make a copy to modify
        images_object = {}

        # Cloudinary - Upload main image, check if file exists in request.FILES
        if "main_image" in request.data:

            main_image = request.data["main_image"]
            main_image_result = cloudinary.uploader.upload(main_image)
            images_object["main_image"] = main_image_result["secure_url"]

        color_urls = []

        # Get the color images from the request files
        color_images = request.data.getlist("colors")
        # Upload each color image to Cloudinary and get the URL
        for color_img in color_images:
            upload_result = cloudinary.uploader.upload(color_img)
            # Append the secure URL of the uploaded image
            color_urls.append(upload_result["secure_url"])
        # Update the 'colors' field with the list of color image URLs (flat list)
        data["colors"] = json.dumps(color_urls)

        # Cloudinary - Upload additional images, if they are provided in request.FILES
        additional_urls = []
        additional_images = request.data.getlist("additional_images")
        for additional_img in additional_images:
            if additional_img:  # Ensure the file is not empty
                upload_result = cloudinary.uploader.upload(additional_img)
                additional_urls.append(upload_result["secure_url"])

        images_object["additional_images"] = additional_urls
        data["images"] = json.dumps(images_object)

        serializer = ProductSerializer(product_to_update, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DashboardProductsView(APIView):
    def get(self, request, *args, **kwargs):
        current_page = int(request.GET.get("currentPage", 1))
        per_page = int(request.GET.get("per_page", 10))  # Default 10 products per page

        # Fetch all products
        products = Products.objects.all()

        # Apply pagination
        paginator = Paginator(products, per_page)
        page = paginator.get_page(current_page)

        # Serialize the products data
        serializer = ProductSerializer(page.object_list, many=True)

        # Return response with paginated data
        return Response(
            {
                "products": serializer.data,
                "total_products": paginator.count,
                "total_pages": paginator.num_pages,
            }
        )


class OrderCreateView(APIView):
    def post(self, request, *args, **kwargs):
        request_data = request.data
        try:
            with transaction.atomic():
                address = {
                    "first_name": request_data["first_name"],
                    "last_name": request_data["last_name"],
                    "email": request_data["email"],
                    "address1": request_data["address1"],
                    "address2": request_data["address2"],  # Optional field with default
                    "city": request_data["city"],
                    "state": request_data["state"],  # Optional field with default
                    "country": request_data["country"],
                    "zipcode": request_data["zipcode"],
                }
                request_data["address"] = address
                serializer = OrderSerializer(data=request_data)

                if serializer.is_valid():
                    order = serializer.save()
                    return Response(
                        {"message": "Order created successfully", "order_id": order},
                        status=status.HTTP_201_CREATED,
                    )

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get(self, request):
        Ordersdata = Orders.objects.all()
        serializer = OrderSerializer(Ordersdata, many=True, default=[])

        return Response(serializer.data)


class AliExpressRatingView(APIView):
    serializer_class = AliExpressRatingSerializer

    def post(self, request):
        data = request.data.copy()
        product_id = request.data.get("product")
        # Check if the product exists
        product = Products.objects.get(id=product_id)
        if not product:
            return Response(
                {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )
        images_urls = []
        review = data.get("review")
        if isinstance(review, str):
            try:
                review = json.loads(review)  # Parse string to dictionary
            except json.JSONDecodeError as e:
                return Response(
                    {"error": "Invalid JSON format for review."}, status=400
                )

        for img in review["images"]:
            if img:  # Ensure the file is not empty
                upload_result = cloudinary.uploader.upload(img)
                images_urls.append(upload_result["secure_url"])
                print(upload_result["secure_url"])

        review["images"] = images_urls
        data["review"] = review

        serializer = AliExpressRatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Rating submitted successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RatingView(APIView):
    def get(self, requst):
        ratings = Ratings.objects.all()

        serializer = RatingSerializer(ratings, many=True)

        return Response(serializer.data)

    def post(self, request):
        data = request.data.copy()
        product_id = data.get("product")

        product = Products.objects.get(id=product_id)
        if not product:
            return Response(
                {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )
        images_urls = []
        review = data.get("review")
        if isinstance(review, str):
            try:
                review = json.loads(review)  # Parse string to dictionary
            except json.JSONDecodeError as e:
                return Response(
                    {"error": "Invalid JSON format for review."}, status=400
                )

        for img in review["images"]:
            if img:  # Ensure the file is not empty
                upload_result = cloudinary.uploader.upload(img)
                images_urls.append(upload_result["secure_url"])
                print(upload_result["secure_url"])

        review["images"] = images_urls
        data["review"] = review

        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Rating submitted successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductFilterView(APIView):
    def get(self, request):
        queryset = Products.objects.all()

        # 🔹 QUERY PARAMS
        search = request.query_params.get("search")
        category = request.query_params.get("category")
        min_price = request.query_params.get("min_price")
        max_price = request.query_params.get("max_price")
        sort = request.query_params.get("sort")

        page = int(request.query_params.get("page", 1))
        per_page = int(request.query_params.get("per_page", 10))

        # 🔍 SEARCH (JSONField)
        if search:
            search = search.strip()
            if search:
                queryset = queryset.filter(
                    Q(name__en__icontains=search) | Q(description__en__icontains=search)
                )

        # 🟢 CATEGORY FILTER
        if category:
            queryset = queryset.filter(category=category)

        # 🔹 ANNOTATE min/max sellingPrice for array of SKUs
        queryset = queryset.annotate(
            min_price=Min(Cast("skuInfo__sellingPrice", FloatField())),
            max_price=Max(Cast("skuInfo__sellingPrice", FloatField())),
            orders_count=Count("orders"),
        )

        # 💰 PRICE FILTER
        if min_price and min_price.replace(".", "", 1).isdigit():
            queryset = queryset.filter(min_price__gte=float(min_price))
        if max_price and max_price.replace(".", "", 1).isdigit():
            queryset = queryset.filter(max_price__lte=float(max_price))

        # 🔵 SORTING
        if sort == "price_asc":
            queryset = queryset.order_by("min_price")
        elif sort == "price_desc":
            queryset = queryset.order_by("-max_price")
        elif sort == "orders":
            queryset = queryset.order_by("-orders_count")
        elif sort == "best_match" and search:
            queryset = queryset.annotate(
                relevance=Case(
                    When(name__en__icontains=search, then=3),
                    When(description__en__icontains=search, then=2),
                    default=0,
                    output_field=IntegerField(),
                )
            ).order_by("-relevance", "-orders_count")
        elif search:
            # Default Best Match when searching
            queryset = queryset.annotate(
                relevance=Case(
                    When(name__en__icontains=search, then=3),
                    When(description__en__icontains=search, then=2),
                    default=0,
                    output_field=IntegerField(),
                )
            ).order_by("-relevance", "-orders_count")
        else:
            # Default when no search
            queryset = queryset.order_by("-release_date")

        # 📄 PAGINATION
        paginator = Paginator(queryset, per_page)
        page_obj = paginator.get_page(page)

        serializer = ProductSerializer(page_obj.object_list, many=True)

        return Response(
            {
                "count": paginator.count,
                "total_pages": paginator.num_pages,
                "current_page": page,
                "results": serializer.data,
            },
            status=status.HTTP_200_OK,
        )


class HeroProductView(APIView):
    def get(self, request):
        # 1️⃣ Try manual hero product
        hero = (
            Products.objects.filter(isHero=True)
           
            .first()
        )
        if not hero:
            return Response(
                {"detail": "No hero product available"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = ProductSerializer(hero)
        return Response(serializer.data, status=status.HTTP_200_OK)
