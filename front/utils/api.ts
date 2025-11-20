// API Configuration Utility
// Centralized API URL management with localhost/network IP support

import { getBackendURL } from './detectBackendIP';

// Get IP mode from environment
const IP_MODE = process.env.NEXT_PUBLIC_IP_MODE || 'localhost';

// Get API URL based on mode
let API_URL = process.env.NEXT_PUBLIC_API_URL;

// Client-side: Auto-detect if needed
if (typeof window !== 'undefined') {
  if (IP_MODE === 'auto' || (!API_URL || API_URL.includes('localhost'))) {
    // Auto-detect: use network IP if not on localhost
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && IP_MODE !== 'localhost') {
      API_URL = getBackendURL();
    }
  } else if (IP_MODE === 'network') {
    // Force network IP
    API_URL = getBackendURL();
  }
  // If IP_MODE is 'localhost', use the env variable (localhost)
}

// Fallback if still not set
if (!API_URL) {
  API_URL = IP_MODE === 'network' 
    ? (typeof window !== 'undefined' ? getBackendURL() : 'http://localhost:3001')
    : 'http://localhost:3001';
}

export { API_URL };
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || API_URL;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || API_URL.replace(/:\d+$/, ':3000');

// Helper function to build API endpoints
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_URL}/${cleanEndpoint}`;
};

// Helper function for axios instances
export const apiConfig = {
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

