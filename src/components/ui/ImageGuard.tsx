import React from 'react'
import Watermark from './Watermark'

interface ImageGuardProps {
  children: React.ReactNode
  className?: string
  watermarkClassName?: string
}

const ImageGuard: React.FC<ImageGuardProps> = ({ 
  children, 
  className = '',
  watermarkClassName = ''
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden group/guard ${className}`}>
      {/* The actual image content */}
      {children}

      {/* Interaction Protection Overlay */}
      <div
        className="absolute inset-0 z-10"
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Branded Watermark - Fixed to bottom-left on hover per USER request */}
      <div className={`absolute bottom-4 left-6 z-20 opacity-0 group-hover/guard:opacity-60 transition-opacity duration-500 pointer-events-none ${watermarkClassName}`}>
        <Watermark />
      </div>
    </div>
  )
}

export default ImageGuard
