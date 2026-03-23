'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { GA_TRACKING_ID, pageview } from '@/src/lib/gtag'
import Script from 'next/script'

function AnalyticsContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = pathname + searchParams.toString()
      pageview(url, document.title)
    }
  }, [pathname, searchParams])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              // debug_mode: 1,
            });
          `,
        }}
      />
    </>
  )
}

export default function GoogleAnalytics() {
  if (!GA_TRACKING_ID) return null

  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  )
}
