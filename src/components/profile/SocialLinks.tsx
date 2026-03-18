import { SocialLink } from "@/src/types";
import { getIconByName } from "@/src/lib/utils/iconMap";

interface SocialLinksProps {
    links: SocialLink[]
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
    return (
        <div className="flex items-center justify-center gap-0 my-4 text-white sm:gap-1 md:gap-1 lg:gap-2">
            {links.map((link, index) => (
                <a
                    key={`${link.name ?? link.url}-${index}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative shadow-inner translate-y-5 even:-translate-y-5 -ml-3 sm:ml-0 rounded-full p-3 sm:p-4 md:p-5 lg:p-6 flex justify-center items-center transform transition ease-in-out duration-200 hover:scale-105 md:hover:scale-95 aspect-ratio h-full bg-gradient-to-tr text-white shadow-lg-middle dark:shadow-none ${link.shadow} ${link.color}`}
                    href={link.url}
                    aria-label={`Visit ${link.name ?? 'social profile'}`}
                >
                    {link.icon && (
                        (() => {
                            const iconName = typeof link.icon === 'string' ? link.icon : null
                            const Icon = iconName ? getIconByName(iconName) : link.icon
                            if (!Icon || typeof Icon === 'string') return null
                            return <Icon className="h-3 w-3 xs:h-4 xs:w-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-white" />
                        })()
                    )}
                </a>
            ))}
        </div>
    )
}

export default SocialLinks