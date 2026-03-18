import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useMounted } from '@/src/hooks/useMounted'

// const Utterances = dynamic(
//   () => {
//     return import('../components/comments/Utterances')
//   },
//   { ssr: false }
// )

const Giscus = dynamic(
  () => {
<<<<<<<< HEAD:src/components/post/Comment.tsx
    return import('@/src/components/comments/Giscus')
========
    return import('./comments/Giscus')
>>>>>>>> d9a87f57ecf39d0c8edfc5a86eb2e6075acbfe03:src/components/Comment.tsx
  },
  { ssr: false }
)

type Props = {}

const Comment = ({}: Props) => {
  const {resolvedTheme} = useTheme()
  const mounted = useMounted()

  if (!mounted) {
    return null
  }

  return (
    <div className="pb-4 md:pb-8">
      <h1 className="my-4 text-2xl font-bold md:text-3xl lg:my-8 text-center">
        Comments
      </h1>
      <div className="my-8">
        <Giscus theme={resolvedTheme === "dark" ? "light" : "light"} />
      </div>
    </div>
  )
}

export default Comment
