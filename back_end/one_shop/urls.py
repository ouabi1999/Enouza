from django.conf import settings
from django.conf.urls.static import static

from django.urls import path, include
from . import views
from .apiViews import authView, stripeChechout, productView , ordersView, chatView

urlpatterns = [
    
    path("index", views.index, name="mainView" ),
    path('register/', authView.RegisterView.as_view(), name='register'),
    path('login/', authView.LoginView.as_view(), name='login'),
    path('logout/', authView.LogoutView.as_view(), name='logout'),
    path('auth/', authView.Auth.as_view(), name='auth'),
    
    path('password-reset/', authView.PasswordResetView.as_view(), name='password-reset'),
    #path('', index, name='HomePageView')
    #path('', TemplateView.as_view(template_name='index.html'))
    path('create-payment-intent/', stripeChechout.CreatePaymentIntentView.as_view(), name='create_payment_intent'),
    path('webhook/', stripeChechout.StripeWebhookView.as_view(), name='handel_webhook'),
    path('handle-payment-success/', stripeChechout.HandlePaymentSuccessView.as_view(), name='handle_payment_success'),
    path('product-api/', productView.ProductView.as_view(), name='create-product'),
    path('product-details/<str:pk>/', productView.ProductDetailsView.as_view(), name='product-details'),
    path('get_dashboard_products/', productView.DashboardProductsView.as_view(), name='get_dashboard_products'),
    path('create-order/', productView.OrderCreateView.as_view(), name='create-order'),
    path('aliexpress-ratings/', productView.AliExpressRatingView.as_view(), name='ali-express-ratings'),
    path('set-rating/', productView.RatingView.as_view(), name='set-ratings'),

    
    path("get_user_orders/<str:pk>/", ordersView.OrdersView.as_view(), name='get_user_orders'),
    path("update-user/<str:pk>/", authView.UpdateUserView.as_view(), name='update_user_info'),
    path("update-user-password/<str:pk>/", authView.UpdateUserPasswordView.as_view(), name='update_user_password'),
    path("contact-us/", chatView.ContactUsView.as_view(), name="contact-us"),
    path("subscribe-newsletter/", chatView.NewsLetterView.as_view(), name="subscribe-newsletter")




   



]