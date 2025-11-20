const { networkInterfaces } = require('os');

/**
 * Get the local IP address automatically
 * Returns the first non-internal IPv4 address
 */
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

  // Return the first non-internal IPv4 address, or localhost as fallback
  return addresses[0] || 'localhost';
}

module.exports = getLocalIP;

