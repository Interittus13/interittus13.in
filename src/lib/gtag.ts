export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-HGPG08YYC4'

export const pageview = (url: string, title: string) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title,
    page_location: window.location.href,
  })
}

export const event = (
  action: string,
  params?: Record<string, string | number | boolean>
) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, params)
}
