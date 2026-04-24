# Admin Dashboard Setup Guide

## Quick Start - Create Admin User

After setting up the backend server, run this command to create an admin user:

```bash
cd backend
python manage.py create_admin
```

This creates a superuser using credentials supplied via environment variables. Set these **before** running the command:

- `DJANGO_SUPERUSER_USERNAME` — admin username
- `DJANGO_SUPERUSER_EMAIL` — admin email
- `DJANGO_SUPERUSER_PASSWORD` — admin password (use a strong value; 12+ chars, mixed case, numbers, symbols)

On Windows PowerShell:
```powershell
$env:DJANGO_SUPERUSER_USERNAME="your-username"
$env:DJANGO_SUPERUSER_EMAIL="you@example.com"
$env:DJANGO_SUPERUSER_PASSWORD="<strong-password>"
python manage.py create_admin
```

In production (e.g. Render), configure these in your hosting provider's environment settings.

## Admin Features

### 1. Django Admin Panel
**URL:** http://localhost:8000/admin

Full-featured Django admin with:
- User management (verify, deactivate/activate accounts)
- Book inventory management
- Category management
- Advanced filtering and search
- Bulk actions

### 2. Custom React Admin Dashboard
**URL:** http://localhost:3000/admin (when logged in as admin)

Modern admin dashboard with:
- Real-time statistics (users, books, categories)
- Inventory summary and analytics
- User management with quick actions
- Book management with availability toggle
- Recent activity feeds

## Admin Routes

### Admin Dashboard
- **URL:** `/admin`
- **Features:** Statistics, Quick Links, Inventory Overview

### Manage Users
- **URL:** `/admin/users`
- **Actions:**
  - Verify users
  - Activate/Deactivate accounts
  - View user details
  - Pagination support

### Manage Books
- **URL:** `/admin/books`
- **Actions:**
  - Toggle availability
  - Delete books
  - View book details
  - Filter by condition/category
  - Pagination support

## API Admin Endpoints

All admin endpoints require:
- Authentication token
- Admin/Staff status

### Dashboard Stats
```
GET /api/admin/dashboard/stats/
Response: {
  "total_users": 10,
  "verified_users": 8,
  "unverified_users": 2,
  "total_books": 25,
  "available_books": 22,
  "unavailable_books": 3,
  "total_categories": 5
}
```

### Recent Users
```
GET /api/admin/dashboard/recent_users/?limit=10
```

### Recent Books
```
GET /api/admin/dashboard/recent_books/?limit=10
```

### Inventory Summary
```
GET /api/admin/dashboard/inventory_summary/
Response: {
  "total_quantity_available": 50,
  "average_book_price": 15.99,
  "total_value": 799.50
}
```

### User Management
```
# List all users
GET /api/admin/users/list_users/?page=1&page_size=20

# Verify user
POST /api/admin/users/verify_user/
Body: { "user_id": "uuid" }

# Deactivate user
POST /api/admin/users/deactivate_user/
Body: { "user_id": "uuid" }

# Activate user
POST /api/admin/users/activate_user/
Body: { "user_id": "uuid" }
```

### Book Management
```
# List all books
GET /api/admin/books/list_books/?page=1&page_size=20

# Delete book
POST /api/admin/books/delete_book/
Body: { "book_id": "uuid" }

# Toggle availability
POST /api/admin/books/toggle_availability/
Body: { "book_id": "uuid" }
```

## Initial Setup Commands

### 1. Create Admin User
```bash
python manage.py create_admin
```

### 2. Create Categories
```bash
python manage.py seed_categories
```

This creates default book categories:
- Fiction
- Non-Fiction
- Science Fiction
- Mystery
- Romance
- Thriller
- Biography
- History
- Self-Help
- Business
- Technology
- Education
- Children
- Young Adult
- Poetry

## Admin Permissions

Admin users have:
- ✓ Full user management (verify, activate, deactivate)
- ✓ Full book management (create, read, update, delete)
- ✓ View all statistics and analytics
- ✓ Manage inventory
- ✓ Access to Django admin panel

## Best Practices

1. **Security:**
   - Never commit passwords or secrets to the repo
   - Use strong, unique passwords (12+ chars, mixed case, numbers, symbols)
   - Enable HTTPS in production
   - Limit admin access by IP in production

2. **Maintenance:**
   - Regular backups of database
   - Monitor user growth and activity
   - Archive old books periodically
   - Keep system dependencies updated

3. **Operations:**
   - Review new user registrations regularly
   - Monitor book inventory levels
   - Update categories as needed
   - Check for inactive users

## Troubleshooting

### "Admin user already exists"
The admin user is already created. To reset:
1. Delete the user from Django admin
2. Run `python manage.py create_admin` again

### Can't access admin panel
- Verify backend server is running: `python manage.py runserver`
- Check you're logged in with an admin account
- Verify user has `is_staff=True` in database

### Admin routes not showing in frontend
- Make sure you're logged in with an admin user
- Check user's `is_staff` or `is_superuser` status
- Clear browser cache and refresh

## Support

For issues, check:
1. Backend logs: `python manage.py runserver`
2. Browser console (F12 → Console)
3. Network tab (F12 → Network)
4. Check API response status codes
