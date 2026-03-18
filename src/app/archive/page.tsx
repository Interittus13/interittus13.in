import { getPosts } from "@/src/lib/apis"
import { filterPosts } from "@/src/lib/apis/filterPosts"
import { ListLayout } from "@/src/components/layout/ListLayout"
import moment from "moment"
import Link from "next/link"
import FormattedDate from "@/src/components/ui/FormattedDate"
import ThemedImage from "@/src/components/post/ThemedImage"
import { Colors, getColorClassByName } from "@/src/lib/utils/colors"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Explore all articles and posts by year and date.',
}

export default async function ArchivePage() {
  const posts = await getPosts()
  const filteredPosts = filterPosts(posts)

  // Group posts by year
  const postsByYear: Record<string, typeof filteredPosts> = {}
  filteredPosts.forEach((post) => {
    const year = moment(post.date.start_date).format("YYYY")
    if (!postsByYear[year]) postsByYear[year] = []
    postsByYear[year].push(post)
  })

  const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a))

  return (
    <main className="min-h-screen pt-32 pb-20">
      <ListLayout>
        {/* Header Section */}
        <header className="mb-20 text-center" data-aos="fade-up">
           <p className="text-[0.65rem] font-black uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500 mb-3">
             Timeline
           </p>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 mb-6">
             Article Archive <span className="text-orange-500">📡</span>
           </h1>
           <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-orange-500/30" />
        </header>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto relative px-4">
          {/* Vertical line connecting years */}
          <div className="absolute left-[1.125rem] top-8 bottom-0 w-px bg-zinc-100 dark:bg-zinc-800 hidden md:block" />

          {years.map((year, yearIndex) => (
            <section key={year} className="mb-20 relative last:mb-0">
               {/* Year Header */}
               <div className="flex items-center gap-6 mb-10 sticky top-24 z-20" data-aos="fade-right">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-black shadow-xl ring-8 ring-white dark:ring-black">
                     {year}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800" />
               </div>

               {/* Posts for this year */}
               <div className="flex flex-col gap-8 md:pl-16">
                  {postsByYear[year].map((post, postIndex) => {
                    const category = post.category?.[0] || 'Other'
                    const categoryColor = Colors[getColorClassByName(category)]?.text.normal

                    return (
                      <article 
                        key={post.id} 
                        className="group relative"
                        data-aos="fade-up"
                        data-aos-delay={(postIndex % 5) * 50}
                      >
                        <div className="relative bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl rounded-[2.5rem] p-5 md:p-6 border border-white/40 dark:border-zinc-800 shadow-2xl shadow-zinc-200/40 dark:shadow-none transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl">
                          <Link href={`/posts/${post.slug}`} className="flex flex-col md:flex-row gap-8 md:items-center">
                            {/* Card Image */}
                            <div className="relative aspect-video md:w-56 lg:w-64 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-700">
                              <ThemedImage
                                post={post}
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>

                            {/* Card Content */}
                            <div className="flex-1 flex flex-col justify-center">
                              <div className="flex items-center gap-3 mb-3">
                                <span className={`text-[0.65rem] font-black uppercase tracking-[0.2em] ${categoryColor}`}>
                                  {category}
                                </span>
                                <div className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                                <FormattedDate 
                                  date={post.date.start_date} 
                                  className="text-[0.65rem] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest"
                                />
                              </div>

                              <h2 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight group-hover:text-orange-500 transition-colors duration-500 line-clamp-2">
                                {post.title}
                              </h2>

                              <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed line-clamp-2 opacity-80 decoration-orange-500/10 underline decoration-2 underline-offset-4 group-hover:opacity-100 transition-opacity">
                                {post.summary}
                              </p>
                            </div>

                            {/* Chevron */}
                            <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 text-zinc-300 dark:text-zinc-600 group-hover:bg-orange-500 group-hover:text-white group-hover:border-transparent transition-all duration-500 transform group-hover:translate-x-3">
                              <svg className="w-5 h-5 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        </div>
                      </article>
                    )
                  })}
               </div>
            </section>
          ))}
        </div>
      </ListLayout>
    </main>
  )
}
