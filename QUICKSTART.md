# Discount Books - Setup Guide

## Quick Start

### Prerequisites
- Node.js 14+ and npm
- Python 3.8+
- PostgreSQL 12+
- Git

### Backend Setup (5-10 minutes)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate Python virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup environment variables:**
   ```bash
   copy .env.example .env
   # Edit .env with your database credentials
   ```

5. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser (admin account):**
   ```bash
   python manage.py createsuperuser
   # Follow prompts to create admin account
   ```

7. **Start Django development server:**
   ```bash
   python manage.py runserver
   ```
   Server will run on: **http://localhost:8000**

### Frontend Setup (5-10 minutes)

1. **Navigate to frontend directory (new terminal):**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   ```bash
   copy .env.example .env.local
   # Update if backend is on different port
   ```

4. **Start React development server:**
   ```bash
   npm start
   ```
   App will open at: **http://localhost:3000**

### Database Setup (Using Docker)

**Optional: Use Docker instead of local PostgreSQL**

1. **Make sure Docker is installed**

2. **Start PostgreSQL container:**
   ```bash
   docker-compose up -d
   ```

3. **Verify database connection in backend .env** and run migrations

## Testing the Application

### 1. Register a New User
- Go to http://localhost:3000/register
- Fill in the registration form
- Click "Sign Up"

### 2. Login
- Go to http://localhost:3000/login
- Use your registered email and password
- Click "Sign In"

### 3. Explore Features
- **Dashboard**: Browse available books
- **My Listings**: Add new books for sale
- **Profile**: View and edit your profile

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout user
- `GET /api/auth/me/` - Get current user (requires auth)
- `PUT /api/auth/profile/update/` - Update profile (requires auth)
- `POST /api/auth/change-password/` - Change password (requires auth)

### Books
- `GET /api/books/` - List all books
- `GET /api/books/search/` - Search books with filters
- `GET /api/books/best_deals/` - Get best deals
- `POST /api/books/` - Create book listing (requires auth)
- `PUT /api/books/{id}/` - Update book (requires auth)
- `DELETE /api/books/{id}/` - Delete book (requires auth)

### Admin Panel
- Access at: **http://localhost:8000/admin**
- Login with superuser credentials created earlier

## Development

### Useful Commands

**Backend:**
```bash
# Run migrations
python manage.py migrate

# Create migrations
python manage.py makemigrations

# Run tests
python manage.py test

# Shell
python manage.py shell
```

**Frontend:**
```bash
# Install new package
npm install package-name

# Run tests
npm test

# Build for production
npm run build
```

## Troubleshooting

### Backend Issues
- **Port 8000 already in use:** `python manage.py runserver 8001`
- **Database connection error:** Check .env file and PostgreSQL service
- **Migrations failed:** Delete migrations folder (except __init__.py) and recreate

### Frontend Issues
- **Port 3000 already in use:** `PORT=3001 npm start`
- **API not connecting:** Check REACT_APP_API_URL in .env.local
- **Module not found:** Delete node_modules and reinstall: `npm install`

## Next Steps

1. Implement transaction system (buying/selling)
2. Add payment integration
3. Add email notifications
4. Add user reviews and ratings
5. Improve search with Elasticsearch
6. Add real-time notifications with WebSockets
7. Deploy to production server

## Documentation

- Django REST Framework: https://www.django-rest-framework.org/
- React: https://react.dev/
- PostgreSQL: https://www.postgresql.org/docs/
