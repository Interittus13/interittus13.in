import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from 'next/image'
import { me } from "../../config/me"

const LocationMap: React.FC = () => {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const emptyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    let src = emptyImage

    if (resolvedTheme === 'light') {
        src = me.location.light;
    } else if (resolvedTheme === 'dark') {
        src = me.location.dark;
    }

    return (
        <div className="relative w-full h-[300px] sm:h-[500px]">
            <Image
                className="absolute left-0 z-0 -top-1/4 sm:-top-3/5 lg:-top-9/10"
                fill
                style={{ objectFit: "cover" }}
                src={src}
                alt="map"
            />
        </div>
    )
}

export default LocationMap