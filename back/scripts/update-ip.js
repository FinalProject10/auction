#!/usr/bin/env node

/**
 * Script to automatically update IP address in .env files
 * Run this script whenever you change networks
 * Usage: node scripts/update-ip.js
 */

const fs = require('fs');
const path = require('path');
const { networkInterfaces } = require('os');

function getLocalIP() {
  const nets = networkInterfaces();
  const addresses = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal (i.e. 127.0.0.1) and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        addresses.push(net.address);
      }
    }
  }

  return addresses[0] || 'localhost';
}

function updateBackendEnv(useNetwork = false) {
  const envPath = path.join(__dirname, '../.env');
  const envExamplePath = path.join(__dirname, '../.env.example');
  
  const ip = getLocalIP();
  const port = process.env.PORT || 3001;
  
  // Use localhost for local dev, network IP for network access
  const selectedIP = useNetwork ? ip : 'localhost';
  const apiUrl = `http://${selectedIP}:${port}`;

  console.log(`\n🌐 Backend IP Configuration:`);
  console.log(`   Mode: ${useNetwork ? 'NETWORK' : 'LOCAL'}`);
  console.log(`   Detected Network IP: ${ip}`);
  console.log(`   Using IP: ${selectedIP}`);
  console.log(`   Port: ${port}`);
  console.log(`   API URL: ${apiUrl}`);

  // Read existing .env if it exists
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  } else if (fs.existsSync(envExamplePath)) {
    console.log(`   ⚠️  .env not found, using .env.example as template`);
    envContent = fs.readFileSync(envExamplePath, 'utf8');
  } else {
    console.log(`   ❌ No .env or .env.example found`);
    return null;
  }

  // Update or add IP-related variables
  const lines = envContent.split('\n');
  const updatedLines = [];
  let foundApiUrl = false;
  let foundIp = false;
  let foundUseNetwork = false;
  let foundPort = false;

  for (const line of lines) {
    if (line.startsWith('API_URL=')) {
      updatedLines.push(`API_URL=${apiUrl}`);
      foundApiUrl = true;
    } else if (line.startsWith('LOCAL_IP=')) {
      updatedLines.push(`LOCAL_IP=${selectedIP}`);
      foundIp = true;
    } else if (line.startsWith('USE_NETWORK_IP=')) {
      updatedLines.push(`USE_NETWORK_IP=${useNetwork}`);
      foundUseNetwork = true;
    } else if (line.startsWith('PORT=') && !foundPort) {
      updatedLines.push(`PORT=${port}`);
      foundPort = true;
    } else if (line.trim() && !line.startsWith('#')) {
      updatedLines.push(line);
    } else {
      updatedLines.push(line);
    }
  }

  // Add if not found
  if (!foundApiUrl) {
    updatedLines.push(`API_URL=${apiUrl}`);
  }
  if (!foundIp) {
    updatedLines.push(`LOCAL_IP=${selectedIP}`);
  }
  if (!foundUseNetwork) {
    updatedLines.push(`USE_NETWORK_IP=${useNetwork}`);
  }

  // Write updated .env
  fs.writeFileSync(envPath, updatedLines.join('\n'), 'utf8');
  console.log(`   ✅ Updated backend .env file`);
  
  return { ip: selectedIP, networkIP: ip, apiUrl, port };
}

