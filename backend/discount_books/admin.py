from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib import admin
from users.models import CustomUser
from books.models import Book, Category


@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    """Custom admin for User model."""
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_verified', 'is_active', 'created_at']
    list_filter = ['is_verified', 'is_active', 'is_staff', 'created_at']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Credentials', {
            'fields': ('username', 'email', 'password')
        }),
        ('Personal Information', {
            'fields': ('first_name', 'last_name', 'phone_number', 'bio')
        }),
        ('Address', {
            'fields': ('address', 'city', 'state', 'postal_code', 'country')
        }),
        ('Profile', {
            'fields': ('profile_picture',)
        }),
        ('Status', {
            'fields': ('is_verified', 'is_active', 'is_staff', 'is_superuser')
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
        ('Permissions', {
            'fields': ('groups', 'user_permissions'),
            'classes': ('collapse',)
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
        ('Personal info', {
            'classes': ('wide',),
            'fields': ('first_name', 'last_name'),
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at', 'last_login', 'date_joined']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin for Book Category."""
    list_display = ['name', 'created_at']
    search_fields = ['name']
    ordering = ['name']


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    """Admin for Book model."""
    list_display = ['title', 'author', 'selling_price', 'condition', 'quantity', 'is_available', 'created_at']
    list_filter = ['is_available', 'condition', 'created_at', 'category']
    search_fields = ['title', 'author', 'isbn', 'description']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Book Information', {
            'fields': ('title', 'author', 'isbn', 'description')
        }),
        ('Pricing', {
            'fields': ('original_price', 'selling_price')
        }),
        ('Details', {
            'fields': ('condition', 'category', 'quantity')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Availability', {
            'fields': ('is_available',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    list_editable = ['is_available', 'quantity']
    date_hierarchy = 'created_at'
    actions = ['mark_available', 'mark_unavailable']
    
    def mark_available(self, request, queryset):
        """Action to mark books as available."""
        updated = queryset.update(is_available=True)
        self.message_user(request, f'{updated} book(s) marked as available.')
    mark_available.short_description = 'Mark selected books as available'
    
    def mark_unavailable(self, request, queryset):
        """Action to mark books as unavailable."""
        updated = queryset.update(is_available=False)
        self.message_user(request, f'{updated} book(s) marked as unavailable.')
    mark_unavailable.short_description = 'Mark selected books as unavailable'


# Customize admin site
admin.site.site_header = 'Discount Books Admin'
admin.site.site_title = 'Admin'
admin.site.index_title = 'Welcome to Discount Books Administration'
