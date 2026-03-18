import type { Metadata, Viewport } from 'next'
import { CONFIG } from '../config/blog'
import Providers from '../components/Providers'
import BlogLayout from '../components/layout/BlogLayout'
import '../styles/globals.css'
import Script from 'next/script'
import { GA_TRACKING_ID } from '../lib/gtag'

export const metadata: Metadata = {
  title: {
    default: CONFIG.BLOG_TITLE,
    template: `%s | ${CONFIG.BLOG_TITLE}`,
  },
  description: CONFIG.BLOG_TITLE,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

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
        
        {/* Google Analytics */}
        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
              `,
          }}
        />
      </body>
    </html>
  )
}
