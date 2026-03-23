import { Education } from '@/src/types'
import Image from 'next/image'

interface EducationSectionProps {
  education: Education[]
  header: string
  title: string
}

const COLOR_MAP: Record<string, string> = {
  blue: 'from-blue-500 to-indigo-600',
  yellow: 'from-amber-400 to-orange-500',
  red: 'from-red-500 to-rose-600',
  green: 'from-emerald-400 to-teal-600',
  purple: 'from-violet-500 to-purple-700',
  orange: 'from-orange-400 to-amber-600',
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, header, title }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className="col-span-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/30 dark:border-zinc-800 shadow-2xl shadow-zinc-200/40 dark:shadow-none overflow-hidden"
    >
      {/* Header */}
      <div className="px-8 pt-8 pb-6">
        <p className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-1">
          {header}
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
      </div>

      {/* Timeline */}
      <div className="px-8 pb-8 relative">
        {/* Vertical line */}
        <div className="absolute left-[3.25rem] top-0 bottom-8 w-px bg-zinc-100 dark:bg-zinc-800" />

        <div className="flex flex-col gap-6">
          {education.map((item, index) => {
            const gradient = COLOR_MAP[item.color] ?? 'from-zinc-400 to-zinc-600'
            return (
              <div key={item.name} className="flex gap-5 items-start relative" data-aos="fade-up" data-aos-delay={index * 100}>
                {/* Dot */}
                <div
                  className="relative z-10 flex-shrink-0 w-10 h-10 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-800"
                >
                  <Image
                    src={item.logo}
                    fill
                    className="object-contain p-1"
                    alt={item.name}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 bg-zinc-50/80 dark:bg-zinc-800/50 rounded-[1.5rem] p-5 border border-zinc-100/80 dark:border-zinc-700/30 hover:scale-[1.01] transition-transform duration-300">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                        {item.name}
                      </h3>
                      <p className={`text-sm font-semibold mt-0.5 text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
                        {item.degree}
                      </p>
                    </div>
                    <span className="text-[0.6rem] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-700/50 px-3 py-1 rounded-full shrink-0">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default EducationSection