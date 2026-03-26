import React from 'react'
import ThemedImage from './ThemedImage'
import { TPost } from '@/src/types'

export default function PostCover({ post }: { post: TPost }) {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 mb-4">
      <div className="relative w-full aspect-[16/9] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-[8px] md:border-[10px] border-white dark:border-zinc-800 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] dark:shadow-none">
        <ThemedImage
          post={post}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
