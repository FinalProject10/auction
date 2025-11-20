# Environment Variables for Dokploy Deployment

Use this guide to add environment variables in Dokploy's **Environment** tab.

## 📋 Complete Environment Variables List

Copy these into Dokploy's Environment tab:

```env
# ============================================
# DATABASE CONFIGURATION
# ============================================
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_secure_mysql_password_here
DB_NAME=final
DB_DIALECT=mysql

# ============================================
# SERVER CONFIGURATION
# ============================================
NODE_ENV=production
PORT=3001

# ============================================
# SECURITY - JWT AUTHENTICATION (REQUIRED)
# ============================================
# Generate a strong random string for production
# Example: openssl rand -base64 32
JWT_SECRET=your-very-secret-jwt-key-change-this-to-a-random-string

# ============================================
# CORS CONFIGURATION (REQUIRED)
# ============================================
# Frontend URLs (comma-separated, no spaces)
# Your production frontend URL
CORS_ORIGINS=https://auction-test-front.vercel.app,http://localhost:3000
FRONTEND_URL=https://auction-test-front.vercel.app

# Socket.IO CORS Origins (comma-separated, no spaces)
# Usually same as CORS_ORIGINS
SOCKET_CORS_ORIGINS=https://auction-test-front.vercel.app,http://localhost:3000

# ============================================
# STRIPE PAYMENT CONFIGURATION (REQUIRED)
# ============================================
# Get from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
# For production use: sk_live_your_stripe_secret_key_here

# ============================================
# CLOUDINARY IMAGE UPLOAD (OPTIONAL)
# ============================================
# Get from: https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# ============================================
# FIREBASE CONFIGURATION (OPTIONAL)
# ============================================
# Path to Firebase service account JSON file
# File should be uploaded via Dokploy Advanced → Mounts
FIREBASE_SERVICE_ACCOUNT_PATH=./auction-adca9-77aeb27bd088.json
```

## 📝 How to Add in Dokploy

1. **Go to your Docker Compose application in Dokploy**
2. **Click on "Environment" tab**
3. **Click "Add Variable" button**
4. **Add each variable one by one:**
   - **Key**: `DB_PASSWORD`
   - **Value**: `your_secure_password`
   - Click **"Add"**
5. **Repeat for all variables above**

## ✅ Required Variables (Must Have)

These variables are **required** for the application to start:

- `DB_PASSWORD` - MySQL root password
- `JWT_SECRET` - Secret key for JWT tokens
- `CORS_ORIGINS` - Frontend URLs allowed to access API
- `FRONTEND_URL` - Your frontend URL
- `STRIPE_SECRET_KEY` - Stripe API key

## ⚙️ Optional Variables

These are optional but recommended:

- `SOCKET_CORS_ORIGINS` - Socket.IO CORS (defaults to CORS_ORIGINS)
- `CLOUDINARY_*` - Only if you use image uploads
- `FIREBASE_SERVICE_ACCOUNT_PATH` - Only if you use Firebase

## 🔒 Security Notes

1. **Never commit actual values** to git
2. **Use strong passwords** for production
3. **Generate secure JWT_SECRET** using:

   ```bash
   openssl rand -base64 32
   ```

4. **Use environment-specific keys** (test vs production)

## 📍 Example Values with Your Frontend

Here's an example with your actual frontend URL:

```env
DB_PASSWORD=MySecure123!Password
JWT_SECRET=replace_with_strong_random_value
CORS_ORIGINS=https://auction-test-front.vercel.app,http://localhost:3000
FRONTEND_URL=https://auction-test-front.vercel.app
STRIPE_SECRET_KEY=replace_with_stripe_secret_key
SOCKET_CORS_ORIGINS=https://auction-test-front.vercel.app,http://localhost:3000
CLOUDINARY_CLOUD_NAME=mycloudname
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

**Your Frontend URL:** <https://auction-test-front.vercel.app/>

## 🚀 After Adding Variables

1. **Save all variables** in Dokploy Environment tab
2. **Redeploy** your application
3. **Check logs** to verify no missing variable errors
4. **Test API endpoints** to ensure everything works

---

**Note**: After adding environment variables, redeploy your application for changes to take effect!
