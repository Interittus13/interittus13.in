'use client'

import { useTheme } from "next-themes"
import Image from 'next/image'
import { useMounted } from "@/src/hooks/useMounted"
import { Location } from "@/src/types"

interface LocationProps {
    location: Location
}

const LocationCard: React.FC<LocationProps> = ({ location }) => {
    const { resolvedTheme } = useTheme()
    const mounted = useMounted()

    const mapSrc = mounted ?
        (resolvedTheme === 'dark' ? location.map.dark : location.map.light) : null

    return (
        <>
            {mounted && mapSrc && (
                <Image
                    className="absolute left-0 z-0 -top-1/4 sm:-top-3/5 lg:-top-9/10"
                    fill
                    style={{ objectFit: "cover" }}
                    src={mapSrc}
                    alt={`Map of ${location.name}`}
                    blurDataURL="'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'"
                    placeholder="blur"
                    priority={false}
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            )}
        </>
    )
}

export default LocationCard