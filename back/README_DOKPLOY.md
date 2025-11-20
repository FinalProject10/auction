# Dokploy Deployment Guide

This guide covers deploying the Auction Backend to **Dokploy** - a powerful self-hosted PaaS with native Docker Compose support.

## 🎯 Why Dokploy?

- ✅ **Native Docker Compose Support** - Perfect for your multi-service setup
- ✅ **Free & Open Source** - No vendor lock-in
- ✅ **MySQL Included** - Built-in database management
- ✅ **Real-time Monitoring** - Monitor your services
- ✅ **Easy Deployment** - Simple UI for managing deployments
- ✅ **Automatic Backups** - Database backup support

Learn more at: [dokploy.com](https://dokploy.com/)

---

## 🚀 Quick Setup (5 Minutes)

### 1. Install Dokploy

On your server, run:

```bash
curl -sSL https://dokploy.com/install.sh | sh
```

Or follow the installation guide: [Dokploy Installation Docs](https://dokploy.com/docs)

### 2. Access Dokploy UI

1. Open Dokploy in your browser (usually `http://your-server-ip:3000`)
2. Complete the initial setup
3. Create an admin account

### 3. Connect GitHub Repository

1. In Dokploy UI, go to **"Applications"**
2. Click **"New Application"**
3. Select **"From Git Repository"**
4. Connect your GitHub account
5. Select repository: `salmenkhelifi1/auction_backend`

### 4. Configure Deployment

#### Option A: Docker Compose (Recommended)

1. **Deployment Method:** Select **"Docker Compose"**
2. **Docker Compose File:** Leave default (`docker-compose.yml`)
3. **Root Directory:** Leave empty (root of repository)

#### Option B: Dockerfile

1. **Deployment Method:** Select **"Dockerfile"**
2. **Dockerfile Path:** `Dockerfile`
3. **Build Context:** `.` (root)

### 5. Configure Environment Variables

In Dokploy UI, add all required environment variables:

```env
# Database (Dokploy will create MySQL service automatically)
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_secure_password
DB_NAME=final
DB_DIALECT=mysql

# Server
PORT=3001
NODE_ENV=production

# Required
JWT_SECRET=your-very-secret-jwt-key-change-this
CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
FRONTEND_URL=https://your-frontend.vercel.app
STRIPE_SECRET_KEY=sk_your_stripe_key

# Optional - Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional - Firebase
FIREBASE_SERVICE_ACCOUNT_PATH=./auction-adca9-77aeb27bd088.json
SOCKET_CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
```

### 6. Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Your backend will be live! 🎉

---

## 🐳 Docker Compose Deployment

Dokploy has **native Docker Compose support**, which means your existing `docker-compose.yml` will work perfectly!

### Your Current Setup

Your `docker-compose.yml` includes:
- ✅ MySQL service with health checks
- ✅ Backend service with dependencies
- ✅ Proper networking
- ✅ Volume management

### Deployment Steps

1. **In Dokploy UI:**
   - Select **"Docker Compose"** as deployment method
   - Dokploy will automatically detect and use your `docker-compose.yml`

2. **Environment Variables:**
   - Add all required variables in Dokploy's environment section
   - Dokploy will inject them into your services

3. **Database Setup:**
   - Your MySQL service will be created automatically
   - Database will be initialized
   - You can run migrations after first deployment

4. **Deploy:**
   - Click deploy
   - Dokploy handles everything automatically!

---

## 📝 Post-Deployment Steps

### 1. Run Database Migrations

After first deployment, run migrations:

**Option A: Via Dokploy Shell**
1. Go to your application in Dokploy
2. Click **"Shell"** or **"Terminal"**
3. Run:
   ```bash
   node setup-db-sequelize.js
   ```

**Option A: Via SSH**
```bash
# SSH into your Dokploy server
ssh user@your-server

# Enter backend container
docker exec -it auction-backend sh

# Run migrations
node setup-db-sequelize.js
```

### 2. Verify Services

1. **Backend Health Check:**
   - Visit: `http://your-server:3001/health`
   - Should return: `{"status":"healthy","database":"connected"}`

2. **Check Logs:**
   - In Dokploy UI → Applications → Your App → Logs
   - Verify no errors

### 3. Update Frontend API URL

Update your frontend environment variable:

```env
NEXT_PUBLIC_API_URL=http://your-server:3001
# or if using domain:
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## 🔧 Configuration Tips

### Custom Domain Setup

1. In Dokploy → **Traefik** configuration
2. Add your domain name
3. SSL certificates are managed automatically

### Environment Variables Management

- All environment variables should be set in Dokploy UI
- They will be passed to your Docker containers
- Changes require redeployment

### Database Backups

Dokploy includes automatic backup features:
1. Go to **Databases** section
2. Configure backup schedule
3. Backups are stored automatically

### Monitoring

- **CPU/Memory:** Real-time monitoring in Dokploy UI
- **Logs:** View application logs in real-time
- **Health Checks:** Configure in Docker Compose healthcheck section

---

## 🆘 Troubleshooting

### Database Connection Fails

**Issue:** Backend can't connect to MySQL

**Solution:**
1. Verify `DB_HOST=mysql` (service name in docker-compose.yml)
2. Check MySQL service is running in Dokploy
3. Verify database credentials in environment variables
4. Check network connectivity between services

### Port Already in Use

**Issue:** Port 3001 already in use

**Solution:**
1. Change `PORT` environment variable to different port
2. Update docker-compose.yml port mapping
3. Redeploy

### Build Fails

**Issue:** Docker build fails

**Solution:**
1. Check build logs in Dokploy UI
2. Verify Dockerfile syntax
3. Check all files are in repository
4. Verify Node.js version compatibility

### Socket.IO Not Working

**Issue:** WebSocket connections fail

**Solution:**
1. Verify CORS_ORIGINS includes your frontend URL
2. Check SOCKET_CORS_ORIGINS is set correctly
3. Verify Traefik is configured for WebSocket support
4. Check firewall rules allow WebSocket connections

### Services Not Starting

**Issue:** Services fail to start

**Solution:**
1. Check logs in Dokploy UI
2. Verify all required environment variables are set
3. Check health checks in docker-compose.yml
4. Verify MySQL is healthy before backend starts

---

## 📊 Dokploy Features You'll Use

### 1. Application Management
- **Deploy:** One-click deployment from GitHub
- **Update:** Automatic updates on git push
- **Rollback:** Easy rollback to previous versions
- **Scale:** Scale services up/down as needed

### 2. Database Management
- **MySQL:** Automatically managed in Docker Compose
- **Backups:** Configure automatic backups
- **Monitoring:** Database performance metrics
- **Access:** Easy database access for migrations

### 3. Logging & Monitoring
- **Real-time Logs:** View logs in Dokploy UI
- **CPU/Memory:** Monitor resource usage
- **Network:** Track network activity
- **Alerts:** Set up alerts for issues

### 4. Multi-Server Support
- **Remote Servers:** Deploy to multiple servers
- **Load Balancing:** Distribute load across servers
- **Centralized Management:** Manage all from one UI

---

## 🔄 Continuous Deployment

### Automatic Deployments

1. **Enable GitHub Integration:**
   - In Dokploy → Applications → Settings
   - Enable **"Auto Deploy on Push"**

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```

3. **Dokploy Auto-Deploys:**
   - Detects changes
   - Builds new image
   - Deploys automatically

### Manual Deployment

1. Go to Dokploy UI
2. Select your application
3. Click **"Redeploy"**
4. Wait for completion

---

## 📚 Resources

- **Dokploy Website:** https://dokploy.com/
- **Dokploy Docs:** https://dokploy.com/docs
- **GitHub Repository:** https://github.com/salmenkhelifi1/auction_backend
- **Docker Compose Docs:** https://docs.docker.com/compose/

---

## ✅ Checklist

Before deploying, ensure:

- [ ] Dokploy is installed and running
- [ ] GitHub repository is connected
- [ ] All environment variables are configured
- [ ] Docker Compose file is correct
- [ ] Database credentials are secure
- [ ] Frontend URL is set in CORS_ORIGINS
- [ ] JWT_SECRET is strong and unique
- [ ] Stripe keys are configured (if using payments)
- [ ] Cloudinary is configured (if using image uploads)

---

## 🎉 Success!

After deployment, your backend will be:
- ✅ Running on Dokploy
- ✅ Connected to MySQL database
- ✅ Accessible via your server IP/domain
- ✅ Ready to serve your frontend

**Need help?** Check Dokploy documentation or open an issue on GitHub!

---

**Repository:** https://github.com/salmenkhelifi1/auction_backend
**Dokploy:** https://dokploy.com/

