import { getPosts } from '@/src/lib/apis'
import { filterPosts } from '@/src/lib/apis/filterPosts'
import PostInfiniteList from '@/src/components/post/PostInfiniteList'
import { WidgetMeMedium, WidgetMeSmall } from '@/src/components/widgets/MeWidget'
import { WidgetOverViewMedium, WidgetOverViewSmall } from '@/src/components/widgets/WidgetOverview'
import ListLayout from '@/src/components/layout/ListLayout'

export default async function HomePage() {
  const posts = await getPosts()
  const filteredPosts = filterPosts(posts)

  return (
    <main className="min-h-screen">
      <ListLayout>
        <div className="flex flex-col gap-12 py-10">
          {/* Widgets Section */}
          <section className="grid md:grid-cols-2 gap-8 lg:gap-12 w-full">
            <WidgetMeMedium />
            <WidgetOverViewMedium posts={filteredPosts} />
          </section>

          {/* Posts Section */}
          <section className="w-full">
            <PostInfiniteList initialPosts={filteredPosts} />
          </section>
        </div>
      </ListLayout>
    </main>
  )
}
