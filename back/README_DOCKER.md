# Backend Docker Setup

## Prerequisites
- Docker and Docker Compose installed
- `.env` file configured in the `back/` directory

## Quick Start

1. **Navigate to backend directory:**
   ```bash
   cd back
   ```

2. **Create `.env` file** (if not exists) with required variables:
   ```env
   PORT=5001
   DB_HOST=mysql
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=final
   DB_DIALECT=mysql
   STRIPE_SECRET_KEY=your_stripe_key
   CORS_ORIGINS=http://localhost:3000
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start services:**
   ```bash
   docker-compose up -d
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f
   ```

5. **Stop services:**
   ```bash
   docker-compose down
   ```

## Services

- **backend**: Express.js API server (port 5001)
- **mysql**: MySQL database (port 3306)

## Volumes

- `mysql-data`: Persistent MySQL data storage

## Network

- `auction-network`: Isolated network for backend services