function updateFrontendEnv(backendIP, backendPort, useNetwork = false) {
  const envPath = path.join(__dirname, '../../front/.env.local');
  const envExamplePath = path.join(__dirname, '../../front/.env.local.example');
  
  const apiUrl = `http://${backendIP}:${backendPort}`;
  const socketUrl = apiUrl;
  const siteUrl = `http://${backendIP}:3000`;
  const ipMode = useNetwork ? 'network' : 'localhost';

  console.log(`\n🌐 Frontend IP Configuration:`);
  console.log(`   Mode: ${useNetwork ? 'NETWORK' : 'LOCAL'}`);
  console.log(`   Backend API URL: ${apiUrl}`);
  console.log(`   Socket URL: ${socketUrl}`);
  console.log(`   Site URL: ${siteUrl}`);

  // Read existing .env.local if it exists
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  } else if (fs.existsSync(envExamplePath)) {
    console.log(`   ⚠️  .env.local not found, using .env.local.example as template`);
    envContent = fs.readFileSync(envExamplePath, 'utf8');
  } else {
    console.log(`   ❌ No .env.local or .env.local.example found`);
    return null;
  }

  // Update or add URL variables
  const lines = envContent.split('\n');
  const updatedLines = [];
  let foundApiUrl = false;
  let foundSocketUrl = false;
  let foundSiteUrl = false;
  let foundIpMode = false;

  for (const line of lines) {
    if (line.startsWith('NEXT_PUBLIC_API_URL=')) {
      updatedLines.push(`NEXT_PUBLIC_API_URL=${apiUrl}`);
      foundApiUrl = true;
    } else if (line.startsWith('NEXT_PUBLIC_SOCKET_URL=')) {
      updatedLines.push(`NEXT_PUBLIC_SOCKET_URL=${socketUrl}`);
      foundSocketUrl = true;
    } else if (line.startsWith('NEXT_PUBLIC_SITE_URL=')) {
      updatedLines.push(`NEXT_PUBLIC_SITE_URL=${siteUrl}`);
      foundSiteUrl = true;
    } else if (line.startsWith('NEXT_PUBLIC_IP_MODE=')) {
      updatedLines.push(`NEXT_PUBLIC_IP_MODE=${ipMode}`);
      foundIpMode = true;
    } else if (line.trim() && !line.startsWith('#')) {
      updatedLines.push(line);
    } else {
      updatedLines.push(line);
    }
  }

  // Add if not found
  if (!foundApiUrl) {
    updatedLines.push(`NEXT_PUBLIC_API_URL=${apiUrl}`);
  }
  if (!foundSocketUrl) {
    updatedLines.push(`NEXT_PUBLIC_SOCKET_URL=${socketUrl}`);
  }
  if (!foundSiteUrl) {
    updatedLines.push(`NEXT_PUBLIC_SITE_URL=${siteUrl}`);
  }
  if (!foundIpMode) {
    updatedLines.push(`NEXT_PUBLIC_IP_MODE=${ipMode}`);
  }

  // Write updated .env.local
  fs.writeFileSync(envPath, updatedLines.join('\n'), 'utf8');
  console.log(`   ✅ Updated frontend .env.local file`);
  
  return { apiUrl, socketUrl, siteUrl, ipMode };
}

// Main execution
const args = process.argv.slice(2);
const useNetwork = args.includes('--network') || args.includes('-n');
const useLocal = args.includes('--local') || args.includes('-l');

// Default to localhost unless --network flag is used
const mode = useNetwork ? true : (useLocal ? false : false);

console.log('🚀 Configuring IP addresses for .env files...\n');
console.log(`Mode: ${mode ? 'NETWORK (using network IP)' : 'LOCAL (using localhost)'}\n`);

const backendInfo = updateBackendEnv(mode);
if (backendInfo) {
  updateFrontendEnv(backendInfo.ip, backendInfo.port, mode);
  
  console.log(`\n✅ All done! Your IP addresses have been updated.`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Restart your backend server`);
  console.log(`   2. Restart your frontend dev server`);
  console.log(`   3. Your app should now work!`);
  console.log(`\n💡 Usage:`);
  console.log(`   node scripts/update-ip.js          # Use localhost (local dev)`);
  console.log(`   node scripts/update-ip.js --network # Use network IP (network access)`);
  console.log(`   node scripts/update-ip.js --local   # Use localhost (explicit)`);
} else {
  console.log(`\n❌ Failed to update .env files. Please check the paths.`);
  process.exit(1);
}

