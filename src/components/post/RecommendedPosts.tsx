import React from 'react'
import { TPost } from '@/src/types'
import Link from 'next/link'
import ThemedImage from './ThemedImage'
import { getCategoryTextColor } from '@/src/lib/utils/categoryColors'
import { resolveEngagementLabel } from '@/src/lib/engagementLabels'

interface RecommendedPostsProps {
  posts: TPost[]
}

export const RecommendedPosts: React.FC<RecommendedPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <section className="mt-32 pt-20 border-t border-zinc-100 dark:border-zinc-800/50" data-aos="fade-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-2">
          <span className="text-[0.6rem] font-black text-orange-500 uppercase tracking-[0.4em] mb-1">
            Intelligent Discovery
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 italic">
            Recommended <span className="text-orange-500">Reading</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-xs font-bold italic">
          <span>Based on your interests and reader momentum</span>
          <span className="text-orange-500">✨</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => {
          const category = post.category?.[0] || 'Other'
          const categoryColor = getCategoryTextColor(category)
          const engagement = post.engagement

          return (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="group relative flex flex-col bg-white dark:bg-zinc-900/50 rounded-[2.5rem] overflow-hidden border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl shadow-zinc-200/40"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <ThemedImage
                  post={post}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Floating V3 Badge (Compact) */}
                {engagement && resolveEngagementLabel(engagement, 'recommended') !== 'Fresh 🆕' && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl flex items-center gap-1.5 shadow-lg">
                      <span className="text-[0.55rem] font-black text-white uppercase tracking-wider whitespace-nowrap">
                        {resolveEngagementLabel(engagement, 'recommended')}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[0.6rem] font-black uppercase tracking-[0.2em] ${categoryColor}`}>
                    {category}
                  </span>
                  {engagement && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                      <span className="text-[0.6rem] font-bold text-zinc-400 dark:text-zinc-500 tracking-tight">
                        {engagement.views} reads
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500 transition-colors duration-500 line-clamp-2 leading-tight mb-3">
                  {post.title}
                </h3>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                  {post.summary}
                </p>

                <div className="mt-6 flex items-center text-[0.65rem] font-black uppercase tracking-widest text-zinc-400 group-hover:text-orange-500 transition-all group-hover:translate-x-1">
                  Read Article
                  <svg className="ml-2 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
