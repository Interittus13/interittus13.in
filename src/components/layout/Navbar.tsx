'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CONFIG } from '@/src/config/blog'
import ThemeSwitch from './ThemeSwitch'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { name: 'Blog', link: '/' },
  { name: 'Archive', link: '/archive' },
  { name: 'Tags', link: '/tags' },
  { name: 'Categories', link: '/categories' },
  { name: 'Me', link: '/me' },
]

export default function Navbar({ toc }: { toc?: any }) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-4 px-4 md:px-8 pointer-events-none">
        <nav
          className={`mx-auto max-w-5xl h-16 pointer-events-auto rounded-[2rem] transition-all duration-700 flex items-center justify-between px-5 md:px-8 border ${isScrolled
              ? 'bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl shadow-xl shadow-zinc-200/50 dark:shadow-none border-white/40 dark:border-zinc-800 scale-[0.98]'
              : 'bg-white/40 dark:bg-black/40 backdrop-blur-xl border-white/20 dark:border-zinc-900'
            }`}
        >
          {/* Logo */}
          <Link href="/" className="text-lg font-black tracking-tighter text-zinc-900 dark:text-zinc-100 group transition-all flex items-center gap-1.5 shrink-0">
            {CONFIG.BLOG_TITLE}
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 group-hover:animate-ping flex-shrink-0" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className={`text-[0.6rem] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-orange-500 ${pathname === item.link ? 'text-orange-500 underline underline-offset-4' : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: ThemeSwitch (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ThemeSwitch />
            </div>

            {/* Hamburger — visible below lg */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-zinc-100/70 dark:bg-zinc-800/70 text-zinc-900 dark:text-zinc-100 transition-all active:scale-90 border border-white/30 dark:border-zinc-700/50 hover:bg-zinc-200/70 dark:hover:bg-zinc-700/70"
            >
              <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer backdrop */}
      <div
        className={`fixed inset-0 z-[98] bg-black/20 dark:bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer — slides in from top */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 right-0 z-[101] lg:hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
      >
        <div className="m-4 rounded-[2.5rem] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-3xl border border-white/30 dark:border-zinc-800 shadow-2xl overflow-hidden pt-20 pb-8 px-6 relative">
          {/* Close Button inside drawer */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-white/30 dark:border-zinc-700/50 shadow-lg active:scale-90 transition-all z-50"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Nav links */}
          <nav className="space-y-2 mt-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 ${pathname === item.link
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 font-bold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 active:scale-95'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme switcher */}
          <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </>
  )
}
