import React from 'react'
import Link from 'next/link'
import { TPost } from '@/src/types'
import { getCategoryTextColor } from '@/src/lib/utils/categoryColors'

interface TrendingSectionProps {
  posts: TPost[]
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ posts }) => {
  // 1. Trending: Most read in the last 7 days
  const trendingPosts = [...posts]
    .filter(p => (p.metrics?.weeklyViews || 0) > 0)
    .sort((a, b) => (b.metrics?.weeklyViews || 0) - (a.metrics?.weeklyViews || 0))
    .slice(0, 3)

  // 2. Top All Time: Most read ever
  const topAllTime = [...posts]
    .sort((a, b) => (b.metrics?.totalViews || 0) - (a.metrics?.totalViews || 0))
    .slice(0, 5)

  if (trendingPosts.length === 0 && topAllTime.length === 0) return null

  return (
    <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Trending Block */}
      <div className="lg:col-span-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xl">🔥</span>
          <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Trending Now
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingPosts.map((post, i) => (
            <Link 
              key={post.id} 
              href={`/posts/${post.slug}`}
              className={`group relative p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-700/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-500 overflow-hidden ${i === 0 ? 'md:col-span-2' : ''}`}
            >
              <div className="relative z-10">
                <span className={`text-[0.6rem] font-black uppercase tracking-widest ${getCategoryTextColor(post.category?.[0] || 'Other')} mb-2 block`}>
                  {post.category?.[0]}
                </span>
                <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-[0.65rem] font-bold text-zinc-400">
                  <span className="flex items-center gap-1">
                    <span className="text-orange-500 font-black">📈 +{(post.metrics?.weeklyViews || 0).toLocaleString()}</span> this week
                  </span>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-6xl font-black italic">#{i + 1}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top 5 Hall of Fame */}
      <div className="lg:col-span-4">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xl">🏅</span>
          <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Top Articles
          </h2>
        </div>

        <div className="space-y-3">
          {topAllTime.map((post, i) => (
            <Link 
              key={post.id} 
              href={`/posts/${post.slug}`}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700 font-black text-xs text-zinc-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-400 transition-all">
                {i + 1}
              </div>
              <div>
                <h3 className="text-[0.85rem] font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors line-clamp-1">
                  {post.title}
                </h3>
                <span className="text-[0.6rem] font-bold text-zinc-400 uppercase tracking-widest">
                  {(post.metrics?.totalViews || 0).toLocaleString()} Views
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
