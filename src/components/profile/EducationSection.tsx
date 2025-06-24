import { Colors } from "../../lib/utils/colors"
import { Education } from "../../types"

interface EducationSectionProps {
    education: Education[]
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
    return (
        <div
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
            className={`bg-white rounded-3xl overflow-hidden min-h-70 col-span-2 sm:col-span-1 flex flex-col relative justify-between dark:bg-true-gray-900`}
        >
            <p className={`p-4 xs:p-4.5 sm:p-6 md:p-8 text-2xl font-semibold text-left sm:text-2xl md:text-3xl lg:text-4xl z-10 z-50  line-clamp-1`}>
                Educations & Careers
            </p>
            <div className="flex flex-col justify-between h-full mt-1 mb-8 ">
                <div className="p-4 xs:p-4.5 sm:p-6 md:p-8 !pt-0 mb-10 sm:mb-8">
                    {education.map((edu) => (
                        <div className="flex items-center gap-2" key={edu.name}>
                            <div
                                className={`${Colors[edu.color].bg.msg} aspect-square h-3 rounded-full lg:h-4`}
                            />
                            <p className="text-sm text-true-gray-400 lg:text-lg">
                                {edu.degree}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col h-full items-center justify-end pb-4 xs:pb-4.5 sm:pb-6 md:pb-8">
                    <div className="bg-true-gray-300 w-full h-1.5 relative">
                        <div className="absolute px-4 xs:px-4.5 sm:px-6 md:px-8 grid grid-cols-10 w-full -top-6 lg:-top-10 items-end">
                            <div className="flex flex-col col-span-3 gap-1 lg:gap-2">
                                <div className="h-4 lg:h-6" />
                                <a
                                    className="filter hover:brightness-110"
                                    href="https://www.mju.ac.kr/us"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div
                                        className={`h-4 lg:h-6 ${Colors['blue'].bg.msg} rounded-full w-full relative ${Colors['blue'].text.msg}`}
                                        style={{ position: 'relative' }}
                                    // before="content-DEFAULT text-transparent absolute w-1/4 rounded-r-full h-full bg-blue-100 top-0 right-0"
                                    // after={`absolute xs:content-🇰🇷MJU content-🇰🇷MJU(LOA) tracking-wide font-semibold absolute -top-6 left-2`}
                                    >
                                        <div style={{
                                            position: 'absolute',
                                            content: '',
                                            width: '25%',
                                            height: '100%',
                                            borderTopRightRadius: '9999px',
                                            borderBottomRightRadius: '9999px',
                                            backgroundColor: 'rgba(219, 234, 254, 1)',
                                            top: 0,
                                            right: 0,
                                        }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '-24px',
                                            left: '8px',
                                            fontWeight: 600,
                                            letterSpacing: '0.025em'
                                        }}
                                        >
                                            🇰🇷MJU(LOA)
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-span-2" />
                            <a
                                className="col-span-3 filter hover:brightness-110"
                                href="https://linkareer.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div
                                    className={`h-4 lg:h-6 ${Colors['yellow'].bg.msg} ${Colors['yellow'].text.msg} rounded-full w-full relative`}
                                    style={{ position: 'relative' }}
                                // after="absolute content-👟NUDGE tracking-wide font-semibold absolute -top-6 left-0"
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: '-24px',
                                        left: '0',
                                        fontWeight: 600,
                                        letterSpacing: '0.025em',
                                    }}
                                    >
                                        👟NUDGE
                                    </div>
                                </div>
                            </a>
                            <a
                                className="col-span-2 filter hover:brightness-110"
                                href="https://www.heydealer.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div
                                    className={`h-4 lg:h-6 ${Colors['red'].bg.msg} ${Colors['red'].text.msg} rounded-full w-full relative`}
                                    style={{ position: 'relative' }}
                                // after="absolute content-🚙PRND tracking-wide font-semibold absolute -top-6 left-0"
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: '-24px',
                                        left: '0',
                                        fontWeight: 600,
                                        letterSpacing: '0.025em'
                                    }}
                                    >
                                        🚙PRND
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* year bar */}
                    <div className="w-full px-4 xs:px-4.5 sm:px-6 md:px-8 grid grid-cols-10 text-true-gray-300">
                        <div className="flex flex-col items-stretch justify-center col-span-2">
                            <div
                                className="mt-1 h-10 w-0.5 bg-true-gray-300 relative rounded-full"
                                style={{ position: 'relative' }}
                            // after="content-2019 absolute -bottom-6 -left-4"
                            >
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-24px',
                                    left: '-16px',
                                }}
                                >
                                    2019
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-center">
                            <div
                                className="mt-1 h-10 w-0.5 bg-true-gray-300 rounded-full relative"
                                style={{ position: 'relative' }}
                            // after="content-2020 absolute -bottom-6 -left-4"
                            >
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-24px',
                                    left: '-16px',
                                }}
                                >
                                    2020
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-center col-span-2">
                            <div
                                className="mt-1 h-10 w-0.5 bg-true-gray-300 rounded-full relative"
                                style={{ position: 'relative' }}
                            // after="content-2022 absolute -bottom-6 -left-4"
                            >
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-24px',
                                    left: '-16px',
                                }}
                                >
                                    2022
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-center col-span-3">
                            <div
                                className="mt-1 h-10 w-0.5 bg-true-gray-300 rounded-full relative"
                                style={{ position: 'relative' }}
                            // after="content-2024 absolute -bottom-6 -left-4"
                            >
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-24px',
                                    left: '-16px',
                                }}
                                >
                                    2024
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EducationSection