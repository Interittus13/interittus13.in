'use client'

import { useTheme } from 'next-themes'
import { useMounted } from '../../hooks/useMounted'

const ICONS = {
  light: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  ),
  dark: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  system: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
}

const themes = ['light', 'dark', 'system'] as const

export default function ThemeSwitch() {
  const mounted = useMounted()
  const { theme, setTheme } = useTheme()

  // Show a skeleton group until mounted (avoids hydration flicker AND keeps layout stable)
  if (!mounted) {
    return (
      <div className="flex p-1 gap-1 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200/20 dark:border-zinc-700/20 animate-pulse">
        {themes.map((t) => (
          <div key={t} className="px-3 py-1.5 rounded-xl w-10 h-6 bg-zinc-200/60 dark:bg-zinc-700/60" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex p-1 gap-1 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200/20 dark:border-zinc-700/20">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          title={t.charAt(0).toUpperCase() + t.slice(1)}
          aria-label={`Switch to ${t} theme`}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[0.6rem] font-black uppercase tracking-widest transition-all duration-500 ${
            theme === t
              ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-lg'
              : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
          }`}
        >
          {ICONS[t]}
          <span className="hidden sm:inline">{t}</span>
        </button>
      ))}
    </div>
  )
}