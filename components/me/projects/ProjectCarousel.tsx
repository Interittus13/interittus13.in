import Image from "next/image";
import { Colors } from "../../../lib/colors";
import { Project } from "../../../types";
import { useCallback, useEffect, useState } from "react";

interface ProjectCarouselProps {
    projects: Project[]
    autoSlideInterval?: number
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, autoSlideInterval = 10000 }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    // const [isTransitioning, setIsTransitioning] = useState(false)

    const gotoNextSlide = useCallback(() => {
        if (projects?.length <= 1) return

        // setIsTransitioning(true)
        // setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length)
        // setIsTransitioning(false)
        // }, 500)
    }, [projects])

    useEffect(() => {
        const interval = setInterval(gotoNextSlide, autoSlideInterval)
        return () => clearInterval(interval)
    }, [gotoNextSlide, autoSlideInterval, projects])

    if (!projects || projects.length === 0) return null

    if (projects.length === 1) {
        return <SingleProject project={projects[0]} />
    }

    return (
        <div className="relative w-full min-h-[600px] overflow-hidden rounded-xl">
            {/* Progress indicators */}
            < div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2" >
                {
                    projects.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 rounded-full transition-all duration-500 ${index === activeIndex
                                ? 'bg-white w-4'
                                : 'bg-white/50'
                                }`}
                        />
                    ))
                }
            </div >

            {/* Carousel container */}
            {projects.map((project, index) => (
                <div
                    key={project.name}
                    className={`
                absolute insert-0 transition-opacity duration-700 ease-in-out
                ${index === activeIndex ? 'opacity-100 z-10 animate-fade-in' : 'opacity-0 z-0'}
              `}
                >
                    <SingleProject project={project} />
                </div>
            ))
            }
        </div>
    )
}

const SingleProject: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex flex-col justify-start h-70 md:h-120 md:m-4">
                <h1
                    className={`text-2xl sm:text-3xl font-bold ${Colors['purple'].text.msg}`}
                >
                    Project
                </h1>
                <div className="flex flex-col items-start justify-center h-full">
                    <div className="flex flex-row-reverse items-center gap-3 md:flex-col md:items-start">
                        <div className="mb-4 aspect-ratio w-15 xs:w-20">
                            <Image
                                src={project.logo.light}
                                alt="pokemon"
                                layout="responsive"
                                width="100"
                                height="100"
                            />
                        </div>
                        <p className="mb-2 text-2xl font-bold xs:text-3xl md:text-4xl lg:text-5xl">
                            {project.name}
                        </p>
                    </div>
                    <p className="mb-4 font-medium text-normal xs:text-lg lg:text-xl text-true-gray-400">
                        {project.description}
                    </p>
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-aos="fade-up"
                        className="px-3 py-1 text-blue-400 border-blue-400 rounded-full border-3"
                    >
                        Source Code
                    </a>
                </div>
            </div>
            {project['video'] ? (
                <div
                    className="-top-1 md:top-0 relative h-120 w-full -left-9 xs:-left-1.5 sm:left-0"
                    data-aos="fade-up"
                >
                    <div className="absolute h-150 w-99.5 -top-0.9 left-7.9 md:left-4.2 lg:left-13.7">
                        <Image
                            className="absolute z-10 top-4 left-10"
                            src="/static/images/iphone_case_shadow.png"
                            alt={project.name}
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <video
                        className="absolute z-0 w-53 left-11.5 top-10 md:(left-8) lg:(top-10 left-17.5 w-53)"
                        src={project['video']}
                        preload="none"
                        playsInline
                        autoPlay
                        loop
                        muted
                    ></video>
                </div>
            ) : null}
        </div>
    )
}

export default ProjectCarousel