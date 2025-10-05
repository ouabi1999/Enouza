import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
.use(Backend)
// detect user language
// learn more: https://github.com/i18next/i18next-browser-languageDetector
.use(LanguageDetector)

.use(initReactI18next)
.init({
    debug: true,
    fallbacklng:"en",
    resources:{
        es:{
            translation:{
                header:{

                },
                menu:{

                },
                homePage:{

                },
                productPage:{

                },
                footer:{

                },
                policies:{
                    privacyPolicy:{

                    },
                    termsOfService:{

                    },
                    refundPolicy:{

                    },
                    shippingPolicy:{

                    },
                },
                userDashboard:{

                },
                adminDashboard:{

                },
                checkout:{

                },
                contactUs:{

                },
                aboutUs:{

                },
                helpCenter:{

                },
                searchPage:{

                },
                notFoundPage:{

                },
                orderSuccess:{

                },



            }
        }
    },
        ar:{
            translation:{
                header:{

                },
                menu:{
                    login:"تسجيل الدخول",
                    searchPlaceholder:"ابحث عن المنتجات ...",
                    cart:"عربة التسوق",
                    wishlist:"قائمة الرغبات",
                    profile:"الملف الشخصي",
                    logout:"تسجيل خروج",
                    dashboard:"لوحة القيادة",
                    adminDashboard:"لوحة تحكم المسؤول",
                    userDashboard:"لوحة المستخدم",
                    home:"الصفحة الرئيسية",
                    contactUs:"اتصل بنا",
                    aboutUs:"معلومات عنا",
                    privacyPolicy:"سياسة الخصوصية",
                    termsOfService:"شروط الخدمة",
                    refundPolicy:"سياسة الاسترجاع",
                    shippingPolicy:"سياسة الشحن",
                    helpCenter:"مركز المساعدة",
                    myOrders:"طلباتي",
                    notifications:"الإشعارات",
                    shoppingCart:"عربة التسوق",
                    checkout:"الدفع",
                    orderSuccess:"نجاح الطلب",




                },
                homePage:{
                    welcomeMessage:"مرحبًا بك في متجرنا الإلكتروني",
                    featuredProducts:"المنتجات المميزة",
                    newArrivals:"الوافدون الجدد",
                    bestSellers:"الأكثر مبيعًا",
                    specialOffers:"عروض خاصة",
                    buyerTrustServices:"خدمات ثقة المشتري",
                    freeShipping:"شحن مجاني للطلبات التي تزيد عن 50 دولارًا",


                },
                productPage:{
                    addToCart:"أضف إلى السلة",
                    buyNow:"اشتري الآن",
                    productDescription:"وصف المنتج",
                    customerReviews:"مراجعات العملاء",
                    ratings:"التقييمات",
                    specifications:"المواصفات",
                    relatedProducts:"منتجات ذات صلة",
                    stockAvailability:"توفر المخزون",
                    quantity:"الكمية",
                    outOfStock:"غير متوفر في المخزون",
                    inStock:"متوفر في المخزون",


                },
                footer:{
                    aboutUs:"معلومات عنا",
                    contactUs:"اتصل بنا",
                    privacyPolicy:"سياسة الخصوصية",
                    termsOfService:"شروط الخدمة",
                    refundPolicy:"سياسة الاسترجاع",
                    shippingPolicy:"سياسة الشحن",
                    helpCenter:"مركز المساعدة",
                    followUs:"تابعنا",

                },
                policies:{
                    privacyPolicy:{


                    },
                    termsOfService:{


                    },
                    refundPolicy:{


                    },
                    shippingPolicy:{

                    },
                },
                userDashboard:{


                },
                adminDashboard:{


                },
                checkout:{


                },
                contactUs:{


                },
                aboutUs:{


                },
                helpCenter:{


                },
                searchPage:{


                },
                notFoundPage:{

                },
                orderSuccess:{



                },


            }
        }

})
export default i18n;