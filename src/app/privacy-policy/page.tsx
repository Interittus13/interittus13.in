import { me } from '@/src/config/me'
import { CONFIG } from '@/src/config/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Privacy Policy | ${me.name}`,
  description: `Privacy policy for ${CONFIG.BLOG_TITLE}. Information about data collection, GA4, Giscus, and AI-generated content.`,
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-32 md:pt-44 pb-32 px-5 md:px-8">
      <div className="max-w-3xl mx-auto" data-aos="fade-up">
        {/* Header */}
        <header className="mb-16">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500 mb-3">
            Legal & Disclosures
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none mb-6">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium italic">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12 text-zinc-600 dark:text-zinc-300">
          {/* Intro */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
              <span className="w-6 h-1 bg-orange-500 rounded-full" />
              Introduction
            </h2>
            <p className="leading-relaxed">
              Welcome to <strong>{CONFIG.BLOG_TITLE}</strong> (the &quot;Site&quot;), operated by {me.name}. This Privacy Policy explains how I collect, use, and protect any information when you visit this website. I am committed to ensuring that your privacy is protected and being transparent about the data processing that occurs on this Site.
            </p>
          </section>

          {/* Data Collection */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
              <span className="w-6 h-1 bg-orange-500 rounded-full" />
              Data Collection & Analytics
            </h2>
            <p className="leading-relaxed">
              This Site uses <strong>Google Analytics 4 (GA4)</strong> to help me understand how visitors interact with my content. GA4 collects data such as your IP address, browser type, and page interactions. This data is used solely for the purpose of improving the Site experience and content relevance.
            </p>
            <p className="leading-relaxed">
              I also use <strong>Giscus</strong> to power the comment sections on blog posts. Giscus is a comments system powered by GitHub Discussions. When you interact with the comment section, you may be required to sign in with your GitHub account, and your GitHub username and profile picture may be displayed alongside your comments.
            </p>
          </section>

          {/* AI Disclosure */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
              <span className="w-6 h-1 bg-orange-500 rounded-full" />
              AI-Generated Content Disclosure
            </h2>
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50">
              <p className="leading-relaxed font-medium text-zinc-700 dark:text-zinc-200">
                Please be advised that many of the <strong>blog cover images</strong> and decorative assets found on this Site are generated using Artificial Intelligence (AI) tools. 
              </p>
              <p className="mt-4 leading-relaxed text-sm">
                These images are curated and processed to match the aesthetic theme of the content. Technical articles and portfolio descriptions remain the original work of {me.name} unless explicitly stated otherwise.
              </p>
            </div>
          </section>

          {/* Third Parties */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
              <span className="w-6 h-1 bg-orange-500 rounded-full" />
              Third-Party Links
            </h2>
            <p className="leading-relaxed">
              This Site contains links to other websites (GitHub, LinkedIn, etc.). Once you use these links to leave my site, please note that I do not have any control over that other website. Therefore, I cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites.
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
              <span className="w-6 h-1 bg-orange-500 rounded-full" />
              Contact Information
            </h2>
            <p className="leading-relaxed">
              If you have any questions regarding this Privacy Policy or my processing of your data, please feel free to reach out via email:
            </p>
            <a 
              href={`mailto:${me.email}`} 
              className="inline-block text-orange-500 font-bold hover:underline decoration-2 underline-offset-4"
            >
              {me.email}
            </a>
          </section>
        </div>

        {/* Footer info */}
        <div className="mt-24 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-[0.6rem] font-black uppercase tracking-[0.3em] text-zinc-400">
          © {new Date().getFullYear()} {me.name} • {CONFIG.BLOG_TITLE}
        </div>
      </div>
    </main>
  )
}
