import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import type { GetStaticProps, NextPage } from 'next'
import PostList from '@/src/components/post/PostList'
import { WidgetMeMedium, WidgetMeSmall } from '@/src/components/widgets/MeWidget'
import ListLayout from '@/src/components/layout/ListLayout'
import {
  WidgetOverViewMedium,
  WidgetOverViewSmall,
} from '@/src/components/widgets/WidgetOverview'
import { Media, MediaContextProvider } from '@/src/components/ui/Breakpoints'
import { me } from '@/src/config/me'
import { getPosts } from '@/src/lib/apis'
import { CONFIG } from '@/src/config/blog'
import { filterPosts } from '@/src/lib/apis/filterPosts'
import { TPost } from '../types'

interface HomeProps {
  posts: TPost[]
}

// Home Page Component
const Home: NextPage<HomeProps> = ({ posts }) => {
  const router = useRouter()
  const { locale } = router

  const mainPosts = posts.slice(0, 17)
  const description = `Welcome to ${me.nickname}'s blog!`

  return (
    <>
      <NextSeo
        title={`${CONFIG.BLOG_TITLE}`}
        description={description}
        canonical={router.asPath}
        openGraph={{
          title: `${CONFIG.BLOG_TITLE}`,
          description,
          locale,
          type: 'website',
          url: router.asPath,
          // images: [featuredImage],
        }}
      />

      <ListLayout>
        <MediaContextProvider>
          <Media
            greaterThanOrEqual="md"
            className="grid grid-cols-2 gap-6.5 lg:gap-10"
          >
            <WidgetMeMedium />
            <WidgetOverViewMedium posts={posts} />
          </Media>
          <Media lessThan="md" className="grid grid-cols-2 gap-4">
            <WidgetMeSmall />
            <WidgetOverViewSmall posts={posts} />
          </Media>
        </MediaContextProvider>
      </ListLayout>
      <PostList posts={mainPosts} />
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = await getPosts()
  const filteredPosts = filterPosts(posts)
  // TODO: blur
  /*
  for (let post of db) {
    if (post) {
      try {
        post.cover.blurLight = (
          await getPlaiceholder(post.cover.light, {
            size: 10,
          })
        ).base64
        post.cover.blurDark = (
          await getPlaiceholder(post.cover.dark, {
            size: 10,
          })
        ).base64
      } catch (e) {
        post.cover.blurLight = ''
        post.cover.blurDark = ''
      }
    }
  }
  */

  return {
    props: {
      posts: filteredPosts,
    },
    revalidate: 60 * 60,
  }
}

export default Home
