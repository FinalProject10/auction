const fs = require('fs');
const path = require('path');
const getLocalIP = require('./getLocalIP');

/**
 * Update .env file with current IP address
 */
function updateEnvIP() {
  const envPath = path.join(__dirname, '../.env');
  const envExamplePath = path.join(__dirname, '../.env.example');
  
  const ip = getLocalIP();
  const port = process.env.PORT || 3001;
  const apiUrl = `http://${ip}:${port}`;

  console.log(`🌐 Detected IP: ${ip}`);
  console.log(`🔗 API URL: ${apiUrl}`);

  // Read existing .env if it exists
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  } else if (fs.existsSync(envExamplePath)) {
    envContent = fs.readFileSync(envExamplePath, 'utf8');
  }

  // Update or add IP-related variables
  const lines = envContent.split('\n');
  const updatedLines = [];
  let foundApiUrl = false;
  let foundIp = false;

  for (const line of lines) {
    if (line.startsWith('API_URL=') || line.startsWith('NEXT_PUBLIC_API_URL=')) {
      updatedLines.push(`API_URL=${apiUrl}`);
      foundApiUrl = true;
    } else if (line.startsWith('LOCAL_IP=')) {
      updatedLines.push(`LOCAL_IP=${ip}`);
      foundIp = true;
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
    updatedLines.push(`LOCAL_IP=${ip}`);
  }

  // Write updated .env
  fs.writeFileSync(envPath, updatedLines.join('\n'), 'utf8');
  console.log(`✅ Updated .env file with IP: ${ip}`);
  
  return { ip, apiUrl };
}

if (require.main === module) {
  updateEnvIP();
}

module.exports = updateEnvIP;

