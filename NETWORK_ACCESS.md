# Network Access Guide

## Complete Setup for Network Access

This guide will help you run both frontend and backend on your network so you can access the full app from any device.

### Your Network IP
**Current IP:** `172.26.22.246`

---

## Step 1: Configure Frontend Environment

1. **Create or update `.env.local` in the `front` folder:**

```bash
cd front
```

Create `.env.local` file with:
```env
NEXT_PUBLIC_API_URL=http://172.26.22.246:5001
NEXT_PUBLIC_SOCKET_URL=http://172.26.22.246:5001
NEXT_PUBLIC_SITE_URL=http://172.26.22.246:3000
```

**Important:** Replace `172.26.22.246` with your actual network IP if it's different.

---

## Step 2: Configure Backend Environment

1. **Update `.env` in the `back` folder:**

Make sure your `CORS_ORIGINS` includes your network IP:

```env
PORT=5001
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://172.26.22.246:3000,http://172.26.22.246:3001
SOCKET_CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://172.26.22.246:3000,http://172.26.22.246:3001
FRONTEND_URL=http://172.26.22.246:3000
# ... other env variables
```

**Important:** Replace `172.26.22.246` with your actual network IP.

---

## Step 3: Start Backend Server

```bash
cd back
npm run server-dev
```

The backend will:
- Listen on `0.0.0.0:5001` (accessible from network)
- Show network IP in console
- Allow CORS from network origins

---

## Step 4: Start Frontend Server

```bash
cd front
npm run dev:network
```

The frontend will:
- Listen on `0.0.0.0:3000` (accessible from network)
- Connect to backend using network IP

---

## Access URLs

### From Your Computer:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5001

### From Other Devices on Network:
- **Frontend:** http://172.26.22.246:3000
- **Backend API:** http://172.26.22.246:5001

---

## Saved Test Users

All saved users have the password: **Saved123@**

### Saved Client
- **Email:** saveduser@test.com
- **Password:** Saved123@
- **Login URL:** http://172.26.22.246:3000/login/client

### Saved Seller
- **Email:** savedseller@test.com
- **Password:** Saved123@
- **Login URL:** http://172.26.22.246:3000/login/seller

### Saved Admin
- **Email:** savedadmin@test.com
- **Password:** Saved123@
- **Login URL:** http://172.26.22.246:3000/login/admin

---

## Quick Start Commands

### Terminal 1 - Backend:
```bash
cd back
npm run server-dev
```

### Terminal 2 - Frontend:
```bash
cd front
npm run dev:network
```

---

## Find Your Network IP

If your IP changes, find it with:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1
```

Then update:
1. `front/.env.local` - Update `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SOCKET_URL`
2. `back/.env` - Update `CORS_ORIGINS` and `FRONTEND_URL`

---

## Troubleshooting

### Backend not accessible:
- Check firewall allows port 5001
- Verify backend shows network IP in console
- Check CORS_ORIGINS includes your network IP

### Frontend can't connect to backend:
- Verify `NEXT_PUBLIC_API_URL` in `front/.env.local` matches backend IP
- Check backend is running and accessible
- Check browser console for CORS errors

### Connection refused:
- Make sure both devices are on the same WiFi network
- Check firewall settings
- Verify ports 3000 and 5001 are not blocked

---

## Notes

- Both devices must be on the same network
- IP address may change if you reconnect to WiFi
- Firewall must allow connections on ports 3000 and 5001
- Backend automatically detects and displays network IP on startup

