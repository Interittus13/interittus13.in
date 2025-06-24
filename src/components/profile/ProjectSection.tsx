import { Colors } from "../../lib/utils/colors";
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
                <div className="lg:mx-20">
                    <div
                        data-aos="fade-up"
                        className={`bg-white rounded-3xl border-[0.5px] border-true-gray-100 relative overflow-hidden my-5 transform rotate-0 dark:bg-true-gray-900 border-true-gray-800`}
                    >
                        <div className="m-5 xs:m-8 md:m-8">
                            <div className="my-10">
                                <ProjectCarousel projects={otherProjects} />
                                <div data-aos="fade-up" className="flex justify-center">
                                    <a
                                        className={`transition-all duration-200 ease-in-out transform ${Colors['purple'].text.msg} bg-white hover:text-white hover:bg-purple-500 border-2 border-purple-500 rounded-full dark:bg-true-gray-900 hover:bg-purple-500`}
                                        href={me.social[0].url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <p
                                            className={`text-sm font-semibold inline-block text-center px-4 py-3`}
                                        >
                                            Explore More
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ListLayout>
        </>
    )
}

export default Project