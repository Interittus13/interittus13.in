import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { NotionRenderer } from 'react-notion-x'
import { type CodeBlock, ExtendedRecordMap } from 'notion-types'

// Custom wrapper for Code component to handle language display
// const CodeWrapper = ({ block, defaultLanguage = "typescript", className }: { block: CodeBlock, defaultLanguage?: string, className?: string }) => {
//   const language = block?.properties?.language?.[0]?.[0] || defaultLanguage

//   return (
//     <div
//       className={`notion-code-wrapper my-6 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden ${className}`}
//     >
//       {/* Header bar with language and copy button */}
//       <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-xs font-mono text-gray-700 dark:text-gray-300">
//         {/* Language label */}
//         <span className="uppercase">{language}</span>

//         {/* This empty div will be populated by react-notion-x with the copy button */}
//         <div className="notion-code-copy" />
//       </div>

//       {/* Code content - we pass the original block to the Code component */}
//       <div className="notion-code-content overflow-x-auto">
//         <Code block={block} />
//       </div>
//     </div>
//   )
// }

// TODO: type error in build time
const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      import('prismjs/components/prism-markup-templating.js'),
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-c.js'),
      import('prismjs/components/prism-cpp.js'),
      import('prismjs/components/prism-csharp.js'),
      import('prismjs/components/prism-docker.js'),
      import('prismjs/components/prism-java.js'),
      import('prismjs/components/prism-js-templates.js'),
      import('prismjs/components/prism-coffeescript.js'),
      import('prismjs/components/prism-diff.js'),
      import('prismjs/components/prism-git.js'),
      import('prismjs/components/prism-go.js'),
      import('prismjs/components/prism-graphql.js'),
      import('prismjs/components/prism-handlebars.js'),
      import('prismjs/components/prism-less.js'),
      import('prismjs/components/prism-makefile.js'),
      import('prismjs/components/prism-markdown.js'),
      import('prismjs/components/prism-objectivec.js'),
      import('prismjs/components/prism-ocaml.js'),
      import('prismjs/components/prism-python.js'),
      import('prismjs/components/prism-reason.js'),
      import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-sass.js'),
      import('prismjs/components/prism-scss.js'),
      import('prismjs/components/prism-solidity.js'),
      import('prismjs/components/prism-sql.js'),
      import('prismjs/components/prism-stylus.js'),
      import('prismjs/components/prism-swift.js'),
      import('prismjs/components/prism-wasm.js'),
      import('prismjs/components/prism-yaml.js')
    ])
    return m.Code
  }), { ssr: false }
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
  const isDarkMode = resolvedTheme === "dark"

  return (
    <NotionRenderer
      darkMode={isDarkMode}
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
