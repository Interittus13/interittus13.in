import Link from 'next/link'
import { Fragment, ReactNode } from 'react'
import { Menu, Transition } from '@headlessui/react'

import TagsIcon from '@/src/assets/tags.svg'
import CategoriesIcon from '@/src/assets/categories.svg'
import FriendsIcon from '@/src/assets/friends.svg'
import MeIcon from '@/src/assets/me.svg'
import MenuIcon from '@/src/assets/menu.svg'

<<<<<<<< HEAD:src/components/layout/Navbar.tsx
import { Colors } from '@/src/lib/utils/colors'
import { useRouter } from 'next/router'
import { CONFIG } from '@/src/config/blog'
========
import PostToc from './PostToc'
import { Colors } from '../lib/colors'
import { useRouter } from 'next/router'
import { CONFIG } from '../../config/blog'
>>>>>>>> d9a87f57ecf39d0c8edfc5a86eb2e6075acbfe03:src/components/Navbar.tsx

// Navigation items for the main navbar
const NAV_ITEMS = [
  {
    name: 'Tags',
    link: '/tags',
    icon: <TagsIcon />,
    color: Colors['pink'].text.normal,
    width: 'group-hover:w-9.5',
  },
  {
    name: 'Categories',
    link: '/categories',
    icon: <CategoriesIcon />,
    color: Colors['orange'].text.normal,
    width: 'group-hover:w-21.5',
  },
  // {
  //   name: 'Friends',
  //   link: '/friends',
  //   icon: <FriendsIcon />,
  //   color: Colors['blue'].text.normal,
  //   width: 'group-hover:w-15.5',
  // },
  {
    name: 'Me',
    link: '/me',
    icon: <MeIcon />,
    color: Colors['red'].text.normal,
    width: 'group-hover:w-6.5',
  },
]

const MenuItemLink: React.FC<{
  href: string
  className?: string
  children: ReactNode
}> = ({ href, children, className, ...rest }) => {
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  )
}

/**
 * Main navigation bar component.`
 */
const Navbar: React.FC = () => {
  const path = useRouter().asPath

  return (
    <header
      className="sticky top-0 z-50 font-bold bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-200 border-b-[0.5px] border-b-true-gray-100
      dark:bg-true-gray-900/70 border-b-true-gray-800"
      data-aos="fade-down"
      id="navbar"
    >
      <div className="flex items-center justify-between px-6 py-3 mx-auto lg:px-11 lg:w-screen-lg whitespace-nowrap">
        <div className="z-50">
          <Link href="/">{CONFIG.BLOG_TITLE}</Link>
        </div>

        <div className="flex items-center">
          {/* // TODO: TOC */}
          {/* {isPost && (
            <Menu>
              <Menu.Button className="flex items-center px-0 m-0 mr-6 z-50">
                {({ open }) => (!open && <TocIcon /> || <TocFillIcon />)}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform opacity-0"
                enterTo="transform opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
              >
                <Menu.Items
                  className="absolute top-0 left-0 w-full h-100vh bg-true-gray-900/50 backdrop-filter backdrop-blur-sm
                  dark:bg-true-gray-900/70"
                >
                  <Menu.Item>
                    <div className="flex place-items-center w-full h-full">
                      <div
                        className="mx-5 w-full sm:mx-auto md:w-150 overflow-scroll bg-white rounded-3xl scrollbar-hide
                        dark:bg-black"
                      >
                        <PostToc blocks={toc} />
                      </div>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )} */}

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center justify-center space-x-5">
            {NAV_ITEMS.map((item, i) => (
              <Link href={item.link} key={i} className="flex items-center justify-center space-x-1 group">
                {item.icon}
                <span className={`w-0 overflow-hidden ease-in-out transition-all duration-600 ${item.color} ${item.width}`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Menu */}
          <div className="block sm:hidden">
            <Menu as="div" className="relative text-left ">
              <Menu.Button className="flex items-center px-0 m-0 text-current bg-transparent cursor-pointer rounded-3xl focus:outline-none">
                {({ open }) => (
                  <MenuIcon
                    className={`transition-transform duration-300 ease-in-out transform ${
                      open ? 'scale-y-flip' : ''
                    }`}
                  />
                )}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items
                  className="absolute right-0 w-40 p-2 mt-5 origin-top-right shadow-md bg-white/70 rounded-3xl ring-0 focus:outline-none backdrop-filter backdrop-blur-lg backdrop-saturate-200
                  dark:bg-true-gray-900/70"
                >
                  {NAV_ITEMS.map((item, i) => (
                    <div key={i}>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={item.link}
                            className={`focus:outline-none p-2 flex items-center group ${
                              active &&
                              'bg-true-gray-100 rounded-3xl p-2 dark:hover:bg-dark-800'
                            }`}
                          >
                            {item.icon}
                            <span className={`pl-2 ${item.color}`}>{item.name}</span>
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          {/* <Toggle /> */}
        </div>
      </div>
    </header>
  )
}

export default Navbar
