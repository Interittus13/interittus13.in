import React from 'react'
import { ModernProjectCard } from './ModernProjectCard'
import { Project } from '@/src/types'

interface ModernProjectSectionProps {
  projects: Project[]
}

export const ModernProjectSection: React.FC<ModernProjectSectionProps> = ({ projects }) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {projects.map((project, index) => (
        <ModernProjectCard key={project.name} project={project} index={index} />
      ))}
    </div>
  )
}
