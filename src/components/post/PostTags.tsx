import React from 'react'
import Link from 'next/link'

export default function PostTags({ tags }: { tags: string[] }) {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 mt-12 pt-10 border-t border-zinc-100 dark:border-zinc-800/50">
      <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Tagged</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="px-5 py-2.5 rounded-2xl bg-zinc-100/60 dark:bg-zinc-800/60 text-[0.65rem] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-orange-500 hover:bg-white dark:hover:bg-zinc-700/80 transition-all duration-300 hover:scale-105 active:scale-95 border border-zinc-200/50 dark:border-zinc-700/50 hover:border-orange-200 dark:hover:border-orange-900/50 hover:shadow-sm"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  )
}
