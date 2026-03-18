import { Colors } from "@/src/lib/utils/colors"
import { OpenSource } from "@/src/types"

interface OpenSourceSectionProps {
    openSources: OpenSource[]
}

const OpenSourceSection: React.FC<OpenSourceSectionProps> = ({ openSources }) => {
    return (
        <>
            <h1 className={`text-2xl sm:text-3xl font-bold ${Colors['blue'].text.msg} mb-4`}>
                Open Source
            </h1>
            <div className="flex flex-col gap-8">
                {openSources?.map((openSource, idx) => (
                    <div key={idx}>
                        <div className="flex items-center justify-between">
                            <a
                                className=" font-semibold leading-5 md:text-lg mt-2"
                                href={openSource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {openSource.title}
                            </a>
                            <div className={`${Colors['blue'].text.msg} inline-block mt-3`}>
                                <a
                                    className={`transition-all duration-200 ease-in-out bg-bottom bg-no-repeat bg-no-underline-size hover:bg-underline-size bg-underline-blue text-sm md:text-normal`}
                                    style={{ position: 'relative' }}
                                    href={openSource.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {`Link `}
                                    <span>↗</span>
                                </a>
                            </div>
                        </div>
                        <div className="mb-2 inline text-xs md:text-sm text-true-gray-500 font-semibold">
                            {openSource.description}
                        </div>
                        <div className="my-3">
                            {openSource.tags.map((tag) => (
                                <span
                                    className={`inline-block text-[9px] mr-1 md:(text-xs mb-1) ${Colors[tag.color].bg.normal
                                        } ${Colors[tag.color].text.msg} px-2 py-1 rounded-full`}
                                    key={tag.name}
                                >
                                    {tag.name.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default OpenSourceSection