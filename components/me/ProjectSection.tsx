import { Colors } from "../../lib/colors";
import { MeConfig } from "../../types";
import ListLayout from "../layout/ListLayout";
import ProjectCarousel from "./projects/ProjectCarousel";
import ProjectHero from "./projects/ProjectHero";

interface ProjectProps {
    me: MeConfig
}

const Project: React.FC<ProjectProps> = ({ me }) => {
    const spotlightProject = me.projects.find(p => p.spotlight)
    const otherProjects = me.projects.filter(p => !p.spotlight)

    return (
        <>
            <ProjectHero project={spotlightProject!} />

            <ListLayout>
                <div className="my-10">
                    {otherProjects.map((project) => (
                        <ProjectCarousel key={project.name} project={project} />
                    ))}
                    <div data-aos="fade-up" className="flex justify-center">
                        <a
                            className={`transition-all duration-200 ease-in-out transform ${Colors['purple'].text.msg} bg-white hover:text-white hover:bg-purple-500 border-2 border-purple-500 rounded-full`}
                            href={me.social[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            dark="bg-true-gray-900 hover:bg-purple-500"
                        >
                            <p
                                className={`text-sm font-semibold inline-block text-center px-4 py-3`}
                            >
                                Explore More
                            </p>
                        </a>
                    </div>
                </div>
            </ListLayout>
        </>
    )
}

export default Project