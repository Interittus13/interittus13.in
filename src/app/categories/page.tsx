import { getPosts } from '@/src/lib/apis'
import { filterPosts } from '@/src/lib/apis/filterPosts'
import { getAllSelectItemsFromPosts } from '@/src/lib/apis/getAllSelectItemsFromPosts'
import { ListLayout } from '@/src/components/layout/ListLayout'
import { getCategoryBgColor, getCategoryTextColor } from '@/src/lib/utils/categoryColors'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all blog articles sorted by their technical categories.',
}

export default async function CategoriesPage() {
  const posts = await getPosts()
  const filteredPosts = filterPosts(posts)
  const categories = getAllSelectItemsFromPosts('category', filteredPosts)

  return (
    <main className="min-h-screen pt-32 pb-20">
      <ListLayout>
        {/* Header Section */}
        <header className="mb-20 text-center" data-aos="fade-up">
           <p className="text-[0.65rem] font-black uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500 mb-3">
             Discovery
           </p>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 mb-6">
             Categories <span className="text-purple-500">🪐</span>
           </h1>
           <div className="h-1.5 w-24 bg-gradient-to-r from-purple-500 to-indigo-400 mx-auto rounded-full shadow-lg shadow-purple-500/30" />
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories).map(([categoryName, count], index) => {
            const colorClass = getCategoryBgColor(categoryName)
            const textColor = getCategoryTextColor(categoryName)

            return (
              <Link
                key={categoryName}
                href={`/category/${categoryName}`}
                className="group relative h-64 md:h-72 lg:h-80 rounded-[3rem] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl overflow-hidden border border-white/40 dark:border-zinc-800 shadow-2xl shadow-zinc-200/40 dark:shadow-none transition-all duration-700 hover:scale-[1.03] active:scale-[0.97] hover:shadow-3xl"
                data-aos="fade-up" 
                data-aos-delay={index % 3 * 100}
              >
                {/* Background Decor */}
                <div className={`absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-700 bg-gradient-to-br ${colorClass}`} />
                <div className={`absolute -right-12 -bottom-16 text-[12rem] font-black opacity-5 group-hover:opacity-10 transition-all duration-1000 group-hover:translate-x-4 group-hover:-translate-y-4 select-none ${textColor}`}>
                  {categoryName.charAt(0)}
                </div>

                {/* Card Content */}
                <div className="relative h-full p-8 md:p-10 flex flex-col justify-between z-10">
                   <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                         <span className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mb-1">Explore</span>
                         <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter group-hover:text-orange-500 transition-colors duration-500">
                           {categoryName}
                         </h3>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center text-lg font-black ${textColor} shadow-xl border border-zinc-50 dark:border-zinc-700`}>
                        {count}
                      </div>
                   </div>

                   <div className="mt-auto">
                      <div className="flex items-center text-[0.7rem] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-orange-500 transition-colors duration-500">
                         View Articles
                         <svg className="ml-3 w-4 h-4 transition-all duration-500 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                         </svg>
                      </div>
                   </div>
                </div>
              </Link>
            )
          })}
        </div>
      </ListLayout>
    </main>
  )
}
