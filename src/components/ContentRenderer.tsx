import React, { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { NotionContext, NotionRenderer } from 'react-notion-x'
import type { CodeBlock, CollectionViewBlock, CollectionViewPageBlock, EquationBlock, ExtendedRecordMap, PageBlock, PdfBlock } from 'notion-types'

type CodeProps = {
  block: CodeBlock
  defaultLanguage?: string
  className?: string
}

type CollectionProps = {
  block: CollectionViewBlock | CollectionViewPageBlock | PageBlock
  className?: string
  ctx: NotionContext
}

type EquationProps = {
block: EquationBlock
math?: string
inline?: boolean
className?: string
}

type PdfProps = {
block: PdfBlock
file: string
className?: string
}

type ModalProps = {
}

const loadedCodeComponent = async (): Promise<ComponentType<CodeProps>> => {
  const m = await import('react-notion-x/build/third-party/code')
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
  }

const loadCollectionComponent = async (): Promise<ComponentType<CollectionProps>> => {
  const m = await import('react-notion-x/build/third-party/collection')
  return m.Collection
}

const loadEquationComponent = async (): Promise<ComponentType<EquationProps>> => {
  const m = await import('react-notion-x/build/third-party/equation')
  return m.Equation
}

const loadPdfComponent = async (): Promise<ComponentType<PdfProps>> => {
  const m = await import('react-notion-x/build/third-party/pdf')
  return m.Pdf
}

const loadModalComponent = async (): Promise<ComponentType<ModalProps>> => {
  const m = await import('react-notion-x/build/third-party/modal')
  return m.Modal
}

const Code = dynamic(loadedCodeComponent);

const Collection = dynamic(loadCollectionComponent)

const Equation = dynamic(loadEquationComponent, { ssr: false })

const Pdf = dynamic(loadPdfComponent, { ssr: false })

const Modal = dynamic(loadModalComponent, { ssr: false })

interface ContentRendererProps {
  recordMap: ExtendedRecordMap
}

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
