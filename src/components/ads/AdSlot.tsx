'use client'

import { useEffect } from 'react'
import { ADS_CONFIG, shouldRenderAds } from '@/src/config/blog'

declare global {
    interface Window {
        adsbygoogle?: unknown[]
    }
}

interface AdSlotProps {
    slot: keyof typeof ADS_CONFIG.slots
    className?: string
}

export default function AdSlot({ slot, className }: AdSlotProps) {
    const slotId = ADS_CONFIG.slots[slot]

    useEffect(() => {
        if (!shouldRenderAds || !slotId) return
        try {
            ; (window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch {
            // no-op in environments where ads script is blocked
        }
    }, [slotId])

    if (!shouldRenderAds || !slotId) return null

    return (
        <aside className={className} aria-label="Sponsored">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-2">
                Sponsored
            </p>
            <ins
                className="adsbygoogle block w-full min-h-[120px] rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/40"
                style={{ display: 'block' }}
                data-ad-client={ADS_CONFIG.clientId}
                data-ad-slot={slotId}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </aside>
    )
}
