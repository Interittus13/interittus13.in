import React from 'react'
import Image from 'next/image'
import { Project } from '@/src/types'

interface SmallProjectCardProps {
  project: Project
  index: number
}

export const SmallProjectCard: React.FC<SmallProjectCardProps> = ({ project, index }) => {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-white/50 dark:bg-zinc-900/50 backdrop-blur-3xl rounded-[2.5rem] p-6 border border-white/20 dark:border-zinc-800/50 shadow-xl shadow-zinc-200/50 dark:shadow-none transition-all duration-500 hover:scale-[1.02] hover:bg-white dark:hover:bg-zinc-800"
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 p-2 shadow-sm group-hover:rotate-6 transition-transform">
          <Image
            src={project.logo.light}
            fill
            className="object-contain p-0.5"
            alt={project.name}
          />
        </div>
        <div>
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-none group-hover:text-orange-500 transition-colors">
            {project.name}
          </h3>
          <p className="text-[0.6rem] font-bold text-zinc-400 uppercase tracking-widest mt-1">
             Personal Project
          </p>
        </div>
      </div>
      
      <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed line-clamp-2 italic opacity-80 group-hover:opacity-100">
        &quot;{project.description}&quot;
      </p>
      
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1">
        <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </a>
  )
}
