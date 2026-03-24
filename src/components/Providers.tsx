'use client'

import React, { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    })
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
