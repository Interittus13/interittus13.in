"use client"

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Project } from '@/src/types'

interface ProjectSpotlightProps {
  projects: Project[]
  header: string
  title: string
}

export const ProjectSpotlight: React.FC<ProjectSpotlightProps> = ({ projects, header, title }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  if (projects.length === 0) return null

  // Drag-to-scroll handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const onMouseUp = () => setIsDragging(false)
  const onMouseLeave = () => setIsDragging(false)

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div className="relative w-full overflow-hidden mb-24">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-5 md:px-8 mb-14 text-center" data-aos="fade-up">
        <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orange-500 mb-2">
          {header}
        </p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-4 mx-auto" />
      </div>

      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className={`flex gap-6 overflow-x-auto px-5 md:px-12 pb-10 snap-x snap-mandatory scrollbar-hide no-scrollbar cursor-grab active:cursor-grabbing select-none ${
          projects.length <= 2 ? 'md:justify-center' : 'justify-start'
        }`}
      >
        {projects.map((project, i) => (
          <div 
            key={project.name}
            className="flex-shrink-0 w-[85vw] md:w-[500px] lg:w-[600px] snap-center py-4"
            data-aos="fade-left"
            data-aos-delay={i * 150}
          >
            <div className="group relative h-[400px] md:h-[450px] rounded-[3.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-white/20 dark:border-zinc-800/50 shadow-2xl transition-all duration-700 hover:scale-[1.02] hover:shadow-orange-500/10 hover:shadow-3xl">
              {/* Background Video/Image */}
              {project.image ? (
                <Image
                  src={project.image}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                  alt={project.name}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900" />
              )}
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/30 backdrop-blur-md bg-white/10 p-2 shadow-lg group-hover:rotate-12 transition-transform duration-500">
                    <Image
                      src={project.logo.light}
                      fill
                      className="object-contain p-1"
                      alt={project.name}
                    />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter italic">
                    {project.name}
                  </h3>
                </div>
                
                <p className="text-lg text-white/80 font-medium leading-relaxed mb-8 max-w-md line-clamp-2 md:line-clamp-none group-hover:text-white transition-colors duration-500">
                  {project.description}
                </p>

                <div className="flex items-center gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-8 py-3.5 bg-white text-zinc-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:bg-orange-500 hover:text-white hover:-translate-y-1 active:scale-95"
                  >
                    View Project
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Spacer for end of scroll - Only if many projects */}
        {projects.length > 2 && <div className="flex-shrink-0 w-8 md:w-32 h-1" />}
      </div>
    </div>
  )
}
