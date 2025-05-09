import { useTheme } from "next-themes";
import { Project } from "../../../types";
import { Colors } from "../../../lib/colors";
import Image from 'next/image';

interface ProjectHeroProps {
    project: Project
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
    const { resolvedTheme } = useTheme();
    const logoSrc = resolvedTheme === "dark" ? project.logo.dark : project.logo.light

    return (
        <div className="relative flex flex-col items-center justify-center py-10 overflow-hidden bg-white md:pb-5 dark:bg-true-gray-900">
            <h1
                className={`${Colors['purple'].text.msg} text-4xl lg:text-6xl mb-15 font-bold text-center text-stroke-sm text-stroke-purple-500 uppercase text-transparent write-vertical-right  absolute right-2 top-4 md:(right-5 top-10)`}
                data-aos="fade-up"
            >
                Project
            </h1>
            <div
                data-aos="fade-up"
                className="mt-10 mb-4 aspect-ratio w-65 xs:w-70"
                id="hero"
            >
                <Image
                    src={logoSrc}
                    alt={project.name}
                    layout="responsive"
                    width={525}
                    height={160}
                />
            </div>
            <p
                className="my-4 text-3xl font-bold text-center max-w-120 md:text-4xl md:max-w-180"
                data-aos="fade-up"
            >
                {project.description}
            </p>
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-aos="fade-up"
                className="px-3 py-1 text-blue-400 border-blue-400 rounded-full border-3"
            >
                Explore
            </a>
            <div data-aos="fade-up" className="flex justify-center">
                <div className="flex w-full mt-8" id={`${project.name}-images`}>
                    <div className="w-[520px] h-[360px] md:(w-[620px] h-[420px]) lg:(w-[940px] h-[570px])">
                        <Image
                            src={project.image!}
                            alt={project.name}
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectHero