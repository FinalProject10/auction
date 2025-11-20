# Environment Variables Setup Guide

This guide explains how to set up environment variables for both the backend and frontend of the AutoBid auction platform.

## Backend Setup

### 1. Create Backend Environment File

Copy the example file and create your `.env` file:

```bash
cd back
cp .env.example .env
```

### 2. Configure Backend Variables

Edit `back/.env` with your actual values:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=final
DB_DIALECT=mysql

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# CORS Configuration (comma-separated origins)
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# JWT Secret (if using JWT authentication)
JWT_SECRET=your_jwt_secret_key_here

# Socket.IO Configuration
SOCKET_CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Frontend URL (for redirects)
FRONTEND_URL=http://localhost:3000
```

### 3. Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 5001 | No |
| `NODE_ENV` | Environment (development/production) | development | No |
| `DB_HOST` | Database host | localhost | No |
| `DB_PORT` | Database port | 3306 | No |
| `DB_USER` | Database username | root | No |
| `DB_PASSWORD` | Database password | 0000 | No |
| `DB_NAME` | Database name | final | No |
| `DB_DIALECT` | Database dialect | mysql | No |
| `STRIPE_SECRET_KEY` | Stripe secret key | - | Yes (for payments) |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated) | localhost:3000,3001 | No |
| `JWT_SECRET` | JWT secret for authentication | - | Yes (for auth) |
| `SOCKET_CORS_ORIGINS` | Socket.IO CORS origins | - | No |
| `FRONTEND_URL` | Frontend URL for redirects | http://localhost:3000 | No |

## Frontend Setup

### 1. Create Frontend Environment File

Copy the example file and create your `.env.local` file:

```bash
cd front
cp .env.example .env.local
```

### 2. Configure Frontend Variables

Edit `front/.env.local` with your actual values:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_SOCKET_URL=http://localhost:5001

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Testing Mode (set to 'true' to skip payment processing)
# When enabled, deposits and payments will be processed without actual payment gateway integration
NEXT_PUBLIC_TESTING_MODE=false

# Stripe Public Key (if using Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Firebase Configuration (if using Firebase)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
```

### 3. Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | http://localhost:5001 | Yes |
| `NEXT_PUBLIC_SOCKET_URL` | Socket.IO server URL | http://localhost:5001 | Yes |
| `NEXT_PUBLIC_SITE_URL` | Frontend site URL | http://localhost:3000 | No |
| `NEXT_PUBLIC_TESTING_MODE` | Enable testing mode (skip payments) | false | No |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | - | No |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase configuration | - | No |

**Note:** In Next.js, only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Production Setup

### Backend Production Variables

```env
NODE_ENV=production
PORT=5001
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_secure_password
DB_NAME=your_production_db_name
CORS_ORIGINS=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
STRIPE_SECRET_KEY=sk_live_your_live_stripe_key
JWT_SECRET=your_very_secure_jwt_secret
```

### Frontend Production Variables

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_SOCKET_URL=https://api.yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_key
```

## Security Best Practices

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Use different keys for development and production**
3. **Rotate secrets regularly** in production
4. **Use strong passwords** for database and JWT secrets
5. **Limit CORS origins** in production to your actual domains
6. **Use environment-specific files** (`.env.development`, `.env.production`)

## Usage in Code

### Backend

```javascript
// Access environment variables
const port = process.env.PORT || 5001;
const dbHost = process.env.DB_HOST || 'localhost';
```

### Frontend

```javascript
// Use the API utility
import { API_URL } from '../utils/api';

// Or directly access
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Troubleshooting

### Backend Issues

- **Database connection fails**: Check `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`
- **Port already in use**: Change `PORT` in `.env` or stop the process using port 5001
- **CORS errors**: Add your frontend URL to `CORS_ORIGINS`

### Frontend Issues

- **API calls fail**: Verify `NEXT_PUBLIC_API_URL` matches your backend URL
- **Socket connection fails**: Check `NEXT_PUBLIC_SOCKET_URL`
- **Environment variables not working**: Restart Next.js dev server after changing `.env.local`

## Quick Start

1. **Backend:**
   ```bash
   cd back
   cp .env.example .env
   # Edit .env with your values
   npm install
   npm run server-dev
   ```

2. **Frontend:**
   ```bash
   cd front
   cp .env.example .env.local
   # Edit .env.local with your values
   npm install
   npm run dev
   ```

## Files Created

- `back/.env.example` - Backend environment template
- `back/.env` - Backend environment (gitignored)
- `front/.env.example` - Frontend environment template
- `front/.env.local` - Frontend environment (gitignored)
- `front/utils/api.ts` - API configuration utility

