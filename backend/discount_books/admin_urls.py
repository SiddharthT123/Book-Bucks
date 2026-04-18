from django.urls import path, include
from rest_framework.routers import DefaultRouter
from discount_books.admin_views import AdminDashboardViewSet, AdminUserViewSet, AdminBookViewSet

router = DefaultRouter()
router.register(r'dashboard', AdminDashboardViewSet, basename='admin-dashboard')
router.register(r'users', AdminUserViewSet, basename='admin-users')
router.register(r'books', AdminBookViewSet, basename='admin-books')

urlpatterns = [
    path('', include(router.urls)),
]
