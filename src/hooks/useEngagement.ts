'use client'

import { useEffect, useRef } from 'react'
import * as gtag from '@/src/lib/gtag'

export const useEngagement = (slug: string, title: string) => {
  const trackedDepths = useRef<Set<number>>(new Set())
  const startTime = useRef<number>(Date.now())
  const hasCompleted = useRef<boolean>(false)

  useEffect(() => {
    // Reset for new slug
    trackedDepths.current.clear()
    startTime.current = Date.now()
    hasCompleted.current = false

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      const scrollPercent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)

      // Track depth (25, 50, 75, 100)
      const thresholds = [25, 50, 75, 100]
      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !trackedDepths.current.has(threshold)) {
          trackedDepths.current.add(threshold)
          gtag.event('scroll_depth', {
            category: 'engagement',
            label: `${threshold}%`,
            value: slug,
          })
          
          if (threshold === 100 && !hasCompleted.current) {
            const timeElapsed = Math.round((Date.now() - startTime.current) / 1000)
            // If they reached bottom and spent at least 30s, it's a "Read Completion"
            if (timeElapsed >= 30) {
              hasCompleted.current = true
              gtag.event('read_complete', {
                category: 'engagement',
                label: title,
                value: slug,
              })
            }
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Track "Blog Read" (Initial landing + 30s)
    const readTimeout = setTimeout(() => {
      gtag.event('blog_read', {
        category: 'engagement',
        label: title,
        value: slug,
      })
    }, 30000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(readTimeout)
    }
  }, [slug, title])
}
