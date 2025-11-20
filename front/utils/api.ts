// API Configuration Utility
// Centralized API URL management

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    '❌ Missing required environment variable: NEXT_PUBLIC_API_URL\n' +
    'Please create a .env.local file with NEXT_PUBLIC_API_URL set.\n' +
    'See .env.example for reference.'
  );
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_API_URL;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_API_URL.replace(/:\d+$/, ':3000');

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

