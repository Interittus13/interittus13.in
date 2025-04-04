import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { NotionRenderer } from 'react-notion-x'
import type { ExtendedRecordMap } from 'notion-types'

// TODO: type error in build time
const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    await Promise.all([
      import('prismjs/components/prism-markup-templating.js'),
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js')
    ])
  return m.Code })
)

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then((m) => m.Collection), {
    ssr: false
  }
)

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation), {
    ssr: false
  }
)

const Pdf = dynamic(
  () =>
    import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf), {
    ssr: false,
  }
)

const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then((m) => m.Modal), {
    ssr: false,
  }
)

interface ContentRendererProps {
  recordMap: ExtendedRecordMap
}

// type Props = {
//   recordMap: any
// }

// const ContentRenderer = ({ recordMap }: Props) => {
const ContentRenderer: React.FC<ContentRendererProps> = ({ recordMap }) => {
  const { resolvedTheme } = useTheme()
  return (
    <NotionRenderer
      darkMode={resolvedTheme === 'dark'}
      recordMap={recordMap}
      fullPage={false}
      components={{
        nextImage: Image,
        nextLink: Link,
        Code,
        Collection,
        Equation,
        Pdf,
        Modal,
      }}
    />
  )
}

export default ContentRenderer
