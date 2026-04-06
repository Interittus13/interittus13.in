import React from 'react'
import Link from 'next/link'
import { TPost } from '@/src/types'
import { resolveEngagementLabel } from '@/src/lib/engagementLabels'
import { getCategoryTextColor } from '@/src/lib/utils/categoryColors'
import FormattedDate from '@/src/components/ui/FormattedDate'

export default function PostHero({ post }: { post: TPost }) {
  const category = post.category?.[0]
  const categoryColor = category
    ? getCategoryTextColor(category)
    : undefined

  return (
    <header className="max-w-4xl mx-auto px-5 md:px-8 pt-32 md:pt-40 pb-8">
      {/* Primary post metadata only (no engagement duplicates) */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        {category && (
          <Link
            href={`/category/${category}`}
            className={`text-[0.65rem] font-black uppercase tracking-[0.3em] ${categoryColor} px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800/60 rounded-full transition-all hover:scale-105 active:scale-95`}
          >
            {category}
          </Link>
        )}
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <FormattedDate
          date={post.date.start_date}
          className="text-[0.65rem] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]"
        />
        {post.tags && post.tags.length > 0 && (
          <>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <span className="text-[0.65rem] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
              {post.tags.length} tag{post.tags.length > 1 ? 's' : ''}
            </span>
          </>
        )}
      </div>

      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-zinc-900 dark:text-zinc-50 leading-[0.95] mb-10 overflow-hidden">
        {post.title}
      </h1>

      {post.summary && (
        <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-3xl italic opacity-85">
          {post.summary}
        </p>
      )}

      {post.engagement && (
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className={`px-4 py-2 rounded-full text-[0.68rem] font-black uppercase tracking-[0.18em] backdrop-blur-md transition-all ${
            post.engagement.level === 'High' 
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 active:scale-95' 
              : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-white/10'
          }`}>
            {resolveEngagementLabel(post.engagement, 'post')}
          </span>
          
          {(parseInt(post.engagement.views) >= 10) && (
            <span className="px-4 py-2 rounded-full bg-zinc-50/50 dark:bg-white/5 border border-zinc-200/20 dark:border-white/5 text-zinc-400 dark:text-zinc-500 text-[0.65rem] font-bold uppercase tracking-[0.12em] backdrop-blur-sm">
              {post.engagement.views} reads
            </span>
          )}

          <span className="px-4 py-2 rounded-full bg-zinc-50/50 dark:bg-white/5 border border-zinc-200/20 dark:border-white/5 text-zinc-400 dark:text-zinc-500 text-[0.65rem] font-bold uppercase tracking-[0.12em] backdrop-blur-sm">
            {post.engagement.readTime}
          </span>
        </div>
      )}
    </header>
  )
}
