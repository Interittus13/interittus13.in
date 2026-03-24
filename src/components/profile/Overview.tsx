'use client'

import React from 'react'
import EducationSection from './EducationSection'
import SkillsSection from './SkillsSection'
import { MeConfig } from '@/src/types'

interface OverviewProps {
  me: MeConfig
}

const Overview: React.FC<OverviewProps> = ({ me }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 select-none">

      {/* Row 1: Greeting + What I do*/}
      <div
        data-aos="fade-up"
        className="bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between min-h-40 md:min-h-48 shadow-xl shadow-violet-500/30"
      >
        <p className="text-xs font-black uppercase tracking-[0.25em] opacity-70">Hey there 👋</p>
        <div>
          <p className="text-2xl md:text-4xl font-black tracking-tighter leading-none mt-4">
            I&apos;m {me.name}
          </p>
          <p className="text-sm font-medium opacity-75 mt-2">@{me.nickname}</p>
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="md:row-span-2 bg-gradient-to-br from-emerald-400 to-cyan-500 text-white rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between min-h-48 shadow-xl shadow-emerald-500/20"
      >
        <p className="text-xs font-black uppercase tracking-[0.25em] opacity-70">Specialised in</p>
        <div className="my-6 text-center">
          <p className="text-xl md:text-2xl font-black leading-tight">
            Cloud Infrastructure,<br />DevOps & SRE
          </p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {['AWS', 'Kubernetes', 'Terraform', 'Docker'].map((t) => (
              <span
                key={t}
                className="bg-white/20 text-white text-[0.6rem] font-black uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs opacity-60 text-center">...and any other challenging technology</p>
      </div>

      <div
        data-aos="fade-up"
        className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between min-h-40 md:min-h-48 border border-white/30 dark:border-zinc-800 shadow-xl shadow-zinc-200/30 dark:shadow-none"
      >
        <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">I&apos;m a</p>
        <div className="mt-3">
          <p className="text-xl md:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
            DevOps Engineer
          </p>
          <p className="text-lg md:text-2xl font-black tracking-tighter text-zinc-400 dark:text-zinc-500 mt-0.5">
            & Cloud Architect
          </p>
        </div>
      </div>

      {/* Row 2: Skills full width */}
      <div className="md:col-span-2">
        <SkillsSection skills={me.skills} />
      </div>

      {/* Row 3: Education full width */}
      <div className="md:col-span-2">
        <EducationSection
          education={me.education}
          header={me.titles.journeyHeader}
          title={me.titles.journeyTitle}
        />
      </div>
    </div>
  )
}

export default Overview