import { GetStaticProps, NextPage } from 'next'
<<<<<<< HEAD
=======
import Link from 'next/link'
import { ReactElement } from 'react'
import { BlogLayoutPure } from '../components/layout/BlogLayout'
import ListLayout from '../components/layout/ListLayout'
import { Colors, getColorClassByName } from '../lib/colors'
import { NextPageWithLayout } from './_app'
import { getAllSelectItemsFromPosts } from '../lib/apis/getAllSelectItemsFromPosts'
import { getPosts } from '../lib/apis'
import { CategoriesProps, CategoryCardProps } from '../types'
import { NextSeo } from 'next-seo'
import { CONFIG } from '../../config/blog'
>>>>>>> d9a87f57ecf39d0c8edfc5a86eb2e6075acbfe03
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { getAllSelectItemsFromPosts } from '@/src/lib/apis/getAllSelectItemsFromPosts'
import { Colors, getColorClassByName } from '@/src/lib/utils/colors'
import { BlogLayoutPure } from '@/src/components/layout/BlogLayout'
import { CategoriesProps, CategoryCardProps } from '@/src/types'
import { ListLayout } from '@/src/components/layout/ListLayout'
import { filterPosts } from '@/src/lib/apis/filterPosts'
import { NextPageWithLayout } from './_app'
import { CONFIG } from '@/src/config/blog'
import { getPosts } from '@/src/lib/apis'

const CateCard: React.FC<CategoryCardProps> = ({ name, color, count }) => (
  // return (
  <Link href={`/category/${name}`} passHref>
    <div className="select-none transform transition ease-in-out duration-200 hover:scale-95">
      <div
        className={`aspect-square ${Colors[color]?.bg.msg ?? Colors['gray'].bg.msg} rounded-xl p-3 md:p-4 text-white relative z-0 font-semibold overflow-hidden
        before:content-DEFAULT before:text-transparent before:absolute before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-l before:from-white before:opacity-50 before:to-transparent before:rounded-xl
        dark:before:from-black`}
      >
        <div className="flex flex-row items-center justify-between text-normal md:text-lg lg:text-xl">
          <p className="z-20">{name}</p>
          <p className={`bg-white z-20 ${Colors[color]?.text.normal ?? Colors['gray'].text.normal} px-2 text-center rounded-full`}>
            {count}
          </p>
        </div>
        <p
          className={`px-3 py-2 md:(px-4 py-3) text-8xl md:text-8xl font-semibold absolute left-0 bottom-0  ${Colors[color]?.text.normal ?? Colors['gray'].text.normal
            } filter brightness-95 w-full whitespace-nowrap z-0`}
        >
          {name}
        </p>
      </div>
    </div>
  </Link>
)

const Cates: NextPage<CategoriesProps> = ({ categories }) => {
  const router = useRouter()

  return (
    <>
      <NextSeo
        title={`Categories | ${CONFIG.BLOG_TITLE}`}
        canonical={router.asPath}
        description={`Categories in ${CONFIG.BLOG_TITLE}'s blog`}
        openGraph={{
          title: `${CONFIG.BLOG_TITLE}`,
          description: `Categories in ${CONFIG.BLOG_TITLE}'s blog`,
          locale: router.locale,
          type: 'website',
          url: `${router.asPath}`,
        }}
      />
      <ListLayout>
        <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">
          Category🪐
        </h1>
        <div className="grid grid-cols-2 gap-3 xs:gap-5 md:gap-6 pb-4 lg:pb-8 md:grid-cols-3 lg:grid-cols-4">
          {Object.entries(categories).map(([categoryName, count]) => (
            <CateCard
              name={categoryName}
              key={categoryName}
              color={getColorClassByName(categoryName)}
              count={count}
            />
          ))}
        </div>
      </ListLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts()
  const filteredPosts = filterPosts(posts)
  const categories = getAllSelectItemsFromPosts('category', filteredPosts)

  return {
    props: {
      categories,
    },
    revalidate: 60 * 60,
  }
}
  ; (Cates as NextPageWithLayout).getLayout = function getLayout(page: ReactElement) {
    return <BlogLayoutPure>{page}</BlogLayoutPure>
  }

export default Cates
