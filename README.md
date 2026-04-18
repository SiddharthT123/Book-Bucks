# Discount Books - E-Commerce Platform

A full-stack web application for buying and selling discounted books.

## Features

- User authentication and registration
- Browse and search discounted books
- List books for sale
- Buy and sell transactions
- User profile management
- Real-time inventory management

## Project Structure

```
discount-books/
├── frontend/          # React.js frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── backend/           # Django REST API
│   ├── discount_books/     # Django project settings
│   ├── books/              # Books app
│   ├── users/              # Users app
│   ├── manage.py
│   └── requirements.txt
├── docker-compose.yml # PostgreSQL database setup
└── README.md
```

## Tech Stack

- **Frontend**: React.js, Axios, React Router
- **Backend**: Python Django, Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

## Prerequisites

- Node.js 14+ and npm
- Python 3.8+
- PostgreSQL 12+
- Docker and Docker Compose (optional)

## Installation and Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Copy the environment file and update it:
   ```bash
   copy .env.example .env
   ```

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

7. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   copy .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### Database Setup (Using Docker)

1. Make sure Docker and Docker Compose are installed
2. Run:
   ```bash
   docker-compose up -d
   ```

This will start a PostgreSQL container on port 5432.

## API Documentation

Base URL: `http://localhost:8000/api`

### Authentication Endpoints
- `POST /auth/register/` - Register a new user
- `POST /auth/login/` - Login user
- `POST /auth/logout/` - Logout user

### Books Endpoints
- `GET /books/` - List all books
- `POST /books/` - Create a new book listing
- `GET /books/{id}/` - Get book details
- `PUT /books/{id}/` - Update book listing
- `DELETE /books/{id}/` - Delete book listing

### User Endpoints
- `GET /users/profile/` - Get user profile
- `PUT /users/profile/` - Update user profile
- `GET /users/listings/` - Get user's book listings
- `GET /users/purchases/` - Get user's purchases

## Development

### Running Both Frontend and Backend

Terminal 1 (Backend):
```bash
cd backend
python manage.py runserver
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

### Testing

Backend:
```bash
cd backend
python manage.py test
```

Frontend:
```bash
cd frontend
npm test
```

## License

MIT License - See LICENSE file for details

## Support

For issues and questions, please create an issue in the repository.
