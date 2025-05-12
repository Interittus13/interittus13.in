import ListLayout from '../components/layout/ListLayout'
import { me } from '../../config/me'
import Image from 'next/image'
import { useEffect } from 'react'
import { NextSeo } from 'next-seo'
import { CONFIG } from '../../config/blog'
import { useRouter } from 'next/router'
import Overview from '../components/me/Overview'
import Project from '../components/me/ProjectSection'


const Me: React.FC = () => {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const handleScroll = () => {
    const navBar = document.getElementById('navbar')
    const hero = document.getElementById('hero')
    const imagesBounding = document.getElementById('coquality-images')
    const images = document.querySelectorAll(
      '#coquality-images > :nth-child(odd)'
    )

    images.forEach((image: any) => {
      if (hero!.getBoundingClientRect().top - navBar!.clientHeight <= 0) {
        image.style.transform = `translateY(-${(window.scrollY - imagesBounding!.getBoundingClientRect().bottom) / 40
          }px)`
      }
    })
  }
  const router = useRouter()

  return (
    <>
      <NextSeo
        title={`Me | ${CONFIG.BLOG_TITLE}`}
        canonical={router.asPath}
        description={`about morethanmin`}
        openGraph={{
          title: `${CONFIG.BLOG_TITLE}`,
          description: 'about morethanmin',
          locale: router.locale,
          type: 'website',
          url: `${router.asPath}`,
          // images: [featuredImage],
        }}
      />
      <ListLayout>
        <div data-aos="fade-up" className="flex flex-col items-center messages">
          <div className="relative my-4 overflow-hidden rounded-full aspect-square h-30 xs:h-35 md:h-40 xs:my-8 md:mt-10">
            <Image
              src={me.image}
              fill
              style={{ objectFit: "cover" }}
              alt="Portrait"
              priority
            />
          </div>
          <h1 className="pb-4 text-4xl font-bold text-center md:text-6xl">
            About Me 🌍
          </h1>
        </div>
      </ListLayout>

      <div className="px-4 mx-auto my-6 lg:px-11 md:px-5 md:w-screen-md lg:w-screen-lg">
        <Overview me={me} />
      </div>

      <Project me={me} />
    </>
  )
}

export default Me
