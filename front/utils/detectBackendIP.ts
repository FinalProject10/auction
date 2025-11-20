/**
 * Auto-detect backend IP address
 * This runs on the client side to automatically detect the backend server IP
 */

export async function detectBackendIP(): Promise<string> {
  // Try to get IP from environment variable first
  if (typeof window !== 'undefined') {
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
      return envUrl;
    }
  }

  // If in browser, try to detect from current hostname
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const port = process.env.NEXT_PUBLIC_API_PORT || '3001';
    
    // If not localhost, use current hostname
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `${protocol}//${hostname}:${port}`;
    }
  }

  // Fallback to localhost
  return 'http://localhost:3001';
}

export function getBackendURL(): string {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  // Check if we have a stored IP
  const storedIP = localStorage.getItem('backend_ip');
  if (storedIP) {
    return storedIP;
  }

  // Try to detect from current location
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = process.env.NEXT_PUBLIC_API_PORT || '3001';

  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    const detectedURL = `${protocol}//${hostname}:${port}`;
    localStorage.setItem('backend_ip', detectedURL);
    return detectedURL;
  }

  // Fallback
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
}

