from rest_framework import serializers
from .models import Book, Category, Message


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model."""
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'created_at']
        read_only_fields = ['created_at']


class BookSerializer(serializers.ModelSerializer):
    """Serializer for Book model."""
    discount_percentage = serializers.SerializerMethodField()
    seller_username = serializers.CharField(source='seller.username', read_only=True)

    class Meta:
        model = Book
        fields = [
            'id',
            'seller_username',
            'title',
            'author',
            'isbn',
            'description',
            'original_price',
            'selling_price',
            'discount_percentage',
            'condition',
            'category',
            'image',
            'quantity',
            'is_available',
            'is_approved',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'seller_username', 'created_at', 'updated_at', 'discount_percentage', 'is_available', 'is_approved']

    def get_discount_percentage(self, obj):
        """Get discount percentage."""
        return obj.get_discount_percentage()


class MessageSerializer(serializers.ModelSerializer):
    """Serializer for Message model."""
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    recipient_username = serializers.CharField(source='recipient.username', read_only=True)
    book_title = serializers.CharField(source='book.title', read_only=True)

    class Meta:
        model = Message
        fields = [
            'id',
            'book',
            'book_title',
            'sender',
            'sender_username',
            'recipient',
            'recipient_username',
            'content',
            'is_read',
            'created_at',
        ]
        read_only_fields = ['id', 'sender', 'sender_username', 'recipient_username',
                            'book_title', 'created_at', 'is_read']
