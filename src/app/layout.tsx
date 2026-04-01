import type { Metadata, Viewport } from 'next'
import Providers from '@/src/components/Providers'
import BlogLayout from '@/src/components/layout/BlogLayout'
import GoogleAnalytics from '@/src/components/analytics/GoogleAnalytics'
import GoogleAdSense from '@/src/components/ads/GoogleAdSense'
import { getMetadata } from '@/src/lib/utils/seo'
import '@/src/styles/globals.css'

export const metadata: Metadata = getMetadata()

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ff9500',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-orange-100 dark:selection:bg-orange-900/30">
        <Providers>
          <BlogLayout>
            {children}
          </BlogLayout>
        </Providers>

        <GoogleAnalytics />
        <GoogleAdSense />
      </body>
    </html>
  )
}
