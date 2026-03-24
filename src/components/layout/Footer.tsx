'use client'

import React from 'react'
import Link from 'next/link'
import {
  type IconType,
  SiNextdotjs,
  SiNotion,
  SiTailwindcss,
  SiVercel,
} from '@icons-pack/react-simple-icons'
import { me } from '@/src/config/me'
import { CONFIG } from '@/src/config/blog'

const FOOTER_TOOLS: { icon: IconType, url: string, name: string }[] = [
  { icon: SiNotion, url: 'https://notion.so', name: 'Notion' },
  { icon: SiNextdotjs, url: 'https://nextjs.org', name: 'Next.js' },
  { icon: SiTailwindcss, url: 'https://tailwindcss.com', name: 'Tailwind' },
  { icon: SiVercel, url: 'https://vercel.com', name: 'Vercel' },
]

export default function Footer() {
  const thisYear = new Date().getFullYear()

  return (
    <footer className="py-24 px-6 border-t border-zinc-100 dark:border-zinc-800/50 bg-white/30 dark:bg-black/30 backdrop-blur-3xl">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div className="flex flex-col gap-8">
            <Link href="/" className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 group transition-all">
              {CONFIG.BLOG_TITLE}
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 ml-1.5 group-hover:scale-150 transition-transform duration-500" />
            </Link>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium max-w-sm leading-relaxed opacity-80 decoration-orange-500/10 underline decoration-2 underline-offset-8">
              Sharing journey through code, design, and digital experiences. Built with a focus on fluid aesthetics and performance.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-8 font-black uppercase tracking-[0.2em] text-[0.65rem] text-zinc-400">
            <span className="relative">
               Crafted with
               <div className="absolute -bottom-2 right-0 w-8 h-1 bg-orange-500/20 rounded-full" />
            </span>
            <div className="flex gap-4">
              {FOOTER_TOOLS.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-[1.25rem] bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-white dark:hover:bg-zinc-700 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-none transition-all duration-500 active:scale-90 border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-600/50"
                  title={tool.name}
                >
                  <tool.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[0.6rem] font-black text-zinc-300 dark:text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-3">
            <span className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
            © {thisYear} {me.name}
            <span className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
          </div>
          
          <div className="flex gap-10">
            {['Archive', 'Me', 'Privacy Policy'].map((item) => (
               <Link 
                  key={item}
                  href={item === 'Privacy Policy' ? '/privacy-policy' : `/${item.toLowerCase()}`} 
                  className="text-[0.6rem] font-black text-zinc-400 hover:text-orange-500 uppercase tracking-[0.3em] transition-all duration-500 hover:translate-y-[-2px] whitespace-nowrap"
               >
                  {item}
               </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
