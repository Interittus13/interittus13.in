'use client'

import useSWRImmutable from 'swr/immutable'
import Image from 'next/image'
import { FC } from 'react'
import { ListLayout } from '@/src/components/layout/ListLayout'
import { friends, FriendType } from '@/src/config/friends'
import Comment from '@/src/components/post/Comment'
import { Colors } from '@/src/lib/utils/colors'

const previewFetcher = (url: string) =>
  fetch(`/api/bookmark/${encodeURIComponent(url)}`).then((res) => res.json())

enum Status {
  online,
  offline,
  loading,
}

const FriendCard: FC<FriendType> = (friend) => {
  const { data, error } = useSWRImmutable(friend.url, previewFetcher)
  
  const friendStatus = error ? Status.offline : (data ? Status.online : Status.loading)

  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 flex flex-col items-center justify-between transition-all duration-700 hover:scale-[1.05] active:scale-[0.95] border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 shadow-2xl shadow-zinc-200/50 dark:shadow-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-transparent dark:from-zinc-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <a href={friend.url} target="_blank" rel="noopener noreferrer" className="relative z-10 w-24 h-24 rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-700 border-4 border-white dark:border-zinc-800">
        {friendStatus === Status.loading ? (
          <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
        ) : (
          <div className="relative w-full h-full">
            <Image
              fill
              style={{ objectFit: "cover" }}
              src={friend.img}
              alt={friend.name}
              className="transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        )}
      </a>

      <div className="relative z-10 mt-6 text-center">
        <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-2 truncate max-w-[150px]">
          {friend.name}
        </h3>
        
        <div className="flex items-center justify-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse-slow ${
            friendStatus === Status.online ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]' : 
            friendStatus === Status.offline ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]' : 
            'bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.5)]'
          }`} />
          <span className="text-[0.6rem] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {friendStatus === Status.online ? 'Online' : friendStatus === Status.offline ? 'Offline' : 'Syncing'}
          </span>
        </div>
      </div>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href={friend.url}
        className={`relative z-10 mt-8 px-8 py-2.5 rounded-full font-black text-[0.6rem] uppercase tracking-widest transition-all duration-500 ${
          friendStatus === Status.online
            ? 'bg-zinc-900 text-white hover:bg-orange-500 dark:bg-white dark:text-zinc-900 dark:hover:bg-orange-500 dark:hover:text-white'
            : 'bg-zinc-100 text-zinc-400 pointer-events-none dark:bg-zinc-800 dark:text-zinc-600'
        } shadow-lg hover:shadow-xl active:scale-90`}
      >
        Visit Site
      </a>
    </div>
  )
}

export default function FriendsPage() {
  return (
    <ListLayout>
      <div className="pt-20 pb-10" data-aos="fade-up">
        <div className="mb-16">
          <span className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2 block">Inner Circle</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
            Friends <span className="text-indigo-500">👾</span>
          </h1>
          <div className="h-1.5 w-24 bg-indigo-500 rounded-full mt-4" />
          <p className="mt-8 text-xl text-zinc-500 dark:text-zinc-400 font-medium italic opacity-80 decoration-indigo-500/10 underline decoration-4 underline-offset-8">
            &quot;A rare collection of extraordinary humans I&apos;ve encountered along the digital wilderness.&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-24">
          {friends.map((friend: FriendType) => (
            <FriendCard key={friend.name} {...friend} />
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center py-20 border-t border-zinc-100 dark:border-zinc-800/50" data-aos="fade-up">
          <p className="text-[0.7rem] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12">
            Leave a transmission to join the network
          </p>
          <Comment />
        </div>
      </div>
    </ListLayout>
  )
}
