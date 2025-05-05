import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import ContentLayout, { CoverLayout } from '../../components/layout/ContentLayout'
import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import { BlogLayoutWhite } from '../../components/layout/BlogLayout'
import type { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import Moment from 'react-moment'
import Link from 'next/link'
import { Colors, getColorClassByName } from '../../lib/colors'
import { Share } from '../../components/Share'
import TagsIcon from '../../assets/tags.svg'
import Pagination from '../../components/Pagination'
import Comment from '../../components/Comment'
import { WidgetMeMedium, WidgetMeSmall } from '../../components/widget/WidgetMe'
import { WidgetOverViewMedium, WidgetOverViewSmall } from '../../components/widget/WidgetOverview'
import ThemedImage from '../../components/ThemedImage'
import PostSeo from '../../components/PostSeo'
import { useRouter } from 'next/router'
import { getPostBlocks, getPosts } from '../../lib/apis'
import { TPost } from '../../types'
import { filterPosts } from '../../lib/apis/filterPosts'
import { ExtendedRecordMap } from 'notion-types'
import readingTime from 'reading-time'
import dynamic from 'next/dynamic'

const ContentRenderer = dynamic(
  () => import('../../components/ContentRenderer'),
  { ssr: false }
)

interface PostPageProps {
  post: TPost
  posts: TPost[]
  recordMap: ExtendedRecordMap
  pagination: {
    prev: TPost | null
    next: TPost | null
  }
}

const PostPage: NextPage<PostPageProps> = ({ post, recordMap, pagination, posts }) => {
  const router = useRouter()
  const { locale } = router

  // setToc(blocks)
  if (!post || !recordMap) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  // Calculate estimated reading time
  const estimatedReadingTime = readingTime(
    Object.values(recordMap.block)
      .map((b) => b?.value?.properties?.title?.flat())
      .flat()
      .join('')
  ).text

  return (
    <>
      <PostSeo
        title={post.title}
        description={post.summary || ''}
        date={new Date(post.date.start_date)}
        image={post.thumbnail || ''}
        locale={locale || ''}
        url={router.asPath}
      // TODO: check if this is correct
      />

      {/* Post Header */}
      <ContentLayout>
        <header className="flex flex-col text-left break-word" data-aos="fade-down">
          <div className="mt-3 md:mt-6">
            {post.category?.[0] && (
              <Link href={`/category/${post.category?.[0]}`}>
                <p
                  className={`inline-block mb-2 text-xs font-bold text-true-gray-600 leading-2 ${Colors[getColorClassByName(post.category?.[0])].text.normal
                    } `}
                >
                  {post.category?.[0]}
                </p>
              </Link>
            )}
            <div className="flex flex-row items-center mt-2 space-x-2 text-sm font-semibold text-true-gray-600 dark:text-true-gray-400">
              <Moment date={post.date} fromNow format="DD MMM yyyy" local />
              <span>·</span>
              <span>{estimatedReadingTime}</span>
              <span>·</span>
              <span id="twikoo_visitors" className="animate-pulse">-</span> Views
            </div>
          </div>

          <h1
            className={`my-6 text-4xl font-bold whitespace-pre-wrap lg:text-5xl ${post.title && post.category ? `${Colors[getColorClassByName(post.category?.[0])]?.bg.gradient} bg-gradient-to-r text-transparent bg-clip-text` : '' // TODO: default 를 category 에 따라 색상 변경
              // ''
              } relative z-0`}
          >
            {post.title}
          </h1>
          {post.summary && (
            <p className="mb-4 text-xl font-medium text-true-gray-600 lg:text-2xl" dark="text-true-gray-400">
              {post.summary}
            </p>
          )}
          <Share />
        </header>
      </ContentLayout>

      {/* Cover Image */}
      <CoverLayout>
        <div
          className="relative w-full h-full md:rounded-3xl"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <ThemedImage
            className="z-0 overflow-hidden transition-all duration-500 ease-in-out md:rounded-3xl"
            post={post}
          />
        </div>
      </CoverLayout>

      {/* Notion Content */}
      <ContentLayout>
        {/* <FrontMessage post={page} /> */}
        {/* {blocks.map((block) => {
          return <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
        })} */}
        <ContentRenderer recordMap={recordMap} />
        <div
          className={`flex flex-col mt-8 justify-between ${post.thumbnail ? 'md:flex-row md:items-center' : ''
            } gap-4 w-full`}
        >
          {/* Tags */}
          {post.tags && (
            <div className="flex flex-wrap items-center gap-2 overflow-scroll scrollbar-hide">
              <TagsIcon />
              {post.tags?.map((tagName: any) => (
                <Link key={tagName} href={`/tags/${tagName}`}>
                  <div
                    className={`${Colors[getColorClassByName(tagName)].bg.msg
                      } bg-gradient-to-bl from-white/20 text-white flex items-center text-xs py-1 px-2  rounded-full whitespace-nowrap`}
                    dark="bg-gradient-to-br to-black/10"
                  >
                    {tagName}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </ContentLayout >

      {/* Pagiantion */}
      <ContentLayout>
        {/* <Licensing page={page} data-aos="fade-up" data-aos-duration="500" /> */}
        <Pagination
          pagination={pagination}
          data-aos="fade-up"
          data-aos-duration="500"
        ></Pagination>
      </ContentLayout >

      {/* Widgets */}
      < ContentLayout >
        <div className="hidden grid-cols-2 gap-4 sm:grid md:grid-cols-2">
          <WidgetMeMedium fix={true} />
          <WidgetOverViewMedium posts={posts} fix={true} />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:hidden md:grid-cols-2">
          <WidgetMeSmall />
          <WidgetOverViewSmall posts={posts} />
        </div>
      </ContentLayout >

      {/* Comment Section */}
      < ContentLayout >
        <Comment />
      </ContentLayout >
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()
  const filteredPosts = filterPosts(posts)

  return {
    paths: filteredPosts.map((p) => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  }
}

interface Props extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const { slug } = params as Props

  const posts = await getPosts()
  const filteredPosts = filterPosts(posts)

  const pageIndex = filteredPosts.findIndex((p) => p.slug === slug)
  const post = filteredPosts[pageIndex]

  if (!post?.id) {
    return {
      props: {} as never,
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const recordMap = await getPostBlocks(post.id)

  // TODO: blur
  /*
  if (prev) {
    prev?.thumbnail.blur = (
      await getPlaiceholder(prev?.thumbnail, {
        size: 10,
      })
    ).base64
  }

  if (next) {
    next?.thumbnail.blur = (
      await getPlaiceholder(next?.thumbnail, {
        size: 10,
      })
    ).base64
  }
  */

  const pagination = {
    prev: pageIndex > 0 ? filteredPosts[pageIndex - 1] : null,
    next: pageIndex + 1 < filteredPosts.length ? filteredPosts[pageIndex + 1] : null,
  }

  return {
    props: { posts: filteredPosts, post, pagination, recordMap },
    revalidate: 60 * 60,
  }
}

// Set Page Layout
(PostPage as NextPageWithLayout).getLayout = function getLayout(page: ReactElement) {
  return <BlogLayoutWhite>{page}</BlogLayoutWhite>
}

export default PostPage
