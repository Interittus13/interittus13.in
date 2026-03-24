'use client'

import { useState } from 'react'
import { SkillGroup } from '@/src/types'
import { getIconByName } from '@/src/lib/utils/iconMap'

interface SkillsSectionProps {
  skills: SkillGroup[]
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      data-aos="fade-up"
      className="col-span-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden border border-white/30 dark:border-zinc-800 shadow-2xl shadow-zinc-200/40 dark:shadow-none transition-all duration-700 ease-in-out"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-8 pb-6">
        <div>
          <p className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-1">
            Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
            Technical Skills
          </h2>
        </div>
        
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? 'Collapse skills' : 'Expand skills'}
          className={`group flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-500 font-black text-[0.6rem] uppercase tracking-widest ${
            expanded
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <span>{expanded ? 'Show Less' : 'Show More'}</span>
          <div className={`w-4 h-4 flex items-center justify-center transition-transform duration-500 ${expanded ? 'rotate-45' : ''}`}>
             +
          </div>
        </button>
      </div>

      {/* Categorized Grid */}
      <div className="px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {skills.map((group, groupIdx) => (
            <div key={groupIdx} className="flex flex-col gap-5">
              <h3 className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mb-2 px-1 relative">
                {group.title}
                <div className="absolute -bottom-1 left-1 w-4 h-0.5 bg-orange-500/30 rounded-full" />
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {(expanded ? group.items : group.items.slice(0, 4)).map((skill) => {
                  const Icon = typeof skill.icon === 'string' ? getIconByName(skill.icon) : null
                  return (
                    <div
                      key={skill.name}
                      className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm transition-all duration-500 hover:scale-[1.05] hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-none active:scale-95"
                    >
                      {Icon && (
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
                          <Icon className={`w-4.5 h-4.5 ${skill.color.replace('bg-', 'text-')} fill-current`} />
                        </div>
                      )}
                      <span className="text-[0.7rem] font-bold text-zinc-700 dark:text-zinc-300 tracking-tight">
                        {skill.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsSection