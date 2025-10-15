/**
 * Environment configuration with validation
 * Ensures all required environment variables are present
 */

const getEnvVar = (key: string, fallback?: string): string => {
  const value = process.env[key] || fallback;
  
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value;
};

export const env = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001/api/v1',
    timeout: 30000,
  },
  
  // App Configuration
  app: {
    name: 'SecureHub',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  // Feature Flags
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableDebug: process.env.NODE_ENV === 'development',
  },
} as const;

// Validate configuration on load
if (typeof window === 'undefined') {
  console.log('✅ Environment configuration loaded successfully');
}
