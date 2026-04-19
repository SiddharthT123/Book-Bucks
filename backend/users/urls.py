from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthViewSet, UserViewSet

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'users', UserViewSet, basename='user')

app_name = 'users'

urlpatterns = [
    path('', include(router.urls)),
    path('register/', AuthViewSet.as_view({'post': 'register'}), name='register'),
    path('login/', AuthViewSet.as_view({'post': 'login'}), name='login'),
    path('logout/', AuthViewSet.as_view({'post': 'logout'}), name='logout'),
    path('me/', AuthViewSet.as_view({'get': 'me'}), name='me'),
    path('profile/update/', AuthViewSet.as_view({'put': 'update_profile'}), name='update_profile'),
    path('change-password/', AuthViewSet.as_view({'post': 'change_password'}), name='change_password'),
    path('verify-email/', AuthViewSet.as_view({'post': 'verify_email'}), name='verify_email'),
    path('resend-verification/', AuthViewSet.as_view({'post': 'resend_verification'}), name='resend_verification'),
]
