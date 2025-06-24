import { MeConfig } from "../../types"
import EducationSection from "./EducationSection"
import LocationCard from "./LocationCard"
import OpenSourceSection from "./OpenSourceSection"
import SkillsSection from "./SkillsSection"
import SocialLinks from "./SocialLinks"

interface OverviewProps {
    me: MeConfig
}

const Overview: React.FC<OverviewProps> = ({ me }) => {
    const style = 'bg-white rounded-3xl p-4 xs:p-4.5 sm:p-6 md:p-8 min-h-25 sm:min-h-37 flex flex-col justify-between transform rotate-0 overflow-hidden dark:bg-true-gray-900'

    return (
        <div className="grid grid-cols2 gap-3 select-none md:gap-6">
            <div
                data-aos="fade-up"
                data-aos-duration="800"
                className={`${style} bg-gradient-to-br from-[#a78bfa] to-[#d946ef] text-white`}
            >
                <div className="text-xs font-semibold xs:text-lg md:text-xl">
                    Hey there 👋
                </div>
                <div className="text-lg font-semibold xs:text-xl sm:text-3xl md:text-4xl whitespace-nowrap">
                    {`I'm ${me.name}`}
                </div>
            </div>

            <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
                className={`${style} row-span-2 text-white bg-gradient-to-br from-green-400 to-blue-500`}
            >
                <p className="text-xs font-semibold xs:text-lg md:text-xl">
                    Intersted in
                </p>
                <div className="text-center">
                    <p className="text-sm font-semibold xs:text-xl sm:text-2xl md:text-3xl">
                        Web & Mobile Development, <br /> Tech Startup
                    </p>
                </div>
                <p className="text-xs text-center sm:text-sm text-true-gray-100">
                    ... and any other interesting or challenging technology
                </p>
            </div>

            <div
                data-aos="fade-up"
                data-aos-duration="800"
                className={`${style} justify-between`}
            >
                <p className="text-xs font-semibold xs:text-lg md:text-xl">{`I'm a`}</p>
                <div className="text-sm font-semibold xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    <div>
                        <span className="inline-block mr-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                            Frontend Developer
                        </span>
                        {/* <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
                Designer
              </span> */}
                    </div>
                    <div>
                        <span className="inline-block mr-2 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-500">
                            Gamer
                        </span>
                        <span className="inline-block mr-2 text-transparent bg-clip-text bg-gradient-to-r from-true-gray-400 to-gray-500">
                            Writer
                        </span>
                        <span className="inline-block text-xs text-red-500 line-through xs:text-sm ">
                            Musician
                        </span>
                    </div>
                </div>
            </div>

            <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
                className={`${style} text-center`}
            >
                <p className="text-sm font-semibold text-left xs:text-lg sm:text-xl md:text-3xl lg:text-4xl">
                    Love{' '}
                    <span className="text-white text-stroke-1 text-stroke-orange-500">
                        Open Source
                    </span>
                </p>
                <p className="text-xs font-semibold xs:text-lg sm:text-xl lg:text-2xl">
                    &
                </p>
                <p className="text-sm font-semibold text-right xs:text-lg sm:text-xl md:text-3xl lg:text-4xl whitespace-nowrap">
                    <span className="italic text-transparent bg-gradient-to-br from-pink-300 to-purple-300 bg-clip-text">
                        Exquisite
                    </span>{' '}
                    Things
                </p>
                {/* {` and `} */}
            </div>

            <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="400"
                className={`${style} overflow-hidden !justify-end relative`}
            >
                <p
                    className="z-10 py-2 px-4 xs:px-4.5 sm:px-3 md:px-6 -m-4 xs:-m-4.5 sm:-m-6 md:-m-8 text-xs sm:text-lg font-semibold opacity-90 bg-gray-200 md:text-xl
                    dark:bg-gray-700"
                >
                    <span className="text-gray-600 dark:text-gray-400">Located in</span>
                    {` ${me.location.name}`}
                </p>
                <LocationCard location={me.location} />
            </div>

            <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
                className={`${style} col-span-2 gap-3  relative !flex-row items-center`}
            >
                <p className="z-10 text-sm font-semibold text-left xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl whitespace-nowrap">
                    Find me on 👉
                </p>
                <SocialLinks links={me.social} />
            </div>

            <SkillsSection skills={me.skills} />
            <EducationSection education={me.education} />
            <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
                className={`${style} col-span-2 gap-3  relative !flex-row items-center`}
            >
                <OpenSourceSection openSources={me.openSources} />
            </div>
        </div>
    )
}

export default Overview