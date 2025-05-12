import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

// const Utterances = dynamic(
//   () => {
//     return import('../components/comments/Utterances')
//   },
//   { ssr: false }
// )

const Giscus = dynamic(
  () => {
    return import('./comments/Giscus')
  },
  { ssr: false }
)

type Props = {}

const Comment = ({}: Props) => {
  const {resolvedTheme} = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

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
