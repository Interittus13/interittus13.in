'use client'

import { useEngagement } from '@/src/hooks/useEngagement'

export const EngagementTracker = ({ slug, title }: { slug: string; title: string }) => {
  useEngagement(slug, title)
  return null
}
