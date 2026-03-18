import { OpenSource } from '@/src/types'

interface OpenSourceSectionProps {
  openSources: OpenSource[]
}

const OpenSourceSection: React.FC<OpenSourceSectionProps> = ({ openSources }) => {
  return (
    <div className="col-span-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/30 dark:border-zinc-800 shadow-2xl shadow-zinc-200/40 dark:shadow-none overflow-hidden" data-aos="fade-up">
      {/* Header */}
      <div className="px-8 pt-8 pb-6">
        <p className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-1">
          Contributions
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
          Open Source
        </h2>
      </div>

      {/* Cards */}
      <div className="px-8 pb-8 flex flex-col gap-4">
        {openSources.map((os) => (
          <a
            key={os.title}
            href={os.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 p-6 rounded-[1.75rem] bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/30 hover:border-orange-200 dark:hover:border-orange-900/40 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-none"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* GitHub logo SVG */}
                <div className="w-9 h-9 rounded-2xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform duration-500">
                  <svg className="w-5 h-5 fill-white dark:fill-zinc-900" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-black text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500 transition-colors duration-300">
                    {os.title}
                  </h3>
                </div>
              </div>
              {/* Arrow */}
              <svg className="w-5 h-5 text-zinc-300 dark:text-zinc-600 group-hover:text-orange-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {os.description}
            </p>

            {os.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {os.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest bg-zinc-100 dark:bg-zinc-700/60 text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-600/30"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}

export default OpenSourceSection