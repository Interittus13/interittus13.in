import { TPost } from '@/src/types'

type EngagementData = TPost['engagement']
type SectionName = 'post' | 'recommended' | 'trending'

export function resolveEngagementLabel(
    engagement: EngagementData,
    section: SectionName
): string {
    if (!engagement) return 'Fresh'
    return (
        engagement.sectionLabels?.[section] ||
        engagement.globalLabel ||
        engagement.label
    )
}
