import { getPosts } from '@/src/lib/apis'
import { filterPosts } from '@/src/lib/apis/filterPosts'
import { getAllSelectItemsFromPosts } from '@/src/lib/apis/getAllSelectItemsFromPosts'
import { ListLayout } from '@/src/components/layout/ListLayout'
import { Colors, getColorClassByName } from '@/src/lib/utils/colors'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Explore articles by technical keywords and hashtags.',
}

export default async function TagsPage() {
  const posts = await getPosts()
  const filteredPosts = filterPosts(posts)
  const tags = getAllSelectItemsFromPosts('tags', filteredPosts)

  return (
    <ListLayout>
      <main className="pt-32 pb-20">
        {/* Header Section */}
        <header className="mb-20 text-center" data-aos="fade-up">
           <p className="text-[0.65rem] font-black uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500 mb-3">
             Discovery
           </p>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 mb-6">
             Tags <span className="text-pink-500">✨</span>
           </h1>
           <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-rose-400 mx-auto rounded-full shadow-lg shadow-pink-500/30" />
        </header>

        {/* Tags Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(tags).map(([tagName, count], index) => {
            const color = getColorClassByName(tagName)
            const colorClass = Colors[color]?.bg.msg || Colors['gray'].bg.msg
            const textColor = Colors[color]?.text.normal || Colors['gray'].text.normal

            return (
              <Link
                key={tagName}
                href={`/tags/${tagName}`}
                className="group relative flex items-center justify-between p-7 rounded-[2.5rem] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl border border-white/40 dark:border-zinc-800 transition-all duration-700 hover:scale-[1.05] active:scale-[0.95] overflow-hidden shadow-2xl shadow-zinc-200/40 dark:shadow-none hover:shadow-3xl"
                data-aos="fade-up"
                data-aos-delay={(index % 4) * 50}
              >
                {/* Background Decor */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 bg-gradient-to-br ${colorClass}`} />
                
                {/* Tag Content */}
                <div className="relative z-10 flex flex-col">
                   <span className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mb-1 opacity-70">Tag</span>
                   <span className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight group-hover:text-orange-500 transition-colors duration-500">
                     # {tagName}
                   </span>
                </div>
                
                <div className={`relative z-10 w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center text-sm font-black ${textColor} shadow-xl border border-zinc-50 dark:border-zinc-700`}>
                  {count}
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </ListLayout>
  )
}
