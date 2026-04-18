from django.contrib import admin
from .models import Book, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'selling_price', 'condition', 'is_available', 'created_at']
    list_filter = ['is_available', 'condition', 'created_at']
    search_fields = ['title', 'author', 'isbn']
    fieldsets = (
        ('Book Info', {'fields': ('title', 'author', 'isbn', 'description')}),
        ('Pricing', {'fields': ('original_price', 'selling_price')}),
        ('Condition & Others', {'fields': ('condition', 'category', 'quantity')}),
        ('Image', {'fields': ('image',)}),
        ('Status', {'fields': ('is_available',)}),
        ('Timestamps', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )
    readonly_fields = ['created_at', 'updated_at']
