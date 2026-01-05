# views.py
from rest_framework.views import APIView

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import json
import cloudinary.uploader
from ..models import Display
from ..serializer import DisplaySerializer
from rest_framework.parsers import MultiPartParser, FormParser

class DisplayInfoAPIView(ModelViewSet):
    queryset = Display.objects.all()
    serializer_class = DisplaySerializer
    parser_classes = [MultiPartParser, FormParser]
