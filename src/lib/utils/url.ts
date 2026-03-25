import { CONFIG } from '@/src/config/blog'

/**
 * Robustly determine the base URL for the current environment.
 * Prioritizes Vercel's preview URLs during branch-testing to ensure 
 * social metadata (like OG images) points to the correct domain.
 */
export function getBaseUrl() {
  let url = CONFIG.link || 'https://interittus.in'
  
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }
  
  // Robustly remove any trailing slashes to prevent double-slashes during concatenation
  return url.replace(/\/$/, '')
}
