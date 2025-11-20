# Quick Environment Variables Setup for Dokploy

## 🚀 Copy & Paste This Into Dokploy Environment Tab

### Step 1: Go to Dokploy → Your Application → Environment Tab

### Step 2: Add These Variables One by One

**Required Variables:**

```env
DB_PASSWORD=your_secure_mysql_password
JWT_SECRET=generate_random_string_here_use_openssl_rand_base64_32
CORS_ORIGINS=https://auction-test-front.vercel.app,http://localhost:3000
FRONTEND_URL=https://auction-test-front.vercel.app
SOCKET_CORS_ORIGINS=https://auction-test-front.vercel.app,http://localhost:3000
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
```

**Optional Variables (if using these features):**

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Generate JWT_SECRET

In your terminal, run:
```bash
openssl rand -base64 32
```

Copy the output and paste it as the value for `JWT_SECRET`

### Step 4: Save and Redeploy

After adding all variables:
1. Click **"Save"** or **"Update"** in Dokploy
2. Go to **"Deployments"** tab
3. Click **"Redeploy"**

---

**Your Frontend:** https://auction-test-front.vercel.app/
**Your Backend:** (Check Dokploy domains tab for your backend URL)

