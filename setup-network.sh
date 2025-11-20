#!/bin/bash

# Network Setup Script for Auction App
# This script helps configure frontend and backend for network access

echo "🌐 Network Access Setup"
echo "======================"
echo ""

# Get network IP
NETWORK_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)

if [ -z "$NETWORK_IP" ]; then
    echo "❌ Could not detect network IP. Please set it manually."
    exit 1
fi

echo "📡 Detected Network IP: $NETWORK_IP"
echo ""

# Update frontend .env.local
FRONTEND_ENV="front/.env.local"
if [ -f "$FRONTEND_ENV" ]; then
    echo "✅ Updating frontend/.env.local..."
    
    # Backup original
    cp "$FRONTEND_ENV" "$FRONTEND_ENV.backup"
    
    # Update API URLs
    sed -i '' "s|NEXT_PUBLIC_API_URL=.*|NEXT_PUBLIC_API_URL=http://$NETWORK_IP:5001|g" "$FRONTEND_ENV"
    sed -i '' "s|NEXT_PUBLIC_SOCKET_URL=.*|NEXT_PUBLIC_SOCKET_URL=http://$NETWORK_IP:5001|g" "$FRONTEND_ENV"
    sed -i '' "s|NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=http://$NETWORK_IP:3000|g" "$FRONTEND_ENV"
    
    echo "✅ Frontend .env.local updated"
else
    echo "⚠️  front/.env.local not found. Creating it..."
    cat > "$FRONTEND_ENV" << EOF
NEXT_PUBLIC_API_URL=http://$NETWORK_IP:5001
NEXT_PUBLIC_SOCKET_URL=http://$NETWORK_IP:5001
NEXT_PUBLIC_SITE_URL=http://$NETWORK_IP:3000
EOF
    echo "✅ Created front/.env.local"
fi

echo ""
echo "📝 Backend Configuration:"
echo "   Please update back/.env and add to CORS_ORIGINS:"
echo "   http://$NETWORK_IP:3000,http://$NETWORK_IP:3001"
echo ""
echo "   Also update FRONTEND_URL:"
echo "   FRONTEND_URL=http://$NETWORK_IP:3000"
echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Next steps:"
echo "   1. Update back/.env with the CORS_ORIGINS above"
echo "   2. Start backend: cd back && npm run server-dev"
echo "   3. Start frontend: cd front && npm run dev:network"
echo ""
echo "📱 Access from network devices:"
echo "   Frontend: http://$NETWORK_IP:3000"
echo "   Backend:  http://$NETWORK_IP:5001"
echo ""

