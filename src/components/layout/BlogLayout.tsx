import React from 'react'
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