import Link from 'next/link'
import ThemedImage from './ThemedImage'
import { TPost } from '../types'

export interface PaginationType {
  prev: TPost | null
  next: TPost | null
}

interface PagiantionProps {
  pagination: PaginationType
}

const Pagination = ({ pagination }: PagiantionProps) => {
  const renderPaginationCard = (post: TPost | null, label: 'Prev' | 'Next') => {
    if (!post) return null

    return (
      <Link href={`/posts/${post.slug}`} className='w-full'>
        <div
          className={`relative z-0 w-full overflow-hidden transition duration-500 h-30 md:h-35 bg-true-gray-200 filter hover:brightness-90 transition duration-300 ease-in-out group hover:shadow-lg dark:bg-true-gray-700`}
        >
          <div
            className="relative w-full h-full"
          // style={{
          //     opacity: ready ? 1 : 0,
          //     transition: "opacity 1.1s cubic-bezier(0.4, 0, 0.25, 1) 0ms, background 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms",
          // }}
          >
            <ThemedImage
              className="transition-all duration-500 ease-in-out transform group-hover:scale-105"
              post={post}
              quality={80}
            />
          </div>

          <div
            className={`absolute bottom-0 w-full p-4 overflow-hidden text-xl text-white bg-gradient-to-t from-black/30 to-transparent ${label == 'Next'
              ? 'text-right sm:rounded-br-3xl' : 'sm:rounded-bl-3xl'}`}
          >
            <p className="font-bold">{label}</p>
            {/* TODO: Switch to `height` method for smooth transition */}
            <p className="truncate group-hover:whitespace-normal">{post?.title}</p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="my-4 flex flex-col sm:(flex-row ) rounded-3xl overflow-hidden relative z-10 border-1 border-true-gray-400/10">
      {renderPaginationCard(pagination.prev, 'Prev')}
      {renderPaginationCard(pagination.next, 'Next')}
    </div>
  )
}

export default Pagination
