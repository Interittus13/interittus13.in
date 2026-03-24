'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

type RichText = {
  plain_text: string
  href: string | null
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
}

// Rich text span renderer
function RichTextSpan({ text }: { text: RichText }) {
  const { annotations, href, plain_text } = text
  const colorMap: Record<string, string> = {
    red: 'text-red-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    orange: 'text-orange-500',
    pink: 'text-pink-500',
    purple: 'text-purple-500',
    gray: 'text-zinc-400',
    brown: 'text-amber-700',
    red_background: 'bg-red-100 dark:bg-red-900/30',
    blue_background: 'bg-blue-100 dark:bg-blue-900/30',
    green_background: 'bg-green-100 dark:bg-green-900/30',
    yellow_background: 'bg-yellow-100 dark:bg-yellow-900/30',
    orange_background: 'bg-orange-100 dark:bg-orange-900/30',
    purple_background: 'bg-purple-100 dark:bg-purple-900/30',
    gray_background: 'bg-zinc-100 dark:bg-zinc-800',
    brown_background: 'bg-amber-100 dark:bg-amber-900/30',
  }

  let classNames = ''
  if (annotations.bold) classNames += ' font-bold'
  if (annotations.italic) classNames += ' italic'
  if (annotations.strikethrough) classNames += ' line-through'
  if (annotations.underline) classNames += ' underline underline-offset-2'
  if (annotations.code)
    classNames +=
      ' font-mono text-[0.875em] bg-zinc-100 dark:bg-zinc-800 text-orange-500 dark:text-orange-400 px-1.5 py-0.5 rounded-md'
  if (annotations.color && annotations.color !== 'default') {
    classNames += ' ' + (colorMap[annotations.color] ?? '')
  }

  const content = <span className={classNames.trim() || undefined}>{plain_text}</span>
  if (href) {
    return (
      <Link href={href} className="text-orange-500 hover:underline underline-offset-2" target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    )
  }
  return content
}

function RichTextContent({ richText }: { richText: RichText[] }) {
  return (
    <>
      {richText.map((t, i) => (
        <RichTextSpan key={i} text={t} />
      ))}
    </>
  )
}

// Callout icons
const calloutBgMap: Record<string, string> = {
  blue_background: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  red_background: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  green_background: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  yellow_background: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
  orange_background: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
  gray_background: 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700',
  purple_background: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  brown_background: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
  default: 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700',
}

