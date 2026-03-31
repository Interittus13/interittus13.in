/**
 * Robustly determine the base URL for the current environment.
 * Prioritizes Vercel's preview URLs during branch-testing to ensure 
 * social metadata (like OG images) points to the correct domain.
 */
export function getBaseUrl() {
  // 1. ALWAYS prefer explicit SITE_URL if set (useful for local dev or custom envs)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }

  // 2. On Vercel, check the environment. 
  // If it's PRODUCTION, we MUST use the canonical domain to avoid preview URLs leaking into SEO.
  const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'production'

  if (isProd) {
    return 'https://interittus13.in'
  }

  // 3. Fallback to Vercel's deployment-specific URL for Previews
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`.replace(/\/$/, '')
  }

  // 4. Global fallback
  return 'https://interittus13.in'
}

/**
 * Ensures a URL is absolute by adding https:// if it looks like a domain 
 * but doesn't have a protocol.
 */
export function ensureAbsoluteUrl(url: string | undefined): string {
  if (!url) return '#'
  
  // If it already has a protocol, return as is
  if (/^(https?:\/\/|mailto:|tel:)/.test(url)) {
    return url
  }
  
  // If it's a relative path, return as is
  if (url.startsWith('/')) {
    return url
  }
  
  // If it looks like a domain (e.g., example.com), add https://
  if (url.includes('.') && !url.startsWith('localhost')) {
    return `https://${url}`
  }
  
  return url
}
