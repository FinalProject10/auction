# Socket.IO Setup in Dokploy

This guide explains how to configure Socket.IO to work properly through Dokploy's Traefik reverse proxy.

## 📡 Socket.IO Configuration

### Port Information

- **Backend API Port**: `3001`
- **Socket.IO Port**: Same as backend (`3001`)
- **Protocol**: HTTP/WebSocket (upgrades automatically)

Socket.IO runs on the same server as your Express API. It doesn't need a separate port.

### Current Configuration

In your `docker-compose.yml`, Socket.IO is configured to work through Traefik:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.backend-app.rule=Host(`${DOMAIN:-api.localhost}`)"
  - "traefik.http.routers.backend-app.entrypoints=websecure"
  - "traefik.http.services.backend-app.loadbalancer.server.port=3001"
  # WebSocket support
  - "traefik.http.middlewares.backend-ws.headers.customrequestheaders.Connection=Upgrade"
```

## 🔧 Steps to Configure in Dokploy

### Option 1: Configure Domain in Dokploy UI (Recommended)

1. **Go to Domains Tab in Dokploy:**
   - Navigate to your Docker Compose application
   - Click on **"Domains"** tab
   - Add your domain (e.g., `api.yourdomain.com`)

2. **Set Environment Variable:**
   - Go to **"Environment"** tab
   - Add environment variable:
     ```
     DOMAIN=api.yourdomain.com
     ```

3. **Socket.IO will automatically work** through the domain!

### Option 2: Use Traefik File System (Advanced)

If you need more control over Traefik configuration:

1. **Go to Dokploy → Traefik File System**
2. **Edit Traefik configuration** to ensure WebSocket support is enabled
3. **Verify WebSocket middleware** is configured

## 🌐 Frontend Connection

### Using Domain (Recommended)

```javascript
import { io } from 'socket.io-client';

const socket = io('https://api.yourdomain.com', {
  transports: ['websocket', 'polling'], // Try WebSocket first, fallback to polling
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  query: {
    userId: user.id,
    itemsId: item.id
  }
});
```

### Using IP Address (Not Recommended for Production)

```javascript
const socket = io('http://178.156.183.189:3001', {
  transports: ['websocket', 'polling'],
  // ... other options
});
```

**Note**: Using IP address won't work with Traefik. You need a domain name.

## ✅ Verification Steps

1. **Check Traefik Labels:**
   - Verify WebSocket middleware is in the docker-compose.yml
   - Ensure `Connection=Upgrade` header is configured

2. **Test Socket.IO Connection:**
   ```javascript
   socket.on('connect', () => {
     console.log('✅ Socket.IO connected!', socket.id);
   });
   
   socket.on('connect_error', (error) => {
     console.error('❌ Connection error:', error);
   });
   ```

3. **Check Dokploy Logs:**
   - Go to **Logs** tab in Dokploy
   - Look for: `User Connected <userId>`
   - Verify Socket.IO events are being received

## 🔍 Troubleshooting

### Socket.IO Not Connecting

**Issue**: Socket.IO connection fails

**Solutions**:
1. **Check Domain Configuration:**
   - Ensure domain is added in Dokploy Domains tab
   - Verify `DOMAIN` environment variable is set
   - Check DNS points to your Dokploy server IP

2. **Verify CORS Settings:**
   - Set `SOCKET_CORS_ORIGINS` environment variable
   - Include your frontend URL in CORS origins
   - Example: `SOCKET_CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000`

3. **Check Traefik Configuration:**
   - Verify WebSocket middleware labels are present
   - Ensure `Connection=Upgrade` is configured
   - Check Traefik logs for WebSocket upgrade errors

4. **Test Connection:**
   ```bash
   # Test WebSocket connection
   wscat -c wss://api.yourdomain.com
   ```

### WebSocket Upgrade Fails

**Issue**: WebSocket upgrade request fails

**Solutions**:
1. **Verify Traefik Entrypoints:**
   - Ensure `websecure` entrypoint supports WebSocket
   - Check if HTTPS is properly configured

2. **Check Environment Variables:**
   - Verify `DOMAIN` is set correctly
   - Ensure `SOCKET_CORS_ORIGINS` includes your frontend

3. **Review Middleware:**
   - Check if CORS middleware isn't blocking WebSocket upgrade
   - Verify headers are properly configured

## 📋 Environment Variables Checklist

Make sure these are set in Dokploy Environment tab:

```env
# Domain (for Traefik routing)
DOMAIN=api.yourdomain.com

# CORS for Socket.IO
SOCKET_CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000

# Also set regular CORS (used as fallback)
CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
FRONTEND_URL=https://your-frontend.vercel.app
```

## 🔗 Socket.IO Events

Your backend supports these Socket.IO events:

**Client → Server:**
- `create` - Join a room (auction room)
- `placeBid` - Place a bid in real-time
- `disconnect` - Disconnect from server

**Server → Client:**
- `placedBid` - Receive real-time bid updates
- `notification` - Receive notifications

## 📚 Resources

- [Socket.IO Documentation](https://socket.io/docs/v4/)
- [Traefik WebSocket Support](https://doc.traefik.io/traefik/routing/services/)
- [Dokploy Domains Documentation](https://docs.dokploy.com/docs/core/docker-compose/domains)

---

**Need help?** Check Dokploy logs or Socket.IO connection status in your browser console!

