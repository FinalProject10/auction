# Backend Deployment Guide

This backend uses **Express.js** with **Socket.IO**, **MySQL**, and other features. It needs a platform that supports:
- ✅ Long-running processes (not serverless)
- ✅ Socket.IO/WebSocket support
- ✅ MySQL database
- ✅ Environment variables

## ⚠️ Vercel is NOT Suitable

Vercel is for serverless functions only. Your backend needs:
- ❌ Long-running server (Express.js)
- ❌ Socket.IO (needs persistent connections)
- ❌ MySQL database (not included)

## 🎯 Recommended: Railway (Easiest)

### Why Railway?
- ✅ Free $5 credit/month (usually enough)
- ✅ MySQL database included (free)
- ✅ One-click setup
- ✅ Automatic deployments from GitHub
- ✅ Socket.IO support
- ✅ WebSocket enabled by default

### Quick Setup (5 minutes):

1. **Sign up:** [railway.app](https://railway.app) (use GitHub login)

2. **Create Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add MySQL Database:**
   - In project → "New" → "Database" → "MySQL"
   - Railway creates it automatically
   - Copy connection variables from "Variables" tab

4. **Deploy Backend:**
   - "New" → "GitHub Repo"
   - Select your repository
   - Set **Root Directory**: `back`
   - Framework: Node.js (auto-detected)

5. **Environment Variables:**
   Go to your service → "Variables" tab and add:

   ```env
   # Database (from MySQL service - copy from Variables tab)
   DB_HOST=<from MySQL service>
   DB_NAME=<from MySQL service>
   DB_USER=<from MySQL service>
   DB_PASSWORD=<from MySQL service>
   DB_PORT=3306
   DB_DIALECT=mysql

   # Server
   PORT=3001
   NODE_ENV=production

   # Required
   JWT_SECRET=your-very-secret-jwt-key-change-this
   CORS_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app,https://your-frontend.netlify.app
   FRONTEND_URL=https://your-frontend.vercel.app
   STRIPE_SECRET_KEY=sk_test_your_stripe_key

   # Optional - Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Optional - Firebase
   FIREBASE_SERVICE_ACCOUNT_PATH=./auction-adca9-77aeb27bd088.json
   SOCKET_CORS_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
   ```

6. **Build Settings:**
   - Build Command: `npm install`
   - Start Command: `npm start`

7. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your backend is live! 🎉

**Your backend URL:** `https://your-app.up.railway.app`

---

## 🔄 Update Frontend After Deployment

1. Go to your frontend on Vercel/Netlify
2. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
   ```
3. Redeploy frontend

---

## 📝 Database Setup

After deployment, you need to run database migrations:

1. SSH into your Railway service (or use Railway CLI)
2. Run:
   ```bash
   node setup-db-sequelize.js
   ```

Or manually create tables using the SQL schema in `shema.sql`

---

## 🆘 Troubleshooting

### Database Connection Fails
- Check environment variables are correct
- Verify MySQL service is running
- Test connection string format

### Socket.IO Not Working
- Verify WebSocket is enabled (Railway does this automatically)
- Check CORS_ORIGINS includes your frontend URL
- Verify SOCKET_CORS_ORIGINS is set

### Build Fails
- Check build logs in Railway dashboard
- Verify Node.js version (should be 20+)
- Check all dependencies in package.json

### 500 Errors
- Check server logs in Railway dashboard
- Verify all required environment variables are set
- Check database connection

---

## 📊 Free Tier Limits

**Railway:**
- $5 credit/month (resets monthly)
- Usually enough for small apps
- MySQL database included
- No sleep (always on)

**If you need more:**
- Render: 750 hours/month (free tier sleeps after 15min)
- Render + PlanetScale: Completely free (separate services)

---

## 🔗 Resources

- [Railway Docs](https://docs.railway.app)
- [Railway MySQL Guide](https://docs.railway.app/databases/mysql)

---

**Need help?** Railway has excellent documentation and support!

