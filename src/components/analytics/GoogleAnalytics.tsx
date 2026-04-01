'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { GA_TRACKING_ID, pageview } from '@/src/lib/gtag'
import Script from 'next/script'

function AnalyticsContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return

    const query = searchParams?.toString()
    const url = query ? `${pathname}?${query}` : pathname
    pageview(url, document.title)
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
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              send_page_view: false,
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
