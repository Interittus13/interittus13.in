'use client'

import { InlineShareButtons, SharingNetwork } from 'sharethis-reactjs'
import React, { useCallback, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SiX } from '@icons-pack/react-simple-icons'
import { me } from '@/src/config/me'

// Inline SVG for link icon — avoids FontAwesome SSR crash (.split on undefined)
const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

type ShareButtonProps = {
  name: string
  icon: React.ReactNode
  color: string
  action: () => void
}

/**
 * Social media share component that allows users to share the current page URL.
 */
export const Share = () => {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false)

  // Always use a memoized share URL for reliability.
  const shareUrl = useMemo(() => me.site + pathname, [pathname])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl])

  const handleShareClick = useCallback((network: string) => {
    setTimeout(() => {
      const shareButton = document.querySelector(
        `#sharethis [data-network="${network}"]`
      ) as HTMLElement | null;
      if (shareButton) shareButton.click()
      else console.error(`${network} share button not found!`);
    }, 1000);
  }, [])

  // Share Buttons configuration
  const shareButtons: ShareButtonProps[] = useMemo(() => [
    {
      name: "link",
      icon: <LinkIcon />,
      color: "hover:text-orange-400",
      action: handleCopy,
    },
    {
      name: "twitter",
      icon: <SiX size="20" />,
      color: "hover:text-blue-400",
      action: () => handleShareClick("twitter"),
    },
  ], [handleCopy, handleShareClick])

  return (
    <>
      <div id="sharethis" className="hidden">
        <InlineShareButtons
          config={{
            alignment: 'left',
            color: 'social',
            enabled: true,
            font_size: 16,
            labels: null,
            language: 'en',
            networks: shareButtons
              .filter((btn) => btn.name !== "link")
              .map((btn) => btn.name as SharingNetwork),
            url: shareUrl,
            padding: 7,
            radius: 9,
            show_total: false,
            size: 25,
          }}
        />
      </div>

      <div className="flex items-center space-x-5 text-true-gray-400 mt-4 relative">
        {shareButtons.map((share) => (
          <button
            key={share.name}
            className={`leading-0 ${share.color}`}
            onClick={share.action}
            aria-label={`Share via ${share.name === 'link' ? 'link copy' : share.name}`}
            title={share.name === 'link' ? 'Copy link' : `Share on ${share.name}`}
            type='button'
          >
            {share.icon}
          </button>
        ))}
        <p
          id="copiedNotify"
          className={`pointer-events-none transition-all duration-500 delay-100 ease-in-out ${copied ? 'opacity-100' : 'opacity-0'
            } text-sm rounded-full border-1 border-true-gray-400/10 px-2 py-1 absolute left-32`}
        >
          Copied
        </p>
      </div>
    </>
  )
}
