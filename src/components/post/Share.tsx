'use client'

import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { SiX, SiLinkedin, SiWhatsapp, SiReddit, SiTelegram } from '@icons-pack/react-simple-icons'
import { me } from '@/src/config/me'

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

type ShareButtonProps = {
  name: string
  icon: React.ReactNode
  color: string
  hoverBg: string
  action: () => void
}

/**
 * Social Media Share component with direct intents and floating UI.
 */
export const Share = () => {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const [origin, setOrigin] = useState('')

  useEffect(() => {
    setOrigin(window.location.origin)
    const handleScroll = () => setScrolled(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const shareUrl = useMemo(() => (origin || me.site) + pathname, [pathname, origin])
  const shareText = "Check out this post on interittus.in!"

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [shareUrl])

  const shareButtons: ShareButtonProps[] = useMemo(() => [
    {
      name: "Copy Link",
      icon: copied ? <CheckIcon /> : <LinkIcon />,
      color: copied ? "text-emerald-500" : "text-zinc-500 hover:text-orange-500",
      hoverBg: copied ? "bg-emerald-500/10" : "hover:bg-orange-500/10",
      action: handleCopy,
    },
    {
      name: "X",
      icon: <SiX size={18} />,
      color: "text-zinc-500 hover:text-zinc-900 dark:hover:text-white",
      hoverBg: "hover:bg-zinc-900/10 dark:hover:bg-white/10",
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank'),
    },
    {
      name: "LinkedIn",
      icon: <SiLinkedin size={18} />,
      color: "text-zinc-500 hover:text-[#0077b5]",
      hoverBg: "hover:bg-[#0077b5]/10",
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank'),
    },
    {
      name: "WhatsApp",
      icon: <SiWhatsapp size={18} />,
      color: "text-zinc-500 hover:text-[#25D366]",
      hoverBg: "hover:bg-[#25D366]/10",
      action: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank'),
    },
    {
      name: "Reddit",
      icon: <SiReddit size={18} />,
      color: "text-zinc-500 hover:text-[#FF4500]",
      hoverBg: "hover:bg-[#FF4500]/10",
      action: () => window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`, '_blank'),
    },
    {
      name: "Telegram",
      icon: <SiTelegram size={18} />,
      color: "text-zinc-500 hover:text-[#0088cc]",
      hoverBg: "hover:bg-[#0088cc]/10",
      action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank'),
    },
  ], [handleCopy, shareUrl, copied])

  return (
    <div className="relative">
      {/* Standard Mobile/Bottom Row */}
      <div className="flex items-center gap-2 flex-wrap">
        {shareButtons.map((share) => (
          <button
            key={share.name}
            onClick={share.action}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${share.color} ${share.hoverBg} active:scale-90`}
            aria-label={`Share on ${share.name}`}
            title={`Share on ${share.name}`}
          >
            {share.icon}
          </button>
        ))}
        {/* Horizontal Feedback */}
        <div className={`ml-2 px-3 py-1 rounded-full bg-orange-500 text-white text-[0.6rem] font-black uppercase tracking-widest transition-all duration-500 ${copied ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}`}>
          Copied
        </div>
      </div>

      {/* Floating Desktop Sidebar */}
      <div
        className={`fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 p-3 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl transition-all duration-700 z-[100] ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20 pointer-events-none'}`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mx-auto mb-2 animate-pulse" />

        {/* Floating Feedback */}
        <div className={`absolute -right-16 top-0 px-3 py-1.5 rounded-xl bg-orange-500 text-white text-[0.6rem] font-black uppercase tracking-widest shadow-lg transition-all duration-500 ${copied ? 'opacity-100 translate-x-0 scale-100 mr-2' : 'opacity-0 translate-x-4 scale-90 pointer-events-none'}`}>
          Copied!
        </div>

        {shareButtons.map((share) => (
          <button
            key={`sticky-${share.name}`}
            onClick={share.action}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${share.color} ${share.hoverBg} hover:scale-110 active:scale-90 shadow-sm`}
            aria-label={`Share on ${share.name}`}
            title={`Share on ${share.name}`}
          >
            {share.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
