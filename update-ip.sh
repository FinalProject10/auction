#!/bin/bash

# Auto-detect IP and update .env files
# Run this script whenever you change networks

echo "🚀 Auto-detecting IP addresses..."

# Run the Node.js script
cd "$(dirname "$0")"
node back/scripts/update-ip.js

echo ""
echo "✅ Done! Restart your servers to apply changes."

