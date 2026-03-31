import React from 'react'
import Link from 'next/link'
import { TPost } from '@/src/types'
import { getCategoryTextColor } from '@/src/lib/utils/categoryColors'

interface TrendingSectionProps {
  posts: TPost[]
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ posts }) => {
  // 1. Trending: Use momentum/velocity. 
  // Fallback to top weekly performance if no explicit 'Trending' labels meet the strict threshold.
  let trendingPosts = [...posts]
    .filter(p => p.engagement?.label?.includes('Trending') || p.engagement?.label?.includes('Top'))
  
  if (trendingPosts.length === 0) {
    trendingPosts = [...posts]
      .filter(p => (p.metrics?.weeklyViews || 0) > 0)
      .sort((a, b) => (b.metrics?.weeklyViews || 0) - (a.metrics?.weeklyViews || 0))
  }
  
  trendingPosts = trendingPosts.slice(0, 3)

  // 2. Hall of Fame: Highest overall total performance
  const topAllTime = [...posts]
    .filter(p => (p.metrics?.totalViews || 0) > 0)
    .sort((a, b) => (b.metrics?.totalViews || 0) - (a.metrics?.totalViews || 0))
    .slice(0, 5)

  if (trendingPosts.length === 0 && topAllTime.length === 0) return null

  return (
    <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12" data-aos="fade-up">
      {/* Trending Block */}
      <div className="lg:col-span-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-2xl animate-bounce-slow inline-block">🔥</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 italic">
              Trending <span className="text-orange-500">Now</span>
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-100 to-transparent dark:from-zinc-800 ml-6 hidden md:block" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingPosts.map((post, i) => (
            <Link 
              key={post.id} 
              href={`/posts/${post.slug}`}
              className={`group relative p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-none border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-700 overflow-hidden ${i === 0 ? 'md:col-span-2' : ''}`}
            >
              <div className="relative z-20">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[0.6rem] font-black uppercase tracking-[0.2em] ${getCategoryTextColor(post.category?.[0] || 'Other')}`}>
                    {post.category?.[0]}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <span className="text-[0.6rem] font-black text-orange-500 uppercase tracking-widest">
                    {post.engagement?.label || 'Trending'}
                  </span>
                </div>
                <h3 className={`font-black text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500 transition-colors duration-500 leading-tight mb-4 ${i === 0 ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl'}`}>
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-[0.65rem] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +{post.metrics?.weeklyViews?.toLocaleString()} reads this week
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                <span className="text-[12rem] font-black italic select-none">0{i + 1}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top 5 Hall of Fame */}
      <div className="lg:col-span-4">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl animate-pulse">🏅</span>
          <h2 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 italic">
            Hall of <span className="text-orange-500">Fame</span>
          </h2>
        </div>

        <div className="space-y-4">
          {topAllTime.map((post, i) => (
            <Link 
              key={post.id} 
              href={`/posts/${post.slug}`}
              className="flex items-center gap-5 p-5 rounded-[1.5rem] bg-zinc-50/50 dark:bg-zinc-900/50 border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800 transition-all duration-500 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center shrink-0 shadow-lg shadow-zinc-200/50 dark:shadow-none font-black text-xs text-zinc-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 italic">
                {i + 1}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-black text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-500 line-clamp-1 leading-snug">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[0.6rem] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest whitespace-nowrap">
                    {post.engagement?.views || '0'} Reads
                  </span>
                  {post.engagement?.secondarySignal && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                      <span className="text-[0.6rem] font-black text-orange-500 uppercase tracking-widest">
                        {post.engagement.secondarySignal}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
