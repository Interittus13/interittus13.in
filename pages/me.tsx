import { NextPage } from 'next'
import ListLayout from '../components/layout/ListLayout'
import { me } from '../config/me'
import { Colors } from '../lib/colors'
import Image from 'next/image'
import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { NextSeo } from 'next-seo'
import { CONFIG } from '../config/blog'
import { useRouter } from 'next/router'
import { TPost } from '../types'
import Overview from '../components/me/Overview'

interface CardLayoutProps {
  children: React.ReactNode
}

// const style = 'bg-white rounded-3xl p-4 xs:p-4.5 sm:p-6 md:p-8 min-h-25 sm:min-h-37 flex flex-col justify-between transform rotate-0 overflow-hidden dark:bg-true-gray-900'

const CardLayout: React.FC<CardLayoutProps> = ({ children }) => {
  return (
    <div
      data-aos="fade-up"
      className={`bg-white rounded-3xl border-[0.5px] border-true-gray-100 relative overflow-hidden my-5 transform rotate-0`}
      dark="bg-true-gray-900 border-true-gray-800"
    >
      <div className="m-5 xs:m-8 md:m-8">{children}</div>
    </div>
  )
}

const ProjectHero = () => {
  const { resolvedTheme } = useTheme()

  const project = me.projects[0]
  return (
    <div
      className="relative flex flex-col items-center justify-center py-10 overflow-hidden bg-white md:pb-5"
      dark="bg-true-gray-900"
    >
      <h1
        data-aos="fade-up"
        className={`${Colors['purple'].text.msg} text-4xl lg:text-6xl mb-15 font-bold text-center text-stroke-sm text-stroke-purple-500 uppercase text-transparent write-vertical-right  absolute right-2 top-4 md:(right-5 top-10)`}
      >
        Project
      </h1>
      <div
        data-aos="fade-up"
        className="mt-10 mb-4 aspect-ratio w-65 xs:w-70"
        id="hero"
      >
        <Image
          src={
            resolvedTheme === 'light' ? project.logo!.light : project.logo!.dark
          }
          layout="responsive"
          width="525"
          height="160"
          alt={project.name}
        />
      </div>
      <p
        data-aos="fade-up"
        className="my-4 text-3xl font-bold text-center max-w-120 md:text-4xl md:max-w-180"
      >
        {project.description}
      </p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        data-aos="fade-up"
        className="px-3 py-1 text-blue-400 border-blue-400 rounded-full border-3"
      >
        Explore
      </a>
      <div data-aos="fade-up" className="flex justify-center">
        <div className="flex w-full mt-8" id="coquality-images">
          <div className="w-[520px] h-[360px] md:(w-[620px] h-[420px]) lg:(w-[940px] h-[570px])">
            <Image
              src={project.image!}
              alt={project.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Project = () => {
  const project = me.projects[1]
  return (
    <div className="lg:mx-20">
      <CardLayout>
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex flex-col justify-start h-70 md:h-120 md:m-4">
            <h1
              className={`text-2xl sm:text-3xl font-bold ${Colors['purple'].text.msg}`}
            >
              Project
            </h1>
            <div className="flex flex-col items-start justify-center h-full">
              <div className="flex flex-row-reverse items-center gap-3 md:flex-col md:items-start">
                <div className="mb-4 aspect-ratio w-15 xs:w-20">
                  <Image
                    src={project.icon}
                    alt="pokemon"
                    layout="responsive"
                    width="100"
                    height="100"
                  />
                </div>
                <p className="mb-2 text-2xl font-bold xs:text-3xl md:text-4xl lg:text-5xl">
                  {project.name}
                </p>
              </div>
              <p className="mb-4 font-medium text-normal xs:text-lg lg:text-xl text-true-gray-400">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-aos="fade-up"
                className="px-3 py-1 text-blue-400 border-blue-400 rounded-full border-3"
              >
                Source Code
              </a>
            </div>
          </div>
          {project['video'] ? (
            <div
              className="-top-1 md:top-0 relative h-120 w-full -left-9 xs:-left-1.5 sm:left-0"
              data-aos="fade-up"
            >
              <div className="absolute h-150 w-99.5 -top-0.9 left-7.9 md:left-4.2 lg:left-13.7">
                <Image
                  className="absolute z-10 top-4 left-10"
                  src="/static/images/iphone_case_shadow.png"
                  alt={project.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <video
                className="absolute z-0 w-53 left-11.5 top-10 md:(left-8) lg:(top-10 left-17.5 w-53)"
                src={project['video']}
                playsInline
                autoPlay
                loop
                muted
              ></video>
            </div>
          ) : null}
        </div>
      </CardLayout>
    </div>
  )
}

const Me: NextPage<{ posts: TPost[] }> = ({ posts }) => {
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

      <ProjectHero />
      <ListLayout>
        <div className="my-10">
          <Project />
          <div data-aos="fade-up" className="flex justify-center">
            <a
              className={`transition-all duration-200 ease-in-out transform ${Colors['purple'].text.msg} bg-white hover:text-white hover:bg-purple-500 border-2 border-purple-500 rounded-full`}
              href={me.social[0].url}
              target="_blank"
              rel="noopener noreferrer"
              dark="bg-true-gray-900 hover:bg-purple-500"
            >
              <p
                className={`text-sm font-semibold inline-block text-center px-4 py-3`}
              >
                Explore More
              </p>
            </a>
          </div>
        </div>
      </ListLayout>
    </>
  )
}

export default Me
