import { getPosts } from '@/src/lib/apis'
import { filterPosts } from '@/src/lib/apis/filterPosts'
import PostInfiniteList from '@/src/components/post/PostInfiniteList'
import { ListLayout } from '@/src/components/layout/ListLayout'

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params
  const tag = decodeURIComponent(rawTag)
  return {
    title: `#${tag} Posts`,
  }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params
  const tag = decodeURIComponent(rawTag)
  const allPosts = await getPosts()
  const filteredPosts = filterPosts(allPosts)
  const tagPosts = filteredPosts.filter(post => (post.tags || []).includes(tag))

  return (
    <main className="min-h-screen pt-20">
      <ListLayout>
        <div className="mb-12" data-aos="fade-up">
           <span className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2 block">Browsing Tag</span>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
             # {tag}
           </h1>
           <div className="h-1.5 w-24 bg-pink-500 rounded-full mt-4" />
        </div>
      </ListLayout>

      <PostInfiniteList 
        initialPosts={tagPosts.slice(0, 10)} 
        tag={tag}
      />
    </main>
  )
}
