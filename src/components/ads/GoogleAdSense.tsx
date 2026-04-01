'use client'

import Script from 'next/script'
import { shouldRenderAds, ADS_CONFIG } from '@/src/config/blog'

export default function GoogleAdSense() {
    if (!shouldRenderAds) return null

    return (
        <Script
            id="google-adsense"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CONFIG.clientId}`}
            crossOrigin="anonymous"
        />
    )
}
