from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.paginator import Paginator
from django.http.response import JsonResponse
import json
from rest_framework.views import APIView
from ..models import Products, Address, Users, Orders, Rating
from django.db.models import Count
from django.http import JsonResponse
from django.db.models import Avg, Count, Value
from django.db.models.functions import Coalesce

from ..serializer import (
    ProductSerializer,
    OrderSerializer,
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
              ratings_count=Count("user_ratings", distinct=True),
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

         # ============================================================
        # CREATE MUTABLE DATA WITHOUT COPYING UPLOADED FILES
        # ============================================================

        data = {}

        for key in request.data:
            # Files are handled separately through request.FILES
            if key not in ["main_image", "additionalImageFiles", "colors"]:
                data[key] = request.data.get(key)

            # Repeated fields
        data["tags"] = request.data.getlist("tags")
        data["ali_express_ratings"] = request.data.getlist(
            "ali_express_ratings"
        )
        data["seo"] = request.data.getlist("seo")
        
        # ============================================================
            # MULTIMEDIA INFO
            # ============================================================
        
        multimedia_info = json.loads(
            data.get("multimediaInfo", "{}")
        )
    
        # ============================================================
        # MAIN IMAGE
        # ============================================================

        main_image_file = request.FILES.get("main_image")
    
        if main_image_file:
            result = cloudinary.uploader.upload(
                main_image_file,
                folder="enouza/products"
            )
    
            multimedia_info["main_image"] = result["secure_url"]

        else:
            main_image_url = data.get("main_image")
    
            if main_image_url:
                multimedia_info["main_image"] = main_image_url
    
        # ============================================================
        # COLOR IMAGES
        # ============================================================

        color_urls = []
    
        color_images = request.FILES.getlist("colors")

        for color_img in color_images:
            result = cloudinary.uploader.upload(
                color_img,
                folder="enouza/products"
            )

            color_urls.append(result["secure_url"])

        data["colors"] = json.dumps(color_urls)
    
        # ============================================================
        # ADDITIONAL IMAGES
        # ============================================================

        # Existing URLs already inside multimediaInfo
        image_urls = multimedia_info.get("image_urls", [])

        # Make sure it is always a list
        if not isinstance(image_urls, list):
            image_urls = []

        # New files uploaded from computer / drag & drop
        additional_files = request.FILES.getlist(
            "additionalImageFiles"
        )

        for image_file in additional_files:

            result = cloudinary.uploader.upload(
                image_file,
                folder="enouza/products"
            )

            image_urls.append(
                result["secure_url"]
            )

        # Save the final combined list
        multimedia_info["image_urls"] = image_urls

        data["multimediaInfo"] = json.dumps(
            multimedia_info
        )

        # ============================================================
        # SAVE PRODUCT
        # ============================================================

        serializer = ProductSerializer(
            product_to_update,
            data=data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


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



class RatingView(APIView):
    def get(self, requst):
        ratings = Rating.objects.all()

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

        # ============================================================
        # QUERY PARAMETERS
        # ============================================================

        search = request.query_params.get("search", "").strip()
        category = request.query_params.get("category", "").strip()
        min_price = request.query_params.get("min_price", "").strip()
        max_price = request.query_params.get("max_price", "").strip()
        sort = request.query_params.get("sort", "best_match").strip()

        # ============================================================
        # PAGINATION
        # ============================================================

        try:
            page = int(request.query_params.get("page", 1))
        except (TypeError, ValueError):
            page = 1

        page = max(page, 1)

        try:
            per_page = int(request.query_params.get("per_page", 12))
        except (TypeError, ValueError):
            per_page = 12

        per_page = max(1, min(per_page, 50))

        # ============================================================
        # BASE QUERYSET
        # ============================================================

        queryset = Products.objects.all()

        # ============================================================
        # SEARCH
        # ============================================================

        if search:
            queryset = queryset.filter(
                Q(name__en__icontains=search)
                | Q(description__en__icontains=search)
            )

        # ============================================================
        # CATEGORY
        # Supports:
        #
        # category=table_lamps
        #
        # category=table_lamps,wall_lamps
        # ============================================================

        if category:

            categories = [
                value.strip()
                for value in category.split(",")
                if value.strip()
            ]

            if categories:
                queryset = queryset.filter(
                    category__in=categories
                )

        # ============================================================
        # ORDERS
        # ============================================================

        queryset = queryset.annotate(
            orders_count=Count(
                "orders",
                distinct=True
            )
        )

        # ============================================================
        # CONVERT QUERYSET TO LIST
        # ============================================================

        products = list(queryset)

        # ============================================================
        # HELPER: GET PRODUCT PRICES
        # ============================================================

        def get_product_prices(product):

            sku_info = product.skuInfo

            if not sku_info:
                return []

            prices = []

            # --------------------------------------------------------
            # skuInfo is normally a list
            # --------------------------------------------------------

            if isinstance(sku_info, list):

                for sku in sku_info:

                    if not isinstance(sku, dict):
                        continue

                    price = sku.get("sellingPrice")

                    if price is None:
                        continue

                    try:
                        price = float(price)
                        prices.append(price)
                    except (TypeError, ValueError):
                        continue

            # --------------------------------------------------------
            # In case skuInfo is a dictionary containing a list
            # --------------------------------------------------------

            elif isinstance(sku_info, dict):

                possible_skus = (
                    sku_info.get("skus")
                    or sku_info.get("items")
                    or sku_info.get("list")
                    or []
                )

                if isinstance(possible_skus, list):

                    for sku in possible_skus:

                        if not isinstance(sku, dict):
                            continue

                        price = sku.get("sellingPrice")

                        if price is None:
                            continue

                        try:
                            price = float(price)
                            prices.append(price)
                        except (TypeError, ValueError):
                            continue

                # ----------------------------------------------------
                # If the dictionary itself represents one SKU
                # ----------------------------------------------------

                else:

                    price = sku_info.get("sellingPrice")

                    if price is not None:

                        try:
                            price = float(price)
                            prices.append(price)
                        except (TypeError, ValueError):
                            pass

            return prices

        # ============================================================
        # ADD PRICE INFORMATION
        # ============================================================

        filtered_products = []

        parsed_min_price = None
        parsed_max_price = None

        # ------------------------------------------------------------
        # Parse minimum price
        # ------------------------------------------------------------

        try:
            if min_price:
                parsed_min_price = float(min_price)
        except (TypeError, ValueError):
            parsed_min_price = None

        # ------------------------------------------------------------
        # Parse maximum price
        # ------------------------------------------------------------

        try:
            if max_price:
                parsed_max_price = float(max_price)
        except (TypeError, ValueError):
            parsed_max_price = None

        # ============================================================
        # PROCESS PRODUCTS
        # ============================================================

        for product in products:

            prices = get_product_prices(product)

            # --------------------------------------------------------
            # No valid SKU price
            # --------------------------------------------------------

            if prices:

                product_min_price = min(prices)
                product_max_price = max(prices)

            else:

                product_min_price = None
                product_max_price = None

            # --------------------------------------------------------
            # Save temporary values on the object
            # --------------------------------------------------------

            product._filter_min_price = product_min_price
            product._filter_max_price = product_max_price

            # --------------------------------------------------------
            # PRICE FILTER
            # --------------------------------------------------------

            if parsed_min_price is not None:

                if (
                    product_min_price is None
                    or product_min_price < parsed_min_price
                ):
                    continue

            if parsed_max_price is not None:

                if (
                    product_max_price is None
                    or product_max_price > parsed_max_price
                ):
                    continue

            filtered_products.append(product)

        products = filtered_products

        # ============================================================
        # SORTING
        # ============================================================

        # ------------------------------------------------------------
        # PRICE LOW → HIGH
        # ------------------------------------------------------------

        if sort == "price_asc":

            products.sort(
                key=lambda product: (
                    product._filter_min_price is None,
                    product._filter_min_price
                    if product._filter_min_price is not None
                    else float("inf"),
                    product.id,
                )
            )

        # ------------------------------------------------------------
        # PRICE HIGH → LOW
        # ------------------------------------------------------------

        elif sort == "price_desc":

            products.sort(
                key=lambda product: (
                    product._filter_min_price is None,
                    -product._filter_min_price
                    if product._filter_min_price is not None
                    else float("inf"),
                    product.id,
                )
            )

        # ------------------------------------------------------------
        # MOST ORDERS
        # ------------------------------------------------------------

        elif sort == "orders":

            products.sort(
                key=lambda product: (
                    -(product.orders_count or 0),
                    product.id,
                )
            )

        # ------------------------------------------------------------
        # BEST MATCH
        # ------------------------------------------------------------

        elif sort == "best_match":

            if search:

                search_lower = search.lower()

                def relevance(product):

                    score = 0

                    name = product.name or {}
                    description = product.description or {}

                    name_en = str(
                        name.get("en", "")
                    ).lower()

                    description_en = str(
                        description.get("en", "")
                    ).lower()

                    # Exact/full name occurrence
                    if search_lower in name_en:
                        score += 3

                    # Description occurrence
                    if search_lower in description_en:
                        score += 2

                    return score

                products.sort(
                    key=lambda product: (
                        -relevance(product),
                        -(product.orders_count or 0),
                        product.id,
                    )
                )

            else:

                products.sort(
                    key=lambda product: (
                        -(product.orders_count or 0),
                        -(
                            product.release_date.timestamp()
                            if product.release_date
                            else 0
                        ),
                        product.id,
                    )
                )

        # ------------------------------------------------------------
        # FALLBACK
        # ------------------------------------------------------------

        else:

            products.sort(
                key=lambda product: (
                    -(
                        product.release_date.timestamp()
                        if product.release_date
                        else 0
                    ),
                    product.id,
                )
            )

        # ============================================================
        # PAGINATION
        # ============================================================

        paginator = Paginator(
            products,
            per_page
        )

        page_obj = paginator.get_page(page)

        # ============================================================
        # SERIALIZER
        # ============================================================

        serializer = ProductSerializer(
            page_obj.object_list,
            many=True
        )

        # ============================================================
        # RESPONSE
        # ============================================================

        return Response(
            {
                "count": paginator.count,
                "total_pages": paginator.num_pages,
                "current_page": page_obj.number,
                "per_page": per_page,
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
