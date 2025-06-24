import { useTheme } from 'next-themes'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import { useMounted } from '../../hooks/useMounted'

const themes = ["light", "dark", "system"] as const
const themesText = ["Light", "Dark", "Auto"] as const

/**
 * Theme switch component that allows users to toggle between light, dark, and system themes.
 */
const ThemeSwitch = () => {
    const mounted = useMounted()
    const { theme, setTheme } = useTheme()

    // Avoid rendering on SSR to prevent hydration mismatch
    if (!mounted) return null

    return (
        <Tab.Group
            defaultIndex={themes.indexOf((theme as typeof themes[number]) || "system")}
            onChange={index => setTheme(themes[index])}
        >
            <Tab.List className="text-xs font-light rounded-full border-blue-500 border-1">
                {themesText.map((text, i) => ( 
                    <Tab as={Fragment} key={text}>
                        {({ selected }: { selected: boolean }) => (
                        <button
                            className={`w-11 bg-transparent px-1 ${
                                selected ? 'bg-blue-500 text-white rounded-full p-0.5 m-[1px]' : 'text-blue-500'
                            }`}
                        >
                            {text}
                        </button>
                        )}
                    </Tab>
                ))}
            </Tab.List>
        </Tab.Group>
    )
}

export default ThemeSwitch