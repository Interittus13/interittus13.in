import { slugify } from 'transliteration'

type PostTocProps = {
  blocks: any
}

type HeadingType = {
  id: string
  type: 'heading_1' | 'heading_2' | 'heading_3'
  content: string
}

/**
 * Table of contents for a post.
 */
const PostToc: React.FC<PostTocProps> = ({ blocks }) => {

  const flatHeadings: [HeadingType] = blocks
    .filter(
      (block: any) =>
        block.type === 'heading_1' ||
        block.type === 'heading_2' ||
        block.type === 'heading_3'
    )
    .map((block: any) => {
      const content = block?.[block.type]?.text?.[0]?.text?.content ?? ''
      return {
        id: block.id,
        type: block.type,
        content,
      }
    })

  const marginMap: Record<string, string> = {
    heading_1: '',
    heading_2: 'ml-4 md:ml-8',
    heading_3: 'ml-8 md:ml-16',
  }

  if (flatHeadings.length < 1) return null

  return (
    <div className="h-full w-full text-left p-6 whitespace-normal">
      <h3 className="text-true-gray-400 text-xs mb-3">Table of contents</h3>
      <nav aria-label='Table of contents'>
        <ul>
          {flatHeadings.map((heading) => {
            const slug = slugify(heading.content)
            return (
              <li key={heading.id}>
              <a
                href={`#${slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(`#${slug}`)
                  ?.scrollIntoView({ behavior: 'smooth' })
                }}
                >
                <p className={`${marginMap[heading.type]}`}>{heading.content}</p>
              </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default PostToc
