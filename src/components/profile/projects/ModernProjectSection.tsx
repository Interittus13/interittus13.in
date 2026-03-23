import React from 'react'
import { ModernProjectCard } from './ModernProjectCard'
import { ProjectSpotlight } from './ProjectSpotlight'
import { SmallProjectCard } from './SmallProjectCard'
import { Project } from '@/src/types'

interface ModernProjectSectionProps {
  projects: {
    employee: Project[]
    freelancer: Project[]
    openSource: Project[]
    other: Project[]
  }
  titles: Record<string, string>
}

export const ModernProjectSection: React.FC<ModernProjectSectionProps> = ({ projects, titles }) => {
  return (
    <div className="w-full">
      {/* 1. Spotlight Section (Carousel) */}
      <ProjectSpotlight 
        projects={projects.employee} 
        header={titles.spotlightHeader} 
        title={titles.spotlightTitle} 
      />

      <div className="max-w-5xl mx-auto px-5 md:px-8">
        {/* 1.5. Freelancer Section (Large Cards) */}
        {projects.freelancer.length > 0 && (
          <div className="mb-24">
            <div className="flex flex-col mb-12" data-aos="fade-right">
              <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orange-500 mb-2">
                {titles.freelancerHeader}
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
                {titles.freelancerTitle}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-4" />
            </div>
            <div className="grid grid-cols-1 gap-12">
              {projects.freelancer.map((project, index) => (
                <ModernProjectCard key={project.name} project={project} index={index} />
              ))}
            </div>
          </div>
        )}
        {/* 2. Open Source Section (Large Cards) ... */}
        {projects.openSource.length > 0 && (
          <div className="mb-24">
            <div className="flex flex-col mb-12" data-aos="fade-right">
              <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orange-500 mb-2">
                {titles.openSourceHeader}
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
                {titles.openSourceTitle}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-4" />
            </div>
            {/* ... */}
            <div className="grid grid-cols-1 gap-12">
              {projects.openSource.map((project, index) => (
                <ModernProjectCard key={project.name} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* 3. Other Projects (Small Cards Grid) */}
        {projects.other.length > 0 && (
          <div className="mb-24">
            <div className="flex flex-col mb-12" data-aos="fade-right">
              <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orange-500 mb-2">
                {titles.otherHeader}
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
                {titles.otherTitle}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.other.map((project, index) => (
                <SmallProjectCard key={project.name} project={project} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
