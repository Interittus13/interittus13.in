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
    trackedDepths.current.clear()
    trackedTimes.current.clear()
    hasCompleted.current = false

    event('blog_view', { blog_slug: slug })

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)
      const milestones = [25, 50, 75, 100]

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          event(`scroll_depth_${milestone}`, { blog_slug: slug })
          trackedDepths.current.add(milestone)
        }
      })

      if (scrollPercent >= 90 && !hasCompleted.current) {
        event('blog_complete', { blog_slug: slug })
        hasCompleted.current = true
      }
    }

    const timeIntervals = [30, 60, 120]
    const timers = timeIntervals.map((seconds) =>
      setTimeout(() => {
        if (document.visibilityState !== 'visible' || trackedTimes.current.has(seconds)) return

        event(`time_spent_${seconds}`, { blog_slug: slug })
        trackedTimes.current.add(seconds)
      }, seconds * 1000)
    )

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null
    const throttledScroll = () => {
      if (scrollTimeout) return
      scrollTimeout = setTimeout(() => {
        handleScroll()
        scrollTimeout = null
      }, 150)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      timers.forEach(clearTimeout)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [slug])

  return null
}
