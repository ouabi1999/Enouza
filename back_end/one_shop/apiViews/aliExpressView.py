# views.py
import time
import hmac
import hashlib
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
class AliExpressTokenView(APIView):
    """
    Create access token for AliExpress GOP API
    """

    def post(self, request, code=None):
        # Get authorization code from path, query, or POST body
        code = code or request.query_params.get("code") or request.data.get("code")
        if not code:
            return Response({"detail": "Missing 'code' parameter"}, status=400)

        # AliExpress GOP API endpoint
        url = "https://api-sg.aliexpress.com/rest"
        action = "/auth/token/create"

        # Your app credentials
        app_key = os.getenv("ALIEXPRESS_APP_KEY", "YOUR_APP_KEY")
        app_secret = os.getenv("ALIEXPRESS_APP_SECRET", "YOUR_APP_SECRET")

        # System + application parameters
        timestamp = str(int(time.time() * 1000))  # milliseconds
        params = {
            "app_key": app_key,
            "timestamp": timestamp,
            "grant_type": "authorization_code",
            "sign_method" : "sha256",
            "code": code
        }

        # Generate HMAC-SHA256 signature
        sorted_keys = sorted(params)
        base_string = action + ''.join(f"{k}{params[k]}" for k in sorted_keys)
        sign = hmac.new(app_secret.encode("utf-8"), base_string.encode("utf-8"), hashlib.sha256).hexdigest().upper()
        params["sign"] = sign

        try:
            # Send POST request as form-encoded
            response = requests.post(f"{url}{action}", data=params, timeout=10)
            response.raise_for_status()

            # Return JSON from AliExpress
            return Response(response.json())

        except requests.exceptions.RequestException as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class AliExpressProductView(APIView):
    """
    Fetch AliExpress product details using access token.
    """

    API_PATH = "/rest"  # GOP endpoint base path
    PRODUCT_METHOD = "aliexpress.ds.product.get"

    def get(self, request, product_id=None, ):
        access_token = request.query_params.get("aliexpress_access_token")
        if not access_token:
            return Response({"error": "Missing access token"}, status=status.HTTP_400_BAD_REQUEST)

        app_key = os.getenv("ALIEXPRESS_APP_KEY")
        app_secret = os.getenv("ALIEXPRESS_APP_SECRET")

        if not app_key or not app_secret:
            return Response({"error": "AliExpress credentials not configured."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # System + application parameters
        params = {
            "app_key": app_key,
            "method": self.PRODUCT_METHOD,
            "timestamp": str(int(time.time() * 1000)),  # milliseconds
            "sign_method": "sha256",
            "access_token": access_token,
            "product_id": product_id,
            "ship_to_country": "US",
        }

        # Create signature
        sorted_keys = sorted(params)
        base_string = self.PRODUCT_METHOD + ''.join(f"{k}{params[k]}" for k in sorted_keys)
        params["sign"] = hmac.new(app_secret.encode(), base_string.encode(), hashlib.sha256).hexdigest().upper()

        # POST request to AliExpress GOP API
        url = "https://api-sg.aliexpress.com/rest"
        try:
            res = requests.post(url, data=params, timeout=10)
            res.raise_for_status()
            data = res.json()
        except requests.RequestException as e:
            return Response({"error": "Failed to fetch product", "details": str(e)},
                            status=status.HTTP_502_BAD_GATEWAY)
        except ValueError as e:  # JSON decode error
            return Response({"error": "Invalid JSON response", "details": str(e)},
                            status=status.HTTP_502_BAD_GATEWAY)

        return Response({"status": "success", "data": data}, status=status.HTTP_200_OK)