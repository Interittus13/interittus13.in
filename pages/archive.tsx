import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { Colors, getColorClassByName } from "../lib/colors";
import { FullListLayout } from "../components/layout/ListLayout";
import moment from "moment";
import ThemedImage from "../components/ThemedImage";
import { getPosts } from "../lib/apis";
import { TPost } from "../types";
import { NextSeo } from "next-seo";
import { CONFIG } from "../config/blog";
import { useRouter } from "next/router";
import { filterPosts } from "../lib/apis/filterPosts";
import FormattedDate from "../components/utility/FormattedDate";

// TODO: Add pagination and filter
const Archive: NextPage<{ posts: TPost[] }> = ({ posts }) => {
  const router = useRouter()
  const { locale } = router

  const postYears = posts.map((post) =>
    moment(post.date.start_date).format("YYYY")
  )

  return (
    <>
      {/* SEO Metadata */}
      <NextSeo
        title={`Archive | ${CONFIG.BLOG_TITLE}`}
        canonical={router.asPath}
        description={`archive in ${CONFIG.BLOG_TITLE}'s blog`}
        openGraph={{
          title: `${CONFIG.BLOG_TITLE}`,
          description: `archive in ${CONFIG.BLOG_TITLE}'s blog`,
          locale,
          type: "website",
          url: `${router.asPath}`,
        }}
      />

      {/* Main Layout */}
      <FullListLayout>
        <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">
          Archive 📡
        </h1>
        <ul className="flex flex-row flex-wrap items-stretch">
          {posts.map((post, index) => {
            const currentYear = postYears[index]
            const perviousYear = postYears[index - 1]

            const category = post.category?.[0] || 'Uncategorized'
            const colorClass = Colors[getColorClassByName(category)].text.normal

            return (
              <li
                className="relative mb-8 w-full group before:content-[''] before:block before:h-px before:bg-true-gray-200 before:mb-8"
                key={post.id}
              >
                {/* <div className="w-full" key={post.id}> */}
                {index === 0 || currentYear !== perviousYear ? (
                  // <div className="w-full">
                  <p className={`block text-[28px] font-semibold ${index !== 0 ? "mt-13" : ""} mb-4`}>
                    {currentYear}
                  </p>
                ) : null}

                {/* Post Item */}
                <Link href={`/posts/${post.slug}`} passHref>
                  <div className="flex flex-col md:flex-row lg:items-center gap-4">
                    {/* Post Image */}
                    <div className="aspect-square md:aspect-video h-26 md:h-37 lg:h-41.5 rounded-2xl overflow-hidden shrink-0">
                      <div className={`relative duration-500 ease-in-out filter group-hover:brightness-90 transition w-full h-full rounded-2xl overflow-hidden transform rotate-0`}>
                        <ThemedImage
                          post={post}
                          quality={80}
                          className="transition-all duration-500 ease-in-out opacity-100 mobile-hover:group-hover:scale-105 group-hover:rotate-0 group-hover:active:scale-105 group-hover:opacity-90 transform-gpu rounded-2xl overflow-hidden"
                        />
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="pl-4 md:pl-8 flex-grow">
                      <Link href={`/category/${category}`} passHref>
                        <p className={`inline-block mb-2 text-xs font-bold text-true-gray-600 leading-2 ${colorClass}`}>
                          {category}
                        </p>
                      </Link>

                      <p className="font-semibold line-clamp-3 text-lg leading-5 md:text-xl lg:text-2xl mt-1 md:mt-2">
                        {post.title}
                      </p>
                      <FormattedDate date={post.date.start_date}/>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </FullListLayout >
    </>
  )
}

// Static Site Generation with Revalidation
export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  const filteredPosts = filterPosts(posts);

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
  };
};

export default Archive;
