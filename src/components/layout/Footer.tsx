import Image from 'next/image'
import Link from 'next/link'
import {
  type IconType,
  SiNextdotjs,
  SiNotion,
  SiTailwindcss,
  SiVercel,
} from '@icons-pack/react-simple-icons'
import ThemeSwitch from './ThemeSwitch'
import { useTheme } from 'next-themes'
import { me } from '@/src/config/me'

const FOOTER_TOOLS: { icon: IconType, url: string }[] = [
  { icon: SiNotion, url: 'https://developers.notion.com' },
  { icon: SiNextdotjs, url: 'https://nextjs.org' },
  { icon: SiTailwindcss, url: 'https://windicss.org' },
  { icon: SiVercel, url: 'https://vercel.com' },
  ]

/**
 * Footer Bar component.
 */
const Footer: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const thisYear = new Date().getFullYear()

  return (
    <footer className="relative bg-true-gray-100 dark:bg-true-gray-800">
      <div className="flex flex-col px-6 mx-auto items-left lg:px-11 lg:w-screen-lg">
        <nav className="py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/static/images/portrait.png"
              width={18}
              height={18}
              alt="morethanmin"
            />
          </Link>
          <ThemeSwitch />
        </nav>

        {/* Main Footer Content */}
        <section className="pt-2 pb-5 text-true-gray-400 dark:text-true-gray-500">
          <div className="flex justify-between w-full pb-2 my-2 text-xs border-b border-footer items-end dark:border-true-gray-700">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                Powered by
                <span
                  className="inline-flex px-2 py-1 mx-2 space-x-2 bg-true-gray-200 rounded-full place-items-center dark:bg-true-gray-700"
                >
                  {FOOTER_TOOLS.map((tool) => (
                    <a
                      key={tool.url}
                      className="leading-0  hover:text-true-gray-600 dark:hover:text-white"
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${tool.url}`}
                    >
                      <tool.icon size={12} />
                    </a>
                  ))}
                </span>
              </div>

              {/* Credits */}
              <p className="group">
                Design & Build with{' '}
                <span className="group-hover:text-red-400 transition-colors duration-500 ease-in-out">
                  ❤
                </span>{' '}
                by{' '}
                <a
                  className="text-true-gray-600 hover:underline dark:text-true-gray-400"
                  href="https://github.com/interittus13"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {me.nickname}
                </a>
              </p>
            </div>
            {/* <p className="flex flex-col items-end">
              <a
                className="hover:underline"
                href="https://morethan-log.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Old Blog
              </a>
            </p> */}
          </div>

          {/* Bottom copyright */}
          <div className="text-xs flex justify-between">
            <div>
              <span>
                {`Copyright © 2020-${thisYear} `}
                <Link href={'/me'} className="text-true-gray-600 hover:underline dark:text-true-gray-400">
                    {me.name}
                </Link>
              </span>
            </div>
            <span>
              <a
                className="text-true-gray-600 hover:underline dark:text-true-gray-400"
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY-NC-SA 4.0
              </a>
            </span>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer
