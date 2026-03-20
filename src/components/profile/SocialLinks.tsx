import { SocialLink } from "@/src/types";
import { getIconByName } from "@/src/lib/utils/iconMap";

interface SocialLinksProps {
    links: SocialLink[]
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
    return (
        <div className="flex items-center gap-3 sm:gap-4 my-4 text-white overflow-x-auto pb-4 scrollbar-hide">
            {links.map((link, index) => (
                <a
                    key={`${link.name ?? link.url}-${index}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative rounded-2xl md:rounded-3xl p-3.5 sm:p-4 md:p-5 lg:p-6 flex justify-center items-center transform transition ease-in-out duration-300 hover:scale-110 active:scale-95 bg-gradient-to-tr text-white shadow-lg dark:shadow-none shrink-0 ${link.color} ${index % 2 === 0 ? 'md:translate-y-2' : 'md:-translate-y-2'}`}
                    href={link.url}
                    aria-label={`Visit ${link.name ?? 'social profile'}`}
                >
                    {link.icon && (
                        (() => {
                            const iconName = typeof link.icon === 'string' ? link.icon : null
                            const Icon = iconName ? getIconByName(iconName) : link.icon
                            if (!Icon || typeof Icon === 'string') return null
                            return <Icon className="h-4 w-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-white" />
                        })()
                    )}
                </a>
            ))}
        </div>
    )
}

export default SocialLinks