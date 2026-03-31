'use client'

import React from 'react'

interface InsightsBarProps {
  views: string
  readTime: string
  label?: string
  secondarySignal?: string
}

export default function InsightsBar({ 
  views, 
  readTime, 
  label, 
  secondarySignal 
}: InsightsBarProps) {
  const isTrending = label?.includes('Trending')
  const isTopRank = label?.includes('Top')

  return (
    <div className="relative mb-12" data-aos="fade-up">
      {/* Background Glow for Top Rank */}
      {isTopRank && (
        <div className="absolute -inset-4 bg-orange-500/5 blur-2xl rounded-[3rem] -z-10 animate-pulse" />
      )}

      <div className="flex flex-col md:flex-row items-center gap-6 p-1.5 md:p-2 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-3xl border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] shadow-xl shadow-zinc-200/20 dark:shadow-none">
        
        {/* Primary Signal Badge */}
        {(label || isTrending) && (
          <div className="flex items-center gap-3 pl-6 pr-4 py-3 md:py-4">
            <div className="relative">
              <span className="text-2xl animate-bounce-slow inline-block">
                {isTopRank ? '🏆' : isTrending ? '🔥' : '✨'}
              </span>
              {isTrending && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[0.6rem] font-black text-orange-500 uppercase tracking-[0.2em] leading-none mb-1">
                {isTrending ? 'Social Momentum' : isTopRank ? 'Reader Choice' : 'Fresh Insight'}
              </span>
              <span className="text-sm font-black text-zinc-900 dark:text-zinc-100 tracking-tight whitespace-nowrap">
                {label}
              </span>
            </div>
          </div>
        )}

        {/* Separator */}
        <div className="hidden md:block h-8 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />

        {/* Stats Section */}
        <div className="flex-1 flex items-center justify-center md:justify-start gap-8 px-8 py-4 md:py-2">
          {/* Views */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.65rem] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none mb-1">
                Engagement
              </span>
              <span className="text-sm font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                {views} reads
              </span>
            </div>
          </div>

          {/* Time Spent */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.65rem] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none mb-1">
                Reading Time
              </span>
              <span className="text-sm font-black text-zinc-900 dark:text-zinc-100 tracking-tight lowercase">
                {readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Secondary Signal */}
        {secondarySignal && (
          <div className="hidden lg:flex items-center gap-2 pr-10">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            <span className="text-[0.6rem] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
              {secondarySignal}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
