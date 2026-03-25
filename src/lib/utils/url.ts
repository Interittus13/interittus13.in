import { CONFIG } from '@/src/config/blog'

/**
 * Robustly determine the base URL for the current environment.
 * Prioritizes Vercel's preview URLs during branch-testing to ensure 
 * social metadata (like OG images) points to the correct domain.
 */
export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }
  
  // Default to production site URL
  return CONFIG.link || 'https://interittus.in'
}
