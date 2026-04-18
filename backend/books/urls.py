from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, CategoryViewSet, MessageViewSet

router = DefaultRouter()
router.register(r'', BookViewSet, basename='book')
router.register(r'categories', CategoryViewSet, basename='category')

# Explicit URL patterns for MessageViewSet to avoid router registration issues
message_view = MessageViewSet.as_view({
    'post': 'create',
})
message_inbox = MessageViewSet.as_view({'get': 'inbox'})
message_sent = MessageViewSet.as_view({'get': 'sent'})
message_unread = MessageViewSet.as_view({'get': 'unread_count'})
message_thread = MessageViewSet.as_view({'get': 'thread'})

app_name = 'books'

urlpatterns = [
    path('messages/', message_view),
    path('messages/inbox/', message_inbox),
    path('messages/sent/', message_sent),
    path('messages/unread_count/', message_unread),
    path('messages/thread/<str:book_id>/', message_thread),
    path('', include(router.urls)),
]
