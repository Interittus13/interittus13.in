'use client'

import { useState } from 'react'
import { Skill } from '@/src/types'
import { getIconByName } from '@/src/lib/utils/iconMap'

interface SkillsSectionProps {
  skills: Skill[][]
}

// Flatten all skill groups into a single list
function flattenSkills(skills: Skill[][]): Skill[] {
  return skills.flat()
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [expanded, setExpanded] = useState(false)
  const allSkills = flattenSkills(skills)

  return (
    <div
      data-aos="fade-up"
      className="col-span-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden border border-white/30 dark:border-zinc-800 shadow-2xl shadow-zinc-200/40 dark:shadow-none"
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
          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 font-black text-xl ${
            expanded
              ? 'bg-orange-500 text-white rotate-45 shadow-lg shadow-orange-500/30'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          +
        </button>
      </div>

      {/* Scrolling skill strips */}
      <div className="pb-6 overflow-hidden">
        {skills.map((skillGroup, rowIdx) => (
          <div
            key={rowIdx}
            className={`flex gap-3 mb-3 ${rowIdx % 2 === 1 ? 'pl-8' : ''}`}
            style={{
              animation: `scroll-${rowIdx % 2 === 0 ? 'left' : 'right'} 30s linear infinite`,
            }}
          >
            {Array(3)
              .fill(skillGroup)
              .flat()
              .map((skill: Skill, i: number) => {
                const iconName = typeof skill.icon === 'string' ? skill.icon : null
                const Icon = iconName ? getIconByName(iconName) : null
                return (
                  <div
                    key={`${skill.name}-${i}`}
                    className={`flex-shrink-0 flex flex-col items-center justify-center gap-2 w-20 h-20 md:w-24 md:h-24 rounded-3xl text-white transition-transform hover:scale-110 ${skill.color}`}
                  >
                    {Icon && <Icon className="w-7 h-7 md:w-8 md:h-8" />}
                    <span className="text-[0.5rem] font-black uppercase tracking-widest text-center leading-tight px-1 opacity-90">
                      {skill.name}
                    </span>
                  </div>
                )
              })}
          </div>
        ))}
      </div>

      {/* Expanded grid */}
      {expanded && (
        <div className="px-8 pb-8 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <div className="flex flex-wrap gap-3">
            {allSkills.map((skill) => {
              const iconName = typeof skill.icon === 'string' ? skill.icon : null
              const Icon = iconName ? getIconByName(iconName) : null
              return (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-100/70 dark:bg-zinc-800/70 border border-zinc-200/50 dark:border-zinc-700/50"
                >
                  {Icon && (
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${skill.color}`}>
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {skill.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillsSection