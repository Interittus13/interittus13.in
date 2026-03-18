'use client'

import React, { cloneElement, useState } from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-true-gray-50 dark:bg-black">
        <Navbar />
        <main>{children}</main>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  )
}

export function BlogLayoutPure({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col justify-start min-h-screen bg-white dark:bg-black">
        <Navbar />
        <main>{children}</main>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  )
}

export function BlogLayoutWhite({ children }: { children: React.ReactElement }) {
  const [toc, setToc] = useState(null)
  const tocChild = cloneElement(children, { setToc } as any)
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gradient-to-b from-true-gray-900 to-black">
        <Navbar toc={toc} />
        <main>{tocChild}</main>
        <Footer />
      </div>
    </>
  )
}