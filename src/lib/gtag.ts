export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-HGPG08YYC4"

export const pageview = (url: string, title: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
    page_title: title,
    // debug_mode: typeof window !== 'undefined' && window.location.hostname === 'localhost',
  })
}

export const event = (
  action: string,
  params?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params)
  }
}
