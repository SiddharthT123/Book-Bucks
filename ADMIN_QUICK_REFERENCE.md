# 🚀 Quick Reference - Admin System

## ⚡ 30-Second Setup

```bash
# Terminal 1: Backend
cd backend
python -m venv venv && venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate

# Set superuser credentials (choose strong values)
set DJANGO_SUPERUSER_USERNAME=your-admin-username
set DJANGO_SUPERUSER_EMAIL=you@example.com
set DJANGO_SUPERUSER_PASSWORD=<strong-password>
python manage.py create_admin

python manage.py runserver

# Terminal 2: Frontend  
cd frontend
npm install
npm start
```

Then:
1. Go to **http://localhost:3000**
2. Login with the credentials you set in `DJANGO_SUPERUSER_EMAIL` / `DJANGO_SUPERUSER_PASSWORD`
3. See "⚙️ Admin" in navbar
4. Access admin features

---

## 📍 Admin URLs

| Page | URL | Purpose |
|------|-----|---------|
| Admin Dashboard | `/admin` | View stats & quick links |
| Manage Users | `/admin/users` | User management |
| Manage Books | `/admin/books` | Inventory control |
| Django Admin | `http://localhost:8000/admin/` | Full admin interface |

---

## 🎯 Key Admin Actions

### User Management
```
✓ Verify users (remove verification hold)
✗ Deactivate users (disable accounts)
✓ Reactivate users (enable accounts)
📊 View user statistics
```

### Book Management
```
⊘ Hide/Show books (toggle availability)
🗑️ Delete books (remove from system)
🔍 View all books (with pagination)
📊 View inventory metrics
📈 Track book conditions & pricing
```

### Dashboard Stats
```
👥 Total users & verified count
📚 Total books & available count
🏷️ Category count
💰 Inventory value & pricing
```

---

## 🔧 Backend Commands

```bash
# Create admin user (runs once)
python manage.py create_admin

# Create seed categories
python manage.py seed_categories

# Change admin password
python manage.py changepassword admin

# Create Django superuser (alternative)
python manage.py createsuperuser

# Run server on different port
python manage.py runserver 8001

# Database operations
python manage.py migrate
python manage.py makemigrations
python manage.py shell

# Clear Django cache
python manage.py clear_cache
```

---

## 🔐 Admin Credentials

Admin credentials are **not stored in this repo**. They are read from environment variables at the time `create_admin` is run:

| Env Variable | Purpose |
|--------------|---------|
| `DJANGO_SUPERUSER_USERNAME` | Admin username |
| `DJANGO_SUPERUSER_EMAIL` | Admin email |
| `DJANGO_SUPERUSER_PASSWORD` | Admin password (use a strong value; 12+ chars, mixed case, numbers, symbols) |

In production, set these in your hosting provider's environment (e.g. Render → Environment). Locally, use a `.env` file (already gitignored) or shell `set` / `export`.

---

## 📊 Admin Dashboard at a Glance

```
┌─────────────────────────────────────┐
│  Discount Books Admin Dashboard     │
├─────────────────────────────────────┤
│  [👥 Users]  [📚 Books]  [💰 Value] │
│  10 total    25 books   $799.50     │
├─────────────────────────────────────┤
│  [👥 Manage Users]                  │
│  [📚 Manage Books]                  │
│  [🏷️ Manage Categories]             │
│  [⚙️ Django Admin]                  │
└─────────────────────────────────────┘
```

---

## 🗂️ Project Structure

```
Discount_books/
├── frontend/
│   └── src/
│       ├── pages/admin/
│       │   ├── AdminDashboard.js
│       │   ├── AdminUsers.js
│       │   └── AdminBooks.js
│       ├── services/adminService.js
│       └── styles/Admin*.css
├── backend/
│   ├── discount_books/
│   │   ├── admin.py (Django admin config)
│   │   ├── admin_views.py (API views)
│   │   ├── admin_urls.py (API routes)
│   │   └── management/commands/
│   │       ├── create_admin.py
│   │       └── seed_categories.py
│   ├── users/
│   ├── books/
│   └── manage.py
├── ADMIN_SETUP.md
├── ADMIN_COMPLETE_SETUP.md
└── README.md
```

---

## 🚨 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Admin already exists" | Already created, use as-is |
| Port 8000 in use | `python manage.py runserver 8001` |
| Can't see admin menu | Login with admin account first |
| migrations error | `python manage.py migrate` |
| Database error | Check .env credentials |
| Frontend API error | Verify backend running |

---

## 🔐 Security Reminders

1. ✓ **Change admin password immediately** after first login
2. ✓ Use HTTPS in production
3. ✓ Don't share credentials in code
4. ✓ Use strong passwords (12+ chars)
5. ✓ Enable 2FA if available
6. ✓ Regular backups
7. ✓ Monitor admin access logs

---

## 📈 What's Included

- ✅ Django Admin Panel (full CRUD operations)
- ✅ Custom React Admin Dashboard
- ✅ Real-time Statistics
- ✅ User Management API
- ✅ Book Inventory Management
- ✅ Category Management
- ✅ Admin Permission Checks
- ✅ Pagination & Filtering
- ✅ Responsive UI
- ✅ Error Handling

---

## 🎓 Learning Path

1. **Get Familiar:**
   - Explore Django Admin at `/admin/`
   - Try React Admin at `/admin/`

2. **Common Tasks:**
   - Verify a new user registration
   - Hide/show books from marketplace
   - View sales statistics

3. **Advanced:**
   - Add custom admin actions
   - Extend admin dashboard
   - Integrate analytics

---

## 📞 Quick Help

**Backend issue?**
```bash
# Check logs while running
python manage.py runserver  # Shows all requests and errors
```

**Frontend issue?**
```
1. Open browser console: F12
2. Check Network tab for API errors
3. Look for 401/403 auth errors
```

**Database issue?**
```bash
# Reset test database (requires DJANGO_SUPERUSER_* env vars to be set)
rm db.sqlite3
python manage.py migrate
python manage.py create_admin
```

---

**Last Updated:** April 11, 2026  
**Version:** 1.0 Complete Admin System
