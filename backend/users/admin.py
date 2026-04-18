from django.contrib import admin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_verified', 'created_at']
    list_filter = ['is_verified', 'created_at']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    fieldsets = (
        ('Credentials', {'fields': ('username', 'email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'phone_number', 'bio')}),
        ('Address', {'fields': ('address', 'city', 'state', 'postal_code', 'country')}),
        ('Profile', {'fields': ('profile_picture',)}),
        ('Status', {'fields': ('is_verified', 'is_active', 'is_staff', 'is_superuser')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )
    readonly_fields = ['created_at', 'updated_at']
