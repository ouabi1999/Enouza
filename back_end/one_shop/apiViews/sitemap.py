from django.contrib.sitemaps import Sitemap
from ..models import Products  # Adjust based on your app
from django.contrib.sitemaps.views import sitemap

class StaticSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.8

    def items(self):
        return [
            {'loc': '/', 'lastmod': None, 'priority': 1.0},
            {'loc': '/about', 'lastmod': None, 'priority': 0.8},
            {'loc': '/products', 'lastmod': None, 'priority': 0.9},
            {'loc': '/contact', 'lastmod': None, 'priority': 0.7},
        ]

    def location(self, item):
        return f"https://www.enouza.com{item['loc']}"

    def lastmod(self, item):
        return item['lastmod']

    def priority(self, item):
        return item['priority']

class ProductSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.8

    def items(self):
        return Products.objects.filter(is_active=True)

    def location(self, obj):
        return f"https://www.enouza.com/product/{obj.slug}"

    def lastmod(self, obj):
        return obj.updated_at
