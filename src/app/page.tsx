import { getPosts } from '@/src/lib/apis'
import { filterPosts } from '@/src/lib/apis/filterPosts'
import PostInfiniteList from '@/src/components/post/PostInfiniteList'
import ListLayout from '@/src/components/layout/ListLayout'
import Image from 'next/image'
import { me } from '@/src/config/me'
import { getIconByName } from '@/src/lib/utils/iconMap'
import { CONFIG } from '@/src/config/blog'
import type { Metadata } from 'next'

import { getBaseUrl } from '@/src/lib/utils/url'

const baseUrl = getBaseUrl()
const ogImage = `${baseUrl}/static/images/og.png`

export const metadata: Metadata = {
  title: me.name,
  description: me.metadata.description,
  openGraph: {
    type: 'website',
    title: me.name,
    description: me.metadata.description,
    siteName: CONFIG.BLOG_TITLE,
    locale: 'en_US',
    images: [{ url: ogImage, width: 1200, height: 630, alt: me.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: me.name,
    description: me.metadata.description,
    images: [ogImage],
    creator: '@interittus13',
  },
}

export default async function HomePage() {
  const posts = await getPosts()
  const filteredPosts = filterPosts(posts)

  return (
    <main className="min-h-screen">
      <ListLayout>
        {/* Home Hero Section */}
        <section className="mb-12" data-aos="fade-up">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl shrink-0 rotate-[-3deg] hover:rotate-0 transition-transform duration-700">
              <Image
                src={me.image}
                fill
                className="object-cover"
                alt={me.name}
                priority
              />
            </div>

            <div className="text-center md:text-left">
              <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500 mb-2">
                Digital Garden & Notes
              </p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 mb-4">
                👋 I&apos;m <span className="text-orange-500">{me.name.split(' ')[0]}</span>
              </h1>
              <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium max-w-xl leading-relaxed italic opacity-90">
                &quot;{me.bio}&quot;
              </p>

              <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                {me.social.slice(0, 4).map((link, i) => {
                  const Icon = typeof link.icon === 'string' ? getIconByName(link.icon) : null
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 hover:-translate-y-1 active:scale-95 bg-gradient-to-br ${link.color}`}
                    >
                      {Icon && <Icon className="w-4.5 h-4.5 fill-white" />}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

        </section>

        {/*Posts Section */}
        <section className="w-full">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              Latest Articles
            </h2>
            <div className="h-1 flex-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-full" />
          </div>
          <PostInfiniteList initialPosts={filteredPosts} />
        </section>
      </ListLayout>
    </main>
  )
}
