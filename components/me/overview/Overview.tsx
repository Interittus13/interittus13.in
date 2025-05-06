import { memo, useEffect, useState } from "react";
import Aos from "aos";
import { AboutSection } from "./AboutSection";

const Overview = () => {
    const [showTechnicalSKills, setShowTechnicalSkills] = useState(true)

    useEffect(() => {
        Aos.init({ once: true, duration: 600 })
    }, [])

    return (
        <Section id="overview" title="Overview">
            <AboutSection />
            <InterestSection />
            <SkillsSection
                showTechnical={showTechnicalSKills}
                toggleView={() => setShowTechnicalSkills(!showTechnicalSKills)}
            />
            <TimelineSection />
        </Section>
    )
}

export default memo(Overview)