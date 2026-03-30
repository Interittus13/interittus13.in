import React from 'react'
import { TPost } from '@/src/types'
import Link from 'next/link'
import ThemedImage from './ThemedImage'

interface RecommendedPostsProps {
  posts: TPost[]
}

export const RecommendedPosts: React.FC<RecommendedPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <div className="mt-20 pt-20 border-t border-zinc-100 dark:border-zinc-800/50">
      <div className="flex items-center gap-3 mb-10">
        <span className="text-xl">✨</span>
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          Recommended Reading
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/posts/${post.slug}`} 
            className="group relative flex flex-col bg-zinc-50 dark:bg-zinc-800/50 rounded-[2rem] overflow-hidden hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-500"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <ThemedImage 
                post={post} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 line-clamp-2 opacity-80">
                {post.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
