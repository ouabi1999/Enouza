from django.contrib import admin
from .models import *

# Register your models here.
class TodoAdmin(admin.ModelAdmin):
    list_display = (
        "firstName",
        "lastName",
        "email",
        "password",
        "birthDate",
        "country",
        "address",
        "joined_at",
        "reset_token",
        "token_expiration",
    )



    
admin.site.register(Products)
admin.site.register(Orders)
admin.site.register(Ratings)
admin.site.register(AliExpressRatings)

    

admin.site.register(Users, TodoAdmin)
