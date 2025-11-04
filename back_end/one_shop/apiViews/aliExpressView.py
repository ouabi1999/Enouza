import hashlib
import hmac
import time
import requests
from urllib.parse import urlencode
from django.http import JsonResponse
from django.conf import settings
import json
from ..models import Products 

"""
def Generate_aliexpress_signature(params: dict, app_secret: str) -> str:
    #Generate AliExpress API signature.
    sorted_params = "".join(f"{k}{v}" for k, v in sorted(params.items()))
    sign_string = app_secret + sorted_params + app_secret
    return hashlib.md5(sign_string.encode("utf-8")).hexdigest().upper()


def Aliexpress_product(request, product_id):
    #Fetch AliExpress product details securely.
    APP_KEY = settings.ALIEXPRESS_APP_KEY
    APP_SECRET = settings.ALIEXPRESS_APP_SECRET

    base_url = "https://api-sg.aliexpress.com/sync"
    method = "aliexpress.ds.product.get"
    timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    params = {
        "method": method,
        "app_key": APP_KEY,
        "timestamp": timestamp,
        "product_id": str(product_id),
        "format": "json",
    }

    # 🔒 Generate secure sign
    params["sign"] = Generate_aliexpress_signature(params, APP_SECRET)

    try:
        response = requests.get(base_url, params=params)
        data = response.json()

        result = data.get("aliexpress_ds_product_get_response", {}).get("result")
        if not result:
            return JsonResponse({"error": "Product not found"}, status=404)

        return JsonResponse(result, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
def Store_product(request):
    #Save imported product to your store database.
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)
    try:
        data = json.loads(request.body)
        product = Products.objects.create(
            title=data.get("title"),
            price=data.get("price"),
            currency=data.get("currency"),
            image=data.get("image"),
            source_store_id=data.get("store_id"),
        )
        return JsonResponse({"success": True, "id": product.id})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
        """