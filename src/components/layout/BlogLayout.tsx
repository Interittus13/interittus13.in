import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * Default blog layout component that wraps the main content with a navbar and footer.
 */
export const BlogLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-true-gray-50 dark:bg-black">
      <Navbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  )
}

export const BlogLayoutPure: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  )
}

// export function BlogLayoutWhite({ children }) {
//   // const [toc, setToc] = useState(null)
//   // const tocChild = cloneElement(children, { setToc })
//   return (
//     <>
//       <div className="min-h-screen bg-white dark:bg-gradient-to-b from-true-gray-900 to-black">
//         {/* <Navbar toc={toc} /> */}
//         {/* <main>{tocChild}</main> */}
//         <Footer />
//       </div>
//     </>
//   )
// }