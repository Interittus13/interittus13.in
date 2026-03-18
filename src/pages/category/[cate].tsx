import { GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
<<<<<<< HEAD
=======
import { getPosts } from '../../lib/apis'
import { getAllSelectItemsFromPosts } from '../../lib/apis/getAllSelectItemsFromPosts'
import { TPost } from '../../types'
import { getColorClassByName } from '../../lib/colors'
import { NextSeo } from 'next-seo'
import { CONFIG } from '../../../config/blog'
>>>>>>> d9a87f57ecf39d0c8edfc5a86eb2e6075acbfe03
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { getAllSelectItemsFromPosts } from '@/src/lib/apis/getAllSelectItemsFromPosts'
import { getColorClassByName } from '@/src/lib/utils/colors'
import { filterPosts } from '@/src/lib/apis/filterPosts'
import PostList from '@/src/components/post/PostList'
import { CONFIG } from '@/src/config/blog'
import { getPosts } from '@/src/lib/apis'
import { TPost } from '@/src/types'

interface CategoryProps {
  posts: TPost[]
  cate: {
    name: string
    count: number
  }
}

interface Params extends ParsedUrlQuery {
  cate: string
}

const CatePage: NextPage<CategoryProps> = ({ posts, cate }) => {
  const { locale, asPath } = useRouter()

  return (
    <>
      <NextSeo
        title={`${cate.name} | ${CONFIG.BLOG_TITLE}`}
        canonical={asPath}
        description={`${cate.name} posts in ${CONFIG.BLOG_TITLE}'s blog`}
        openGraph={{
          title: `${CONFIG.BLOG_TITLE}`,
          description: `${cate.name} posts in ${CONFIG.BLOG_TITLE}'s blog`,
          locale,
          type: 'website',
          url: asPath,
        }}
      />
      <PostList
        posts={posts}
        filter={cate.name}
        color={getColorClassByName(cate.name)}
        count={cate.count}
      />
    </>
  )
}

export const getStaticPaths = async () => {
  const posts = await getPosts()
  const categories = getAllSelectItemsFromPosts('category', posts)

  const paths = Object.keys(categories).map((cateName) => ({
    params: { cate: encodeURIComponent(cateName) },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<CategoryProps, Params> = async ({ params }) => {
  const cate = decodeURIComponent(params?.cate ?? '')

  const allPosts = await getPosts()
  const filteredPosts = filterPosts(allPosts)
  const categories = getAllSelectItemsFromPosts('category', filteredPosts)

  const count = categories[cate]

  if (typeof count === 'undefined') return { notFound: true }

  const cateFilteredPosts = filteredPosts.filter((post) =>
      (post.category ?? []).includes(cate)
  )

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
      posts: cateFilteredPosts,
      cate: { name: cate, count: categories[cate] },
    },
    revalidate: 60 * 60,
  }
}

export default CatePage
