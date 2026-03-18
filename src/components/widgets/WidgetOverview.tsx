'use client'

import { FC, useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import useSWRImmutable from 'swr/immutable'
import { useTheme } from 'next-themes'
import gradient from 'chartjs-plugin-gradient'
import { Colors } from '@/src/lib/utils/colors'
import { Tooltip } from '@/src/components/ui/Tooltip'
import { TPost } from '@/src/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  gradient,
)

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const WidgetOverViewSmall: FC<{ posts: TPost[] }> = ({ posts }) => {
  const tagsAmount = posts.reduce((prev, cur) => prev + (cur.tags?.length ?? 0), 0)

  return (
    <div 
      className="group relative aspect-square bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl rounded-[2.5rem] p-6 border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none transition-all duration-700 hover:scale-[1.05] hover:shadow-3xl flex flex-col justify-between overflow-hidden"
      data-aos="fade-up"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
         <div className="text-8xl animate-pulse">📊</div>
      </div>
      
      <div className="relative z-10 w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-3xl animate-wave origin-bottom-right">
        👋
      </div>

      <div className="relative z-10 flex flex-col gap-1.5 mt-auto font-black uppercase tracking-[0.2em] text-[0.6rem]">
        <p className="text-orange-500 bg-orange-500/10 px-3 py-1.5 rounded-xl w-fit">
          {posts.length} Articles
        </p>
        <p className="text-purple-500 bg-purple-500/10 px-3 py-1.5 rounded-xl w-fit">
          {tagsAmount} Tags
        </p>
        <div className="mt-2 text-zinc-400">
           <OverviewPvAll />
        </div>
      </div>
    </div>
  )
}

export const WidgetOverViewMedium: FC<{ posts: TPost[]; fix?: boolean }> = ({ posts, fix }) => {
  const tagsAmount = posts.reduce((prev, cur) => prev + (cur.tags?.length ?? 0), 0)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div 
      className={`group relative overflow-hidden bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl ${fix ? 'h-35 lg:h-40' : 'h-40 lg:h-48'}`}
      data-aos="fade-up"
    >
      <div className="flex h-full p-8 lg:p-10">
        <div className="w-1/2 flex flex-col justify-between">
          <div className="w-16 h-16 bg-gradient-to-tr from-orange-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-4xl animate-wave origin-bottom-right shadow-inner">
            👋
          </div>
          <div className="flex flex-col gap-2 font-black uppercase tracking-[0.25em] text-[0.65rem] lg:text-[0.75rem]">
            <p className="text-orange-500 bg-orange-500/10 px-4 py-2 rounded-2xl w-fit">
              {posts.length} Articles
            </p>
            <p className="text-purple-500 bg-purple-500/10 px-4 py-2 rounded-2xl w-fit">
              {tagsAmount} Tags
            </p>
            <div className="mt-1 text-zinc-400 pl-2">
               <OverviewPvAll />
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col justify-between border-l border-zinc-100 dark:border-zinc-800 pl-8 lg:pl-10">
           <div className="flex flex-col gap-4">
              <div className="group/metric">
                <p className="text-[0.55rem] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 group-hover/metric:text-orange-500 transition-colors">Users</p>
                <OverviewUv />
              </div>
              <div className="group/metric">
                <p className="text-[0.55rem] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 group-hover/metric:text-purple-500 transition-colors">Views</p>
                <OverviewPv />
              </div>
           </div>
           
           <div className="mt-auto h-12 lg:h-16 w-full opacity-50 group-hover:opacity-100 transition-opacity duration-700">
              {/* Simple illustrative bar indicating activity */}
              <div className="flex items-end gap-1 h-full">
                 {[40, 70, 45, 90, 65, 30, 80, 55, 95, 40].map((h, i) => (
                    <div 
                      key={i} 
                      style={{ height: `${h}%` }} 
                      className={`flex-1 rounded-full bg-gradient-to-t ${i % 2 === 0 ? 'from-orange-500 to-orange-400' : 'from-purple-500 to-purple-400'} transition-all duration-700 group-hover:scale-y-110`}
                    />
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

const OverviewPv = () => {
  const { data: pvData } = useSWRImmutable('/api/page-views', fetcher)
  const pvCount = pvData?.pageViews || '—'
  return <div className="text-xl lg:text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">{pvCount}</div>
}

const OverviewUv = () => {
  const { data: uvData } = useSWRImmutable('/api/users-views', fetcher)
  const uvCount = uvData?.usersViews || '—'
  return <div className="text-xl lg:text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">{uvCount}</div>
}

const OverviewPvAll = () => {
  const { data: pvAllData } = useSWRImmutable('/api/page-views/all', fetcher)
  const pvAmount = pvAllData?.pageViews || '-'
  return (
    <span className="font-black decoration-zinc-200 dark:decoration-zinc-800 underline decoration-4 underline-offset-4">
      {pvAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Total Views
    </span>
  )
}
