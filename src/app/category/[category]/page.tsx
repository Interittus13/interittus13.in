import { getPosts } from '@/src/lib/apis'
import { filterPosts } from '@/src/lib/apis/filterPosts'
import PostInfiniteList from '@/src/components/post/PostInfiniteList'
import { ListLayout } from '@/src/components/layout/ListLayout'
import { getCategoryBgColor } from '@/src/lib/utils/categoryColors'
import type { Metadata } from 'next'

import { getMetadata } from '@/src/lib/utils/seo'

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: rawCategory } = await params
  const category = decodeURIComponent(rawCategory)
  return getMetadata({
    title: `${category} Articles`,
    description: `Browse all articles and technical posts in the ${category} category.`,
    url: `/category/${rawCategory}`,
  })
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: rawCategory } = await params
  const category = decodeURIComponent(rawCategory)
  const allPosts = await getPosts()
  const filteredPosts = filterPosts(allPosts)
  const categoryPosts = filteredPosts.filter(post => (post.category || []).includes(category))

  const colorClass = getCategoryBgColor(category)

  return (
    <main className="min-h-screen pt-32 pb-20">
      <ListLayout>
        {/* Header Section */}
        <header className="mb-20 text-center" data-aos="fade-up">
           <p className="text-[0.65rem] font-black uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500 mb-3">
             Browsing Category
           </p>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 mb-6">
             {category}
           </h1>
           <div className={`h-1.5 w-24 mx-auto rounded-full shadow-lg ${colorClass}`} />
        </header>

        <PostInfiniteList 
          initialPosts={categoryPosts.slice(0, 10)} 
          category={category}
        />
      </ListLayout>
    </main>
  )
}
