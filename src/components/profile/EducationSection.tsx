'use client'

import React from 'react'
import { Education } from '@/src/types'

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
      <div className="px-8 pb-10 relative">
        {/* Vertical line */}
        <div className="absolute left-[2.75rem] top-0 bottom-10 w-px bg-zinc-100 dark:bg-zinc-800" />

        <div className="flex flex-col gap-8">
          {education.map((item, index) => {
            const gradient = COLOR_MAP[item.color] ?? 'from-zinc-400 to-zinc-600'
            return (
              <div key={item.name} className="flex gap-6 items-start relative" data-aos="fade-up" data-aos-delay={index * 100}>
                {/* Visual Dot/Marker */}
                <div
                  className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-zinc-200 dark:shadow-none mt-2.5`}
                >
                  <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                </div>

                {/* Content Card */}
                <div className="flex-1 group relative">
                  <div className="bg-zinc-50/80 dark:bg-zinc-900/40 rounded-3xl p-6 border border-zinc-100/80 dark:border-zinc-800/50 transition-all duration-500 hover:bg-white dark:hover:bg-zinc-800/80 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-none group-hover:-translate-y-1">
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                      <h3 className="text-lg md:text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-[0.6rem] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className={`text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
                      {item.degree}
                    </p>
                  </div>

                  {/* Decorative tag */}
                  <div className={`absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-gradient-to-b ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
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