// src/utils/imageConfig.ts

export const DEV_API = "http://localhost:5000";
export const PROD_API = import.meta.env.VITE_API_URL;

// Optional: toggle verbose logging
export const IMAGE_DEBUG = true;

// Whitelisted base URLs (dev, prod, future CDN, etc.)
export const TRUSTED_IMAGE_BASES: string[] = [
  DEV_API,
  PROD_API,
  // "https://your-cdn.com", // add later if needed
];

// ⭐ Clean, safe helper: checks if a full URL is trusted
export function isTrustedFullUrl(url: string): boolean {
  return TRUSTED_IMAGE_BASES.some((base) => url.startsWith(base));
}
