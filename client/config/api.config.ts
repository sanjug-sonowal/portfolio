export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/api/v1/auth/login",
      REGISTER: "/api/v1/auth/register",
    },
  },
  TIMEOUT: 30000,
} as const;

export type ApiEndpoint = typeof API_CONFIG.ENDPOINTS;

