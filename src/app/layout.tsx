import type { Metadata, Viewport } from 'next'
import { CONFIG } from '../config/blog'
import Providers from '../components/Providers'
import BlogLayout from '../components/layout/BlogLayout'
import '../styles/globals.css'
import GoogleAnalytics from '../components/analytics/GoogleAnalytics'

import { getMetadata } from '../lib/utils/seo'

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
      </body>
    </html>
  )
}
