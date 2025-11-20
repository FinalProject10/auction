# Production Deployment Guide

## Quick Start

### 1. Database Setup
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE final CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;"

# Run schema
mysql -u root -p final < back/shema.sql

# Run migrations
mysql -u root -p final < back/migrations/add_auction_tables.sql
```

### 2. Backend Setup
```bash
cd back
npm install --production
cp .env.production.example .env.production
# Edit .env.production with your values
npm start
```

### 3. Frontend Setup
```bash
cd front
npm install
npm run build
npm start
```

## Detailed Deployment

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- PM2 (for process management)
- Nginx (for reverse proxy)

### Step 1: Environment Configuration

**Backend (.env.production)**:
```env
NODE_ENV=production
PORT=3001
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=final
JWT_SECRET=your_very_secure_secret_min_32_chars
CORS_ORIGINS=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
STRIPE_SECRET_KEY=sk_live_...
```

**Frontend (update utils/api.ts)**:
```typescript
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.yourdomain.com";
```

### Step 2: Database Migration

```bash
# Backup existing database
mysqldump -u user -p database > backup_$(date +%Y%m%d).sql

# Run migrations
mysql -u user -p database < back/migrations/add_auction_tables.sql

# Verify tables
mysql -u user -p database -e "SHOW TABLES;"
```

### Step 3: Backend Deployment

```bash
cd back
npm install --production
pm2 start index.js --name autobid-backend
pm2 save
pm2 startup  # Follow instructions to enable startup script
```

### Step 4: Frontend Deployment

**Option A: Vercel/Netlify (Recommended)**
1. Connect your repository
2. Set environment variables
3. Deploy

**Option B: Self-hosted**
```bash
cd front
npm install
npm run build
pm2 start npm --name autobid-frontend -- start
```

### Step 5: Nginx Configuration

```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 6: SSL/HTTPS Setup

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

## Verification

### Test Endpoints
```bash
# Health check
curl https://api.yourdomain.com/health

# Test deposit endpoint
curl -X POST https://api.yourdomain.com/deposit/add \
  -H "Content-Type: application/json" \
  -d '{"clientId":1,"amount":100}'
```

### Monitor Logs
```bash
# PM2 logs
pm2 logs autobid-backend

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running: `sudo systemctl status mysql`
- Check credentials in .env.production
- Test connection: `mysql -u user -p -h host database`

### Port Already in Use
```bash
# Find process using port
lsof -i :3001
# Kill process
kill -9 <PID>
```

### PM2 Issues
```bash
# Restart app
pm2 restart autobid-backend

# View logs
pm2 logs autobid-backend

# Monitor
pm2 monit
```

## Rollback Procedure

1. **Stop current version**:
   ```bash
   pm2 stop autobid-backend
   ```

2. **Restore previous code**:
   ```bash
   git checkout <previous-version-tag>
   npm install --production
   ```

3. **Restore database** (if needed):
   ```bash
   mysql -u user -p database < backup.sql
   ```

4. **Restart**:
   ```bash
   pm2 restart autobid-backend
   ```

## Maintenance

### Daily
- Check error logs
- Monitor payment processing
- Verify backups

### Weekly
- Review performance metrics
- Test critical workflows
- Update dependencies (if needed)

### Monthly
- Security updates
- Database optimization
- Backup verification

