import React from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
        <Navbar />
        <main>{children}</main>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  )
}