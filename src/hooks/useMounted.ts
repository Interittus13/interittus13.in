import { useEffect, useState } from "react"

/**
 * React hook to determine if the component is mounted.
 * @returns {boolean}
 */
export const useMounted = (): boolean => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    
    return mounted;
}