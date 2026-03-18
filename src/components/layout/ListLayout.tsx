import React from "react"

/**
 *  ListLayout is a layout component for rendering a list of items with specific padding and width.
 *  @param children - The content to be rendered within the layout.
 */
export const ListLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="px-4 mt-6 mx-auto max-w-7xl w-full">
        {children}
    </div>
  )
}

export default ListLayout

/**
 * FullListLayout is a layout component for rendering a full-width list of items.
 * @param children - The content to be rendered within the layout.
 */
export const FullListLayout: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
  return (
    <div className="my-6 sm:max-w-none sm:min-w-[23rem] sm:px-0 sm:mx-auto lg:px-11 md:px-5 md:w-screen-md lg:w-screen-lg">
      <div className="mx-4 md:mx-0">
        {children}
      </div>
    </div>
  )
}