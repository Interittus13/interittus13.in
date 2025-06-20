import Link from 'next/link'
import ListLayout from './layout/ListLayout'
import Moment from 'react-moment'
import { Colors, getColorClassByName } from '../lib/colors'
import PostMore from './PostMore'
import ThemedImage from './ThemedImage'
import { TPost } from '../types'
import FormattedDate from './utility/FormattedDate'

interface PostListProps {
  posts: TPost[]
  filter?: string
  color?: string
  count?: number
}

const PostList = ({ posts, filter, color, count }: PostListProps) => {
  const mainPosts = posts.slice(0, 9)
  const morePosts = posts.slice(9, 17)

  // Define post card layout style
  const postSize = {
    big: filter == null
      ? {
        cardSize: 'w-full col-span-6 h-117 md:(flex flex-row h-65) lg:h-90',
        imgSize: 'h-6/8 md:(h-full w-115) lg:w-160',
        title: 'line-clamp-2 text-2xl md:(text-xl leading-tight line-clamp-3) lg:text-3xl',
      }
      : {
        cardSize: 'h-90 w-full col-span-6 md:(col-span-3 h-85) lg:(h-90 col-span-6 flex flex-row)',
        imgSize: 'h-3/5 md:h-5/9 lg:(h-full w-160)',
        title: 'line-clamp-2 md:line-clamp-5 lg:line-clamp-6 text-xl leading-tight md:(text-lg leading-tight) lg:text-3xl',
      },
    medium: {
      cardSize: 'col-span-6 md:(col-span-3 h-85) h-90 lg:h-107',
      imgSize: 'h-3/5 md:h-5/9 lg:h-3/5',
      title: 'line-clamp-2 text-xl leading-tight md:(text-lg leading-tight) lg:(text-2xl leading-tight)',
    },
    small: {
      cardSize: 'col-span-6 md:col-span-3 lg:col-span-2 h-90 md:h-85',
      imgSize: 'h-3/5 md:h-5/9',
      title: 'line-clamp-2 text-xl leading-tight md:(text-lg leading-tight)',
    },
  }

  // Choose card layout size dynamically
  const itemSizeSwitch = (index: number) => {
    if (index === 0) return postSize.big
    if (index < 3) return filter == null ? postSize.medium : postSize.small
    return postSize.small
  }

  return (
    <>
      <ListLayout>
        <div className="pb-10" data-aos="fade-up" data-aos-delay={filter == undefined ? '250' : '0'}>
          {filter && (
            <p className="my-2 text-xs font-semibold text-true-gray-400">
              LATEST POSTS
            </p>
          )}

          <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8"
          //  data-aos="fade-up"
          >
            {filter ? (
              <div className="flex justify-between">
                <div>
                  <span
                  // className={color == undefined ? "" : `${Colors[color]?.text.normal ?? Colors['gray'].text.normal}`}
                  >
                    {filter}
                  </span>
                  <span>🌟</span>
                </div>
                <span
                  className={`${color ?
                    `${Colors[color]?.bg.msg ?? Colors.gray.bg.msg} text-white`
                    : ''
                    } text-center rounded-full px-2 h-full`}
                >
                  {count}
                </span>
              </div>
            ) : ('Latest Posts 💫')}
          </h1>

          <div className="grid grid-cols-6 gap-6.5 lg:gap-10">
            {mainPosts.map((post, index) => {
              const size = itemSizeSwitch(index)
              const category = post.category?.[0] || 'Other'
              const categoryColor = Colors[getColorClassByName(category)]?.text.normal

              return (
                <div key={post.id} className={`${size.cardSize}`} data-aos="fade-up">
                  <Link href={`/posts/${post.slug}`}
                    className={`w-full block bg-white rounded-3xl overflow-hidden shadow-lg md:shadow-none shadow-true-gray-200 ${size.cardSize} flex flex-col group transition duration-500 ease-in-out transform-gpu mobile-hover:hover:scale-95
                    md:hover:shadow-lg hover:rotate-0 hover:active:scale-95 dark:bg-true-gray-900 shadow-none`}
                  >
                    <header
                      className={`relative ${size.imgSize} duration-500 ease-in-out md:group-hover:brightness-90 transition`}
                    >
                      <ThemedImage
                        post={post}
                        quality={100}
                        className="transition-all duration-500 ease-in-out opacity-100 md:group-hover:scale-105 md:group-hover:opacity-90 transform-gpu"
                      />
                    </header>
                    <div className="flex flex-col justify-between flex-1 p-6">
                      <article className="flex flex-col justify-between items-start">
                        <Link href={`/category/${category}`}
                          className={`mb-2 text-xs font-bold text-true-gray-600 leading-2 ${categoryColor}`}
                        >
                          {category}
                        </Link>
                        <h2 className={`${size.title} font-bold`}>
                          {post.title}
                        </h2>
                      </article>
                      <FormattedDate date={post.date.start_date} fromNow/>
                    </div>
                  </Link>
                </div >
              )
            })}
          </div >
        </div >
      </ListLayout >

      {
        morePosts.length > 0 ? (
          <div className="bg-white dark:bg-true-gray-900">
            <ListLayout>
              <PostMore posts={morePosts} />
            </ListLayout>
          </div>
        ) : (
          <div data-aos="fade-up" className="text-center mb-10">
            <Link href='/archive'
              className="text-center border-2 border-black inline-block py-2 px-5 rounded-full hover:(bg-black  text-white) transition ease-in-out duration-400
              dark:hover:(bg-white text-black) border-white"
            >
              View Archive
            </Link>
          </div>
        )
      }
    </>
  )
}

export default PostList
