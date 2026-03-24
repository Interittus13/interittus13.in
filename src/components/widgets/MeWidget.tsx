'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getIconByName } from '@/src/lib/utils/iconMap'
import { me } from '@/src/config/me'

const portraitPlaceholder = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQUlEQVQYlQE2Acn+ANV6g9Z8hdV6htZ9iNFseO7KzfDQ1NJyfdZ/iNV6gwCvACStAButABioAAjJU2X78vTANUeqABCsABWvACIAqAAArwAA1n+Gy1th0nZc1oF2z2hv3I+UuAosqAAAANF/APXis/////////Tt4sbCvf////////HaeNF+AADt5wD////j8+ZSunYAnDUAgw8ArWSZ0UXw3wDq4QAA0OQA//7/NpJWAH0uKng4U5tWAGUlAGwArNIAw90AADe4qv///7yOg9eAg7CSjtm3ss54e8F3cK7eowCbhAAAQq+6yOL89+rfx6OvoYynnH3p173+/PJipNsAObAAAABKFxpuR5R9AJUAn60+SaASAJsUZoWVAAtcAABLAG4fUXIHUQBAHwCjAIlPN3KCOQCKAEElNnEQUG0hUclYmR7EScPpAAAAAElFTkSuQmCC`

export const WidgetMeSmall: React.FC = () => {
  return (
    <div
      className="group relative h-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl rounded-[2.5rem] p-6 border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none transition-all duration-700 hover:scale-[1.05] hover:shadow-3xl"
      data-aos="fade-up"
    >
      <Link href="/me" className="absolute inset-0 z-10" />
      <div className="flex flex-col h-full items-center justify-between text-center">
        <div className="relative w-24 h-24 rounded-[1.5rem] overflow-hidden rotate-[-4deg] group-hover:rotate-0 transition-transform duration-700 shadow-xl border-4 border-white dark:border-zinc-800">
          <Image
            src={me.image}
            fill
            className="object-cover"
            alt={me.name}
            placeholder="blur"
            blurDataURL={portraitPlaceholder}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-orange-500">
            {me.name}
          </h3>
          <p className="text-[0.6rem] font-bold text-zinc-400 uppercase tracking-widest mt-1">
            {me.nickname}
          </p>
        </div>

        <div className="flex gap-2.5 mt-4 z-20">
          {me.social.slice(0, 4).map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-tr ${link.color} text-white shadow-lg shadow-zinc-200 dark:shadow-none transition-all hover:scale-110 active:scale-90`}
            >
              {(() => {
                const Icon = typeof link.icon === 'string' ? getIconByName(link.icon) : link.icon
                return Icon ? <Icon className="w-3.5 h-3.5 fill-current" /> : null
              })()}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export const WidgetMeMedium: React.FC<{ fix?: boolean }> = ({ fix }) => {
  return (
    <div
      className={`group relative overflow-hidden bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl ${fix ? 'min-h-[160px] lg:min-h-[180px]' : 'min-h-[180px] lg:min-h-[200px]'}`}
      data-aos="fade-up"
    >
      <Link href="/me" className="absolute inset-0 z-10" />
      <div className="flex h-full items-center">
        <div className="w-1/3 p-6 pr-0 flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-[120px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800 transition-transform duration-700 group-hover:rotate-3 group-hover:scale-105">
            <Image
              src={me.image}
              fill
              className="object-cover"
              alt={me.name}
              placeholder="blur"
              blurDataURL={portraitPlaceholder}
            />
          </div>
        </div>

        <div className="w-2/3 p-6 flex flex-col justify-center">
          <h3 className="text-2xl lg:text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500 transition-colors duration-500">
            {me.name}
          </h3>
          <p className="text-sm lg:text-base font-medium text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1 opacity-80 decoration-orange-500/20 underline decoration-2 underline-offset-4">
            {me.bio}
          </p>

          <div className="flex flex-wrap gap-2.5 mt-6 z-20">
            {me.social.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-tr ${link.color} text-white shadow-lg shadow-zinc-200/50 dark:shadow-none transition-all hover:scale-110 active:scale-90 hover:rotate-3`}
                title={link.name}
              >
                {(() => {
                  const Icon = typeof link.icon === 'string' ? getIconByName(link.icon) : link.icon
                  return Icon ? <Icon className="w-4 h-4 fill-current" /> : null
                })()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
