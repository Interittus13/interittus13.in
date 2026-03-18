import { getMeData } from '@/src/lib/notion/getMeData'
import Image from 'next/image'
import Overview from '@/src/components/profile/Overview'
import { ModernProjectSection } from '@/src/components/profile/projects/ModernProjectSection'
import { getIconByName } from '@/src/lib/utils/iconMap'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'DevOps Engineer & Cloud Architect. Building scalable infrastructure on Azure & AWS with Kubernetes, Terraform and CI/CD pipelines.',
}

export default async function MePage() {
  const me = await getMeData()

  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-32 md:pt-44 pb-20 px-5 md:px-8 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-500/10 via-violet-500/5 to-transparent blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-14">
            {/* Avatar */}
            <div className="relative flex-shrink-0" data-aos="zoom-out">
              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-[3rem] overflow-hidden border-[6px] border-white dark:border-zinc-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-none transition-transform duration-700 hover:scale-105">
                <Image
                  src={me.image}
                  fill
                  className="object-cover"
                  alt={me.name}
                  priority
                />
              </div>
              {/* Status dot */}
              <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-emerald-400 border-4 border-white dark:border-zinc-800 shadow-lg" />
            </div>

            {/* Text */}
            <div data-aos="fade-up">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500 mb-3">
                About Me
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none mb-4">
                {me.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap mb-5">
                {['DevOps Engineer', 'Cloud Architect', 'SRE'].map((role) => (
                  <span
                    key={role}
                    className="text-[0.6rem] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xl">
                Building scalable cloud infrastructure on{' '}
                <span className="text-zinc-800 dark:text-zinc-200 font-bold">Azure & AWS</span>
                {' '}with Kubernetes, Terraform, and CI/CD pipelines. {me.bio}
              </p>

              {/* Social icons row */}
              <div className="flex items-center gap-3 mt-7 flex-wrap">
                {me.social.slice(0, 5).map((link, i) => {
                  const iconName = typeof link.icon === 'string' ? link.icon : null
                  const Icon = iconName ? getIconByName(iconName) : null
                  return (
                    <a
                      key={`${link.name ?? link.url}-${i}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name ?? 'social link'}
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 active:scale-95 ${link.color ?? 'from-zinc-700 to-zinc-900 bg-gradient-to-br'}`}
                    >
                      {Icon && <Icon className="w-5 h-5 fill-white" />}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bento overview grid ── */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 mb-24">
        <div className="p-1 rounded-[3rem] bg-gradient-to-tr from-orange-500/15 via-transparent to-violet-500/15">
          <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-3xl rounded-[2.9rem] p-5 md:p-8 border border-white/20 dark:border-zinc-800/50">
            <Overview me={me} />
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section id="projects" className="pb-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8 mb-14 text-center" data-aos="fade-up">
          <p className="text-[0.6rem] font-black uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500 mb-3">
            Portfolio
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white">
            Featured Projects
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-orange-500/30 mt-5" />
        </div>
        <ModernProjectSection projects={me.projects} />
      </section>
    </main>
  )
}