// Single block renderer
function Block({ block, isFirst }: { block: BlockObjectResponse; isFirst?: boolean }) {
  const children: BlockObjectResponse[] = (block as any).__children ?? []

  switch (block.type) {
    case 'paragraph': {
      const content = (block as any).paragraph.rich_text
      if (!content?.length) return <div className="h-4" />

      const dropCapClass = isFirst
        ? "first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:mt-2 first-letter:text-zinc-900 dark:first-letter:text-white first-letter:leading-none"
        : ""

      return (
        <p className={`text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 ${dropCapClass}`}>
          <RichTextContent richText={content} />
        </p>
      )
    }

    case 'heading_1': {
      const hb = (block as any).heading_1
      const id = hb.rich_text.map((t: RichText) => t.plain_text).join('').toLowerCase().replace(/\s+/g, '-')
      return (
        <h1 id={id} className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 mt-16 mb-6 leading-tight">
          <RichTextContent richText={hb.rich_text} />
        </h1>
      )
    }

    case 'heading_2': {
      const hb = (block as any).heading_2
      const id = hb.rich_text.map((t: RichText) => t.plain_text).join('').toLowerCase().replace(/\s+/g, '-')
      return (
        <h2 id={id} className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 mt-12 mb-5 leading-tight">
          <RichTextContent richText={hb.rich_text} />
        </h2>
      )
    }

    case 'heading_3': {
      const hb = (block as any).heading_3
      const id = hb.rich_text.map((t: RichText) => t.plain_text).join('').toLowerCase().replace(/\s+/g, '-')
      return (
        <h3 id={id} className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-4">
          <RichTextContent richText={hb.rich_text} />
        </h3>
      )
    }

    case 'bulleted_list_item': {
      const bb = (block as any).bulleted_list_item
      return (
        <li className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed mb-1 ml-4">
          <RichTextContent richText={bb.rich_text} />
          {children.length > 0 && (
            <ul className="list-disc ml-6 mt-1">
              <NotionBlockRenderer blocks={children} />
            </ul>
          )}
        </li>
      )
    }

    case 'numbered_list_item': {
      const nb = (block as any).numbered_list_item
      return (
        <li className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed mb-1 ml-4">
          <RichTextContent richText={nb.rich_text} />
          {children.length > 0 && (
            <ol className="list-decimal ml-6 mt-1">
              <NotionBlockRenderer blocks={children} />
            </ol>
          )}
        </li>
      )
    }

    case 'to_do': {
      const td = (block as any).to_do
      return (
        <div className="flex items-start gap-3 mb-2">
          <input
            type="checkbox"
            checked={td.checked}
            readOnly
            className="mt-1.5 rounded accent-orange-500 w-4 h-4 flex-shrink-0"
          />
          <span className={`text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed ${td.checked ? 'line-through opacity-60' : ''}`}>
            <RichTextContent richText={td.rich_text} />
          </span>
        </div>
      )
    }

    case 'toggle': {
      const tb = (block as any).toggle
      return (
        <details className="mb-4 group">
          <summary className="cursor-pointer text-lg font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2 hover:text-orange-500 transition-colors list-none">
            <span className="transition-transform group-open:rotate-90 inline-block">▶</span>
            <RichTextContent richText={tb.rich_text} />
          </summary>
          {children.length > 0 && (
            <div className="ml-6 mt-3 border-l-2 border-zinc-200 dark:border-zinc-700 pl-4">
              <NotionBlockRenderer blocks={children} />
            </div>
          )}
        </details>
      )
    }

    case 'quote': {
      const qb = (block as any).quote
      return (
        <blockquote className="border-l-4 border-orange-400 pl-6 py-2 my-8 bg-orange-50/50 dark:bg-orange-900/10 rounded-r-xl">
          <p className="text-xl md:text-2xl italic text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            <RichTextContent richText={qb.rich_text} />
          </p>
          {children.length > 0 && (
            <div className="mt-2">
              <NotionBlockRenderer blocks={children} />
            </div>
          )}
        </blockquote>
      )
    }

    case 'callout': {
      const cb = (block as any).callout
      const emoji = cb.icon?.type === 'emoji' ? cb.icon.emoji : '💡'
      const colorClass = calloutBgMap[cb.color ?? 'default'] ?? calloutBgMap.default
      return (
        <div className={`flex gap-4 p-5 my-6 rounded-2xl border ${colorClass}`}>
          <span className="text-2xl flex-shrink-0 leading-none mt-0.5">{emoji}</span>
          <div className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <RichTextContent richText={cb.rich_text} />
            {children.length > 0 && (
              <div className="mt-2">
                <NotionBlockRenderer blocks={children} />
              </div>
            )}
          </div>
        </div>
      )
    }

    case 'code': {
      const code = (block as any).code
      const lang = code.language?.replace('plain text', 'text') ?? 'text'
      const codeText = code.rich_text.map((t: RichText) => t.plain_text).join('')
      return (
        <div className="my-6 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/50 shadow-sm">
          {lang && lang !== 'text' && (
            <div className="px-4 py-2 bg-zinc-800 text-zinc-400 text-xs font-mono tracking-widest uppercase flex items-center justify-between">
              <span>{lang}</span>
            </div>
          )}
          <SyntaxHighlighter
            language={lang}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              borderRadius: 0,
              fontSize: '0.9rem',
              lineHeight: '1.7',
              backgroundColor: '#1a1a2e',
            }}
            codeTagProps={{
              style: {
                backgroundColor: 'transparent',
                fontFamily: 'var(--font-mono)',
              }
            }}
            showLineNumbers={codeText.split('\n').length > 5}
            lineNumberStyle={{
              minWidth: '2.5em',
              paddingRight: '1em',
              color: '#5c6370',
              textAlign: 'right',
              userSelect: 'none',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              marginRight: '1.5em',
            }}
          >
            {codeText}
          </SyntaxHighlighter>
          {code.caption?.length > 0 && (
            <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-900">
              <RichTextContent richText={code.caption} />
            </p>
          )}
        </div>
      )
    }

    case 'image': {
      const img = (block as any).image
      const url = img.type === 'external' ? img.external.url : img.file?.url
      const caption = img.caption?.map((t: RichText) => t.plain_text).join('') ?? ''
      if (!url) return null
      return (
        <figure className="my-8">
          <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/50 shadow-sm">
            <Image
              src={url}
              alt={caption || 'Blog image'}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              loading="lazy"
              unoptimized // Notion signed URLs often change
            />
          </div>
          {caption && (
            <figcaption className="text-center text-sm text-zinc-400 mt-3 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }

    case 'video': {
      const vid = (block as any).video
      const url = vid.type === 'external' ? vid.external.url : vid.file?.url

      // Handle YouTube
      const ytMatch = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?]+)/)
      if (ytMatch) {
        return (
          <div className="my-8 rounded-2xl overflow-hidden shadow-lg aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${ytMatch[1]}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
      }

      return (
        <div className="my-8">
          <video src={url} controls className="w-full rounded-2xl shadow-lg" />
        </div>
      )
    }

    case 'bookmark': {
      const bm = (block as any).bookmark
      const caption = bm.caption?.map((t: RichText) => t.plain_text).join('') ?? ''
      return (
        <a
          href={bm.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 my-6 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 hover:border-orange-400/60 hover:bg-orange-50/30 dark:hover:bg-orange-900/10 transition-all no-underline group"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-orange-500 transition-colors truncate">
              {caption || bm.url}
            </p>
            <p className="text-xs text-zinc-400 truncate mt-0.5">{bm.url}</p>
          </div>
          <span className="text-zinc-300 dark:text-zinc-600 text-lg flex-shrink-0">→</span>
        </a>
      )
    }

    case 'embed': {
      const em = (block as any).embed
      return (
        <div className="my-8 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/50 shadow-sm aspect-video">
          <iframe src={em.url} className="w-full h-full" allowFullScreen />
        </div>
      )
    }

    case 'divider': {
      return <hr className="my-10 border-none border-t border-zinc-200 dark:border-zinc-800" />
    }

    case 'table': {
      const tb = (block as any).table
      return (
        <div className="my-10 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700/50 shadow-sm bg-white dark:bg-zinc-900/50">
          <table className="w-full text-sm border-collapse">
            <NotionBlockRenderer
              blocks={children}
              isTableContext
              hasColumnHeader={tb.has_column_header}
            />
          </table>
        </div>
      )
    }

    case 'table_row': {
      const tr = (block as any).table_row
      const isHeader = (block as any).__isFirstRow && (block as any).__hasColumnHeader

      return (
        <tr className={`border-b border-zinc-200 dark:border-zinc-700/50 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 ${isHeader ? 'bg-zinc-100/50 dark:bg-zinc-800/80' : ''}`}>
          {tr.cells.map((cell: RichText[], i: number) => {
            const CellTag = isHeader ? 'th' : 'td'
            return (
              <CellTag
                key={i}
                className={`px-5 py-4 text-zinc-700 dark:text-zinc-300 ${isHeader ? 'font-black text-zinc-900 dark:text-zinc-100 text-left border-r border-zinc-200/50 dark:border-zinc-700/50 last:border-r-0' : 'border-r border-zinc-200/50 dark:border-zinc-700/50 last:border-r-0'}`}
              >
                <RichTextContent richText={cell} />
              </CellTag>
            )
          })}
        </tr>
      )
    }

    case 'column_list': {
      return (
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <NotionBlockRenderer blocks={children} />
        </div>
      )
    }

    case 'column': {
      return (
        <div className="flex flex-col gap-2">
          <NotionBlockRenderer blocks={children} />
        </div>
      )
    }

    case 'child_page': {
      const cp = (block as any).child_page
      return (
        <Link
          href={`/posts/${block.id}`}
          className="flex items-center gap-3 my-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 hover:border-orange-400/60 hover:bg-orange-50/30 dark:hover:bg-orange-900/10 transition-all no-underline group"
        >
          <span className="text-2xl">📄</span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium group-hover:text-orange-500 transition-colors">
            {cp.title}
          </span>
        </Link>
      )
    }

    case 'pdf': {
      const pdf = (block as any).pdf
      const url = pdf.type === 'external' ? pdf.external.url : pdf.file?.url
      return (
        <div className="my-6">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 hover:border-orange-400/60 transition-all"
          >
            <span className="text-2xl">📄</span>
            <span className="text-orange-500 underline underline-offset-2">View PDF</span>
          </a>
        </div>
      )
    }

    case 'file': {
      const file = (block as any).file
      const url = file.type === 'external' ? file.external.url : file.file?.url
      const name = file.name ?? 'Download file'
      return (
        <div className="my-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-orange-500 transition-colors text-sm font-medium"
          >
            📎 {name}
          </a>
        </div>
      )
    }

    case 'equation': {
      const eq = (block as any).equation
      return (
        <div className="my-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 text-center overflow-x-auto font-mono text-sm text-zinc-600 dark:text-zinc-400">
          {eq.expression}
        </div>
      )
    }

    case 'synced_block': {
      return children.length > 0 ? <NotionBlockRenderer blocks={children} /> : null
    }

    case 'template':
    case 'link_to_page':
    case 'unsupported':
    default:
      return null
  }
}

// Group consecutive list items into <ul> / <ol>
interface RendererProps {
  blocks: BlockObjectResponse[]
  isTableContext?: boolean
  hasColumnHeader?: boolean
}

export function NotionBlockRenderer({ blocks, isTableContext, hasColumnHeader }: RendererProps) {
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < blocks.length) {
    const block = blocks[i]

    if (block.type === 'bulleted_list_item') {
      const listItems: BlockObjectResponse[] = []
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        listItems.push(blocks[i++])
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc ml-6 mb-4 space-y-1">
          {listItems.map((b) => <Block key={b.id} block={b} />)}
        </ul>
      )
    } else if (block.type === 'numbered_list_item') {
      const listItems: BlockObjectResponse[] = []
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        listItems.push(blocks[i++])
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal ml-6 mb-4 space-y-1">
          {listItems.map((b) => <Block key={b.id} block={b} />)}
        </ol>
      )
    } else if (isTableContext && block.type === 'table_row') {
      // Annotate block for the renderer
      const tableRowBlock = {
        ...block,
        __isFirstRow: i === 0,
        __hasColumnHeader: hasColumnHeader
      }
      elements.push(<Block key={block.id} block={tableRowBlock as any} />)
      i++
    } else {
      // Set isFirst only for the very first block in the main content stream
      const isFirst = !isTableContext && i === 0
      elements.push(<Block key={block.id} block={block} isFirst={isFirst} />)
      i++
    }
  }

  return <>{elements}</>
}
