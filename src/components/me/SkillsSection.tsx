import { useState } from "react";
import { Skill } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface SkillsSectionProps {
    skills: Skill[][]
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
    const [more, setMore] = useState(false)

    const handleMore = () => {
        setMore(!more)
    }

    return (
        <div
            data-aos="fade-up"
            data-aos-duration="800"
            className={`bg-white rounded-3xl overflow-hidden min-h-25 sm:min-h-37 col-span-2 sm:col-span-1 flex flex-col relative justify-between dark:bg-true-gray-900`}
        >
            <div
                className={`absolute transition duration-200  ease-in-out h-full w-full bg-true-gray-900 z-40 rounded-3xl text-white ${more ? 'opacity-100' : 'opacity-0'
                    } overflow-auto scrollbar-hide justify-between flex flex-col`}
            >
                <p
                    className="p-4 xs:p-4.5 sm:p-6 md:p-8  text-sm font-semibold text-left xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl z-50 line-clamp-1 text-transparent"
                >
                    Technical Skills
                </p>
                <div className="flex flex-col justify-end items-start w-full p-4 xs:p-4.5 sm:p-6 md:p-8 gap-3 lg: gap-4">
                    {skills.map((skillGroup, index) => (
                        <div className="flex flex-wrap gap-1 lg:gap-3" key={index}>
                            {skillGroup.map((skill, i) => (
                                <div
                                    className="flex flex-row gap-1 text-xs xs:text-sm md:text-normal lg:text-lg place-items-center"
                                    key={skill.name + i.toString()}
                                >
                                    {skill.icon && (
                                        <skill.icon
                                            className={`w-3 h-3 lg:(w-5 h-5) p-1 rounded-full ${skill.color}`}
                                        />
                                    )}
                                    {skill.name}
                                </div>
                            ))}
                            ...
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row items-center justify-between p-4 xs:p-4.5 sm:p-6 md:p-8">
                <p
                    className={`text-2xl font-semibold text-left sm:text-2xl md:text-3xl lg:text-4xl z-10 z-50  line-clamp-1 ${more ? 'text-white dark:text-black' : 'text-black dark:text-white'
                        }`}
                >
                    Technical Skills
                </p>
                <button
                    className={`h-full aspect-square grid place-items-center transition duration-500  ease-in-out z-50 hover:cursor-pointer transform ${more
                        ? 'rotate-45 bg-white text-black hover:bg-true-gray-200'
                        : 'rotate-0 bg-black text-white hover:bg-true-gray-500'
                        } rounded-full dark:bg-true-gray-900`}
                    onClick={handleMore}
                    aria-label={more ? "Close skills details" : "Show skills details"}
                >
                    <FontAwesomeIcon
                        className="md:(transform scale-150)"
                        icon={faPlus}
                    />
                </button>
            </div>
            <div className="pb-4 xs:pb-4.5 sm:pb-6 lg:pb-8">
                {skills.map((skillGroup, i) => (
                    <div className={`${i === 1 ? 'my-1 md:my-1 lg:my-2' : ''}`} key={i}>
                        <div className="w-[1560px] animate-scroll-md lg:(w-[2200px] animate-scroll-lg) flex justify-between">
                            {Array(20)
                                .fill(0)
                                .map((_, index) => skillGroup[index % skillGroup.length])
                                .map((skill, skillIndex) => (
                                    <div
                                        className={`w-[78px] mx-[4px] h-[70px] rounded-xl lg:(w-[110px] mx-[5px] h-[100px] rounded-3xl) text-white grid place-items-center ${skill.color
                                            } ${i === 1
                                                ? 'transform -translate-x-5 sm:-translate-x-10 lg:-translate-x-15'
                                                : ''
                                            }`}
                                        key={skill.name + skillIndex.toString()}
                                    >
                                        {skill.icon && (
                                            <skill.icon className="w-9 h-9 lg:(w-12 h-12)" />
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
                {/* <div className="slider">
                  <div className="duration-1000 ease-linear slide-track animate-scroll-lg">
                      {Array(20).fill(0).map((_, index) => skills[0][index % skills[0].length]).map(s =>
                          <div className={`slide ${s.color}`} key={s.name}>
                              <s.icon size="50"></s.icon>
                          </div>)
                      }
                  </div>
              </div>
              <div className="my-2 slider">
                  <div className="duration-1000 ease-linear slide-track animate-scroll-lg">
                      {Array(20).fill(0).map((_, index) => skills[1][index % skills[1].length]).map(s =>
                          <div className={`slide ${s.color} transform -translate-x-15`} key={s.name}>
                              <s.icon size="50"></s.icon>
                          </div>)
                      }
                  </div>
              </div>
              <div className="slider">
                  <div className="duration-1000 ease-linear slide-track animate-scroll-lg">
                      {Array(20).fill(0).map((_, index) => skills[2][index % skills[2].length]).map(s =>
                          <div className={`slide ${s.color}`} key={s.name}>
                              <s.icon size="50"></s.icon>
                          </div>)
                      }
                  </div>
              </div> */}
            </div>
        </div>
    )
}

export default SkillsSection