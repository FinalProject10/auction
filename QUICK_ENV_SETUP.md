# Quick Environment Setup ✅

## Two Modes Available

### 🏠 LOCAL Mode (Default - for local development)
Uses `localhost` - only accessible on your computer

### 🌐 NETWORK Mode (for network access)
Uses your network IP - accessible from other devices on same network

## How to Use

### For Local Development (Default)
```bash
node back/scripts/update-ip.js
# or
node back/scripts/update-ip.js --local
```

**Sets:**
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:3000`

### For Network Access (Mobile/Other Devices)
```bash
node back/scripts/update-ip.js --network
```

**Sets:**
- Backend: `http://192.168.10.6:3001` (your network IP)
- Frontend: `http://192.168.10.6:3000`

## What Gets Updated

✅ `back/.env` - Backend configuration
✅ `front/.env.local` - Frontend configuration

Both files are automatically updated with the correct IPs.

## After Running Script

**Always restart your servers:**
```bash
# Backend
cd back && npm start

# Frontend (new terminal)
cd front && npm run dev
```

## Summary

- **Default**: Uses `localhost` (local dev only)
- **Network**: Run with `--network` flag (for network access)
- **Auto-detects**: Your network IP automatically
- **Easy switch**: One command to switch modes

## Examples

```bash
# Local development
node back/scripts/update-ip.js

# Network access (mobile testing)
node back/scripts/update-ip.js --network

# Back to local
node back/scripts/update-ip.js --local
```

That's it! 🎉

