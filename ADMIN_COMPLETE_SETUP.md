# Complete Discount Books Setup & Admin Configuration

## Step-by-Step Setup Guide

### 1️⃣ Backend Initial Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment
copy .env.example .env
# Edit .env with your PostgreSQL credentials if needed

# Run migrations
python manage.py migrate

# Create admin user (automatic)
python manage.py create_admin
# Creates: admin/admin123 with admin@discountbooks.com

# Optional: Create book categories
python manage.py seed_categories

# Start server
python manage.py runserver
```

**Backend running at:** http://localhost:8000

### 2️⃣ Frontend Setup

```bash
# New terminal window
cd frontend

# Install dependencies
npm install

# Copy environment
copy .env.example .env.local

# Start development server
npm start
```

**Frontend running at:** http://localhost:3000

---

## 🧪 Testing the Admin System

### Step 1: Login with Admin Credentials
1. Go to http://localhost:3000
2. Click "Sign In" 
3. Use credentials:
   - **Email:** admin@discountbooks.com
   - **Password:** admin123

### Step 2: Access React Admin Dashboard
- After login, you should see "⚙️ Admin" dropdown in navbar
- Navigate to `/admin/` or use the dropdown menu
- Three sections available:
  - **Dashboard** - Statistics and metrics
  - **Users** - User management
  - **Books** - Book inventory management

### Step 3: Django Admin Panel
- Visit http://localhost:8000/admin/
- Login with same credentials
- Full Django admin interface for developers

---

## 📊 Admin Dashboard Features

### Dashboard (`/admin`)
Shows real-time statistics:
- Total users & verified count
- Total books & availability status
- Book categories count
- Inventory value & average price

Quick links to:
- Manage Users
- Manage Books
- Manage Categories
- Django Admin

### User Management (`/admin/users`)
View and manage all users:
- **Columns:** Username, Email, Name, Status, Verification, Join Date
- **Actions:**
  - ✓ Verify unverified users
  - ✗ Deactivate active users
  - ✓ Reactivate inactive users

### Books Management (`/admin/books`)
Control book inventory:
- **Columns:** Title, Author, Price, Condition, Quantity, Status
- **Actions:**
  - ⊘ Hide/Show books
  - 🗑️ Delete books
- **Filters:** Pagination support (20 items/page)

---

## 🔐 Securing Your Admin Account

### Change Admin Password Immediately

**Option 1: Via Django Admin**
```
1. Go to http://localhost:8000/admin/
2. Click "Users" → "admin"
3. Click "Change password" link
4. Enter new password (twice)
5. Save
```

**Option 2: Via Terminal**
```bash
python manage.py changepassword admin
```

### Best Practices
- ✓ Use strong passwords (12+ chars, mix of uppercase/numbers/symbols)
- ✓ Enable HTTPS in production
- ✓ Limit admin access by IP
- ✓ Use environment variables for sensitive data
- ✓ Regular security audits

---

## 🛠️ Initial Data Setup

### Seed Categories
```bash
python manage.py seed_categories
```
Creates 15 default book categories:
- Fiction, Non-Fiction, Science Fiction
- Mystery, Romance, Thriller
- Biography, History, Self-Help, Business
- Technology, Education, Children
- Young Adult, Poetry

### Add Test Books (Manual)
1. Login as admin (user or admin)
2. Go to `/listings`
3. Click "Add New Book"
4. Fill form and submit
5. Appears in dashboard for other users

---

## 📡 API Endpoints Reference

### Admin Dashboard API

**Get Statistics:**
```
GET /api/admin/dashboard/stats/
Headers: Authorization: Bearer <token>
```

**Get Recent Users:**
```
GET /api/admin/dashboard/recent_users/?limit=10
```

**Get Recent Books:**
```
GET /api/admin/dashboard/recent_books/?limit=10
```

**Get Inventory Summary:**
```
GET /api/admin/dashboard/inventory_summary/
```

### Admin User Management

**List Users:**
```
GET /api/admin/users/list_users/?page=1&page_size=20
```

**Verify User:**
```
POST /api/admin/users/verify_user/
Body: {"user_id": "uuid"}
```

**Deactivate User:**
```
POST /api/admin/users/deactivate_user/
Body: {"user_id": "uuid"}
```

**Activate User:**
```
POST /api/admin/users/activate_user/
Body: {"user_id": "uuid"}
```

### Admin Book Management

**List All Books:**
```
GET /api/admin/books/list_books/?page=1&page_size=20
```

**Toggle Availability:**
```
POST /api/admin/books/toggle_availability/
Body: {"book_id": "uuid"}
```

**Delete Book:**
```
POST /api/admin/books/delete_book/
Body: {"book_id": "uuid"}
```

---

## ⚠️ Troubleshooting

### Issue: "Admin user already exists"
**Solution:** Admin was already created
```bash
# To reset: Delete from Django admin first, then:
python manage.py create_admin
```

### Issue: Can't see Admin menu in navbar
**Cause:** Not logged in as admin user
**Solution:** 
1. Check user has `is_staff=True` in database
2. Clear browser cache
3. Refresh page

### Issue: Backend won't start
```bash
# Check port not in use
netstat -ano | findstr :8000  # Windows

# Use different port
python manage.py runserver 8001
```

### Issue: "Migrations not applied"
```bash
# Create fresh migrations
python manage.py makemigrations
python manage.py migrate
```

### Issue: Database connection error
1. Verify PostgreSQL is running
2. Check `.env` credentials
3. Or use SQLite (change DB_ENGINE to `django.db.backends.sqlite3`)

---

## 📋 Useful Management Commands

```bash
# Create admin user
python manage.py create_admin

# Seed categories
python manage.py seed_categories

# Change password
python manage.py changepassword admin

# Run migrations
python manage.py migrate

# Create migrations
python manage.py makemigrations

# Database shell
python manage.py shell

# Run tests
python manage.py test

# Clear cache
python manage.py clear_cache

# Backup database
pg_dump discount_books > backup.sql
```

---

## 🚀 Production Deployment

Before deploying to production:

1. **Security:**
   - [ ] Change DEBUG=False in settings
   - [ ] Update SECRET_KEY in .env
   - [ ] Set ALLOWED_HOSTS properly
   - [ ] Enable HTTPS/SSL
   - [ ] Use strong database password

2. **Performance:**
   - [ ] Collect static files: `python manage.py collectstatic`
   - [ ] Use WhiteNoise or CDN for static files
   - [ ] Enable CORS properly (limit origins)
   - [ ] Set up caching layer (Redis)

3. **Database:**
   - [ ] Regular backups scheduled
   - [ ] Use separate read replicas
   - [ ] Monitor query performance
   - [ ] Use connection pooling

4. **Monitoring:**
   - [ ] Set up error tracking (Sentry)
   - [ ] Monitor API response times
   - [ ] Log important events
   - [ ] Set up alerts

---

## 📚 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## ✅ Setup Checklist

- [ ] Backend running on localhost:8000
- [ ] Frontend running on localhost:3000
- [ ] Admin user created (admin/admin123)
- [ ] PostgreSQL connected (or using test database)
- [ ] Categories seeded
- [ ] Can login with admin credentials
- [ ] Admin dashboard visible
- [ ] Can manage users and books
- [ ] Custom admin password set

**Once all checked, you're ready to use the admin system! 🎉**
