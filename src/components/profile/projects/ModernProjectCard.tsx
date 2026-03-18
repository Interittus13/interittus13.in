import React from 'react'
import Image from 'next/image'
import { Project } from '@/src/types'
import { Colors } from '@/src/lib/utils/colors'

interface ModernProjectCardProps {
  project: Project
  index: number
}

export const ModernProjectCard: React.FC<ModernProjectCardProps> = ({ project, index }) => {
  return (
    <div 
      className="group relative flex flex-col md:flex-row bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-white/20 dark:border-zinc-800/50 shadow-2xl shadow-zinc-200/50 dark:shadow-none transition-all duration-700 hover:scale-[1.01] hover:shadow-3xl mb-12"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            alt={project.name}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
             <Image
                src={project.logo.light}
                width={100}
                height={100}
                alt={project.name}
                className="opacity-20 group-hover:scale-125 transition-transform duration-700"
              />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent mix-blend-overlay" />
      </div>

      <div className="p-8 md:p-12 flex flex-col flex-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-zinc-800 group-hover:rotate-6 transition-transform duration-500">
            <Image
              src={project.logo.light}
              fill
              className="object-contain p-2"
              alt={`${project.name} logo`}
            />
          </div>
          <div>
             <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-none group-hover:text-orange-500 transition-colors duration-500">
                {project.name}
              </h3>
              {project.tip && (
                <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-orange-500/80 mt-1 block">
                  {project.tip}
                </span>
              )}
          </div>
        </div>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-8 max-w-xl opacity-90 group-hover:opacity-100 transition-opacity duration-500">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags?.map((tag) => (
            <span key={tag} className="px-4 py-1.5 rounded-full bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 text-[0.65rem] font-bold uppercase tracking-widest border border-zinc-200/50 dark:border-zinc-700/50">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-6">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-8 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-zinc-900/20 dark:shadow-white/10 transition-all hover:-translate-y-1 active:scale-95 group-hover:bg-orange-600 dark:group-hover:bg-orange-500 group-hover:text-white dark:group-hover:text-white"
          >
            Visit Website
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          
          {project.video && (
             <button className="hidden md:flex items-center gap-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-300">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-current">
                   <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                   </svg>
                </div>
                <span className="text-[0.65rem] font-black uppercase tracking-widest">Watch Demo</span>
             </button>
          )}
        </div>
      </div>
    </div>
  )
}
