# Dynamic IP Address Setup

## Overview

This setup automatically detects your IP address and updates your `.env` files when you change networks. No more manual IP updates!

## Quick Start

### 1. Initial Setup

```bash
# Copy example files
cp back/.env.example back/.env
cp front/.env.local.example front/.env.local

# Run IP detection script
node back/scripts/update-ip.js
```

Or use the shell script:
```bash
./update-ip.sh
```

### 2. When You Change Networks

Simply run:
```bash
node back/scripts/update-ip.js
```

Or:
```bash
./update-ip.sh
```

The script will:
- ✅ Detect your current IP address
- ✅ Update `back/.env` with the new IP
- ✅ Update `front/.env.local` with the new backend URL
- ✅ Show you the detected IPs

### 3. Restart Servers

After updating IPs:
```bash
# Restart backend
cd back
npm start

# Restart frontend (in another terminal)
cd front
npm run dev
```

## How It Works

### Backend Auto-Detection

The backend automatically detects your network IP when it starts. It uses the `getNetworkIP()` function which:
- Scans all network interfaces
- Finds the first non-internal IPv4 address
- Uses it for CORS and network access

### Frontend Auto-Detection

The frontend can auto-detect the backend IP by:
1. Checking `NEXT_PUBLIC_API_URL` environment variable
2. If not set or using localhost, detecting from `window.location.hostname`
3. Storing detected IP in localStorage for persistence

### Manual Override

You can always manually set IPs in:
- `back/.env` - Set `LOCAL_IP=your.ip.address`
- `front/.env.local` - Set `NEXT_PUBLIC_API_URL=http://your.ip.address:3001`

## Environment Files

### Backend (.env)

```env
# Auto-detected (don't change manually)
LOCAL_IP=auto
API_URL=auto

# Or set manually
LOCAL_IP=192.168.1.100
API_URL=http://192.168.1.100:3001
```

### Frontend (.env.local)

```env
# Auto-detected (don't change manually)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_AUTO_DETECT_IP=true

# Or set manually
NEXT_PUBLIC_API_URL=http://192.168.1.100:3001
NEXT_PUBLIC_AUTO_DETECT_IP=false
```

## Troubleshooting

### IP Not Detected Correctly

1. Check your network connection:
   ```bash
   ifconfig  # macOS/Linux
   ipconfig  # Windows
   ```

2. Manually set IP in `.env` files

3. Make sure you're on the same network as your devices

### Frontend Can't Connect to Backend

1. Check backend is running: `curl http://YOUR_IP:3001/health`
2. Check firewall allows port 3001
3. Verify IP in `front/.env.local` matches backend IP
4. Clear browser cache and localStorage

### Script Fails

1. Make sure Node.js is installed: `node --version`
2. Check file permissions: `chmod +x update-ip.sh`
3. Run manually: `node back/scripts/update-ip.js`

## Tips

- 💡 Run `update-ip.sh` whenever you change networks
- 💡 Add it to your startup script for automatic updates
- 💡 Use `localhost` for local development, IP for network access
- 💡 Check IP detection with: `node -e "console.log(require('./back/utils/getLocalIP')())"`

## Files Created

- `back/utils/getLocalIP.js` - IP detection utility
- `back/utils/updateEnvIP.js` - Env file updater
- `back/scripts/update-ip.js` - Main update script
- `update-ip.sh` - Shell wrapper script
- `back/.env.example` - Backend env template
- `front/.env.local.example` - Frontend env template

