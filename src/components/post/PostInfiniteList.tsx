'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import useSWRInfinite from 'swr/infinite'
import { useInView } from 'react-intersection-observer'
import { TPost } from '@/src/types'
import { getCategoryTextColor } from '@/src/lib/utils/categoryColors'
import FormattedDate from '@/src/components/ui/FormattedDate'
import ThemedImage from './ThemedImage'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const PAGE_SIZE = 10

export default function PostInfiniteList({ 
  initialPosts, 
  category, 
  tag 
}: { 
  initialPosts: TPost[], 
  category?: string, 
  tag?: string 
}) {
  const { ref, inView } = useInView()

  const { data, size, setSize, isValidating } = useSWRInfinite(
    (index) => {
      let url = `/api/posts?cursor=${index * PAGE_SIZE}&limit=${PAGE_SIZE}`
      if (category) url += `&category=${encodeURIComponent(category)}`
      if (tag) url += `&tag=${encodeURIComponent(tag)}`
      return url
    },
    fetcher,
    {
      fallbackData: [{ posts: initialPosts, nextCursor: PAGE_SIZE }],
      revalidateFirstPage: false,
    }
  )

  const posts = data ? data.flatMap((page) => page.posts || []) : initialPosts
  const isLoadingMore =
    isValidating || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isReachingEnd = data && (data[data.length - 1]?.posts?.length < PAGE_SIZE || data[data.length - 1]?.nextCursor === null)

  useEffect(() => {
    if (inView && !isReachingEnd && !isLoadingMore) {
      setSize(size + 1)
    }
  }, [inView, isReachingEnd, isLoadingMore, size, setSize])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10">
        {posts.map((post, index) => {
          const postCategory = post.category?.[0] || 'Other'
          const categoryColor = getCategoryTextColor(postCategory)

          // Dynamic grid pattern calculation
          const patternIndex = index % 6
          let colSpan = 'md:col-span-4' // Default: 3 per row (1/3)
          let imageHeight = 'h-64'

          if (patternIndex === 0) {
            colSpan = 'md:col-span-12' // Full width
            imageHeight = 'h-80 md:h-[400px]'
          } else if (patternIndex === 1 || patternIndex === 2) {
            colSpan = 'md:col-span-6' // Half width
            imageHeight = 'h-72'
          }

          return (
            <div
              key={post.id}
              className={`group relative flex flex-col bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-zinc-200/50 dark:shadow-none transition-all duration-700 hover:scale-[1.03] active:scale-[0.97] border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 ${colSpan}`}
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100}
            >
              <Link href={`/posts/${post.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {post.title}</span>
              </Link>
              
              <div className={`relative ${imageHeight} w-full overflow-hidden`}>
                <ThemedImage
                  post={post}
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              <div className="p-8 flex flex-col flex-1 backdrop-blur-3xl bg-white/50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-[0.65rem] font-black uppercase tracking-[0.2em] ${categoryColor}`}>
                    {postCategory}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <FormattedDate 
                    date={post.date.start_date} 
                    className="text-[0.65rem] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]"
                  />
                </div>

                <h2 className="text-2xl font-black leading-tight mb-4 line-clamp-2 text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500 transition-colors duration-500">
                  {post.title}
                </h2>

                <p className="text-zinc-500 dark:text-zinc-400 line-clamp-3 text-sm leading-relaxed mb-8 font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  {post.summary}
                </p>

                <div className="mt-auto flex items-center text-zinc-900 dark:text-zinc-100 font-black text-[0.7rem] uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500">
                  Read Article
                  <svg className="ml-3 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {!isReachingEnd && (
        <div ref={ref} className="flex justify-center py-24">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-orange-500/10 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-orange-500 rounded-full animate-spin" />
          </div>
        </div>
      )}
      
      {isReachingEnd && (
        <div className="text-center py-24 text-zinc-300 dark:text-zinc-700 font-black tracking-[0.5em] uppercase text-[0.6rem] animate-fade-in">
          — End of transmission —
        </div>
      )}
    </>
  )
}
