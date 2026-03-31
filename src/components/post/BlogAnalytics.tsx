'use client'

import { useEffect, useRef } from 'react'
import { event } from '@/src/lib/gtag'

interface BlogAnalyticsProps {
  slug: string
}

/**
 * BlogAnalytics Component
 * 
 * Handles per-post engagement tracking:
 * 1. Initial blog_view event
 * 2. Scroll depth milestones (25%, 50%, 75%, 100%)
 * 3. Completion event at 90% scroll depth
 * 4. Time spent milestones (30s, 60s, 120s)
 */
export default function BlogAnalytics({ slug }: BlogAnalyticsProps) {
  const trackedDepths = useRef<Set<number>>(new Set())
  const trackedTimes = useRef<Set<number>>(new Set())
  const hasCompleted = useRef(false)

  useEffect(() => {
    // Reset state for new slug
    trackedDepths.current.clear()
    trackedTimes.current.clear()
    hasCompleted.current = false

    // 1. Initial View Tracking
    event('blog_view', { blog_slug: slug })

    // 2. Scroll Tracking Handler
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const scrollPosition = window.scrollY
      const scrollPercent = Math.round((scrollPosition / scrollHeight) * 100)

      // Milestone Thresholds: 25, 50, 75, 100
      const milestones = [25, 50, 75, 100]
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          event(`scroll_depth_${milestone}`, {
            blog_slug: slug
          })
          trackedDepths.current.add(milestone)
        }
      })

      // Completion tracking at 90% (Realistic Completion)
      if (scrollPercent >= 90 && !hasCompleted.current) {
        event('blog_complete', { blog_slug: slug })
        hasCompleted.current = true
      }
    }

    // 3. Time-based Tracking (Heatmap Foundation)
    const timeIntervals = [30, 60, 120]
    const timers = timeIntervals.map((seconds) =>
      setTimeout(() => {
        if (!trackedTimes.current.has(seconds)) {
          event('time_spent', {
            blog_slug: slug,
            seconds: seconds,
          })
          trackedTimes.current.add(seconds)
        }
      }, seconds * 1000)
    )

    // Performance optimized scroll listener
    let scrollTimeout: NodeJS.Timeout | null = null
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll()
          scrollTimeout = null
        }, 150)
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    // Check initial state
    handleScroll()

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      timers.forEach(clearTimeout)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [slug])

  return null
}
