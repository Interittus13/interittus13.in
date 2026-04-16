import Link from 'next/link'
import Watermark from './Watermark'

interface ImageGuardProps {
  children: React.ReactNode
  className?: string
  watermarkClassName?: string
  href?: string
  showInteractionLayer?: boolean
}

const ImageGuard: React.FC<ImageGuardProps> = ({ 
  children, 
  className = '',
  watermarkClassName = '',
  href,
  showInteractionLayer = true
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden group/guard ${className}`}>
      {/* The actual image content */}
      {children}

      {/* 
        Interactive Security Layer 1: Pattern Mesh & Pointer Blocking
        This subtle SVG grid makes AI in-painting and manual cropping much harder
        while remaining nearly invisible to the premium viewer in dark mode.
      */}
      {showInteractionLayer && (
        <div 
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      )}

      {/* 
        Interactive Security Layer 2: Interaction Interceptor
        - If href is provided, it acts as a clickable navigation link (Left Click)
        - Prevents right-click and context menu access (Right Click)
      */}
      {showInteractionLayer && (
        href ? (
          <Link
            href={href}
            className="absolute inset-0 z-20 cursor-pointer"
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <div
            className="absolute inset-0 z-20 cursor-default"
            onContextMenu={(e) => e.preventDefault()}
          />
        )
      )}

      {/* 
        Branded Watermark:
        - Desktop: Fades in on hover (60% opacity)
        - Mobile: Persistent at 40% opacity (since no hover exists)
        - Interactive Mode: Persistent at 20% opacity for less obstruction
      */}
      <div className={`absolute bottom-4 left-6 z-30 transition-opacity duration-500 pointer-events-none ${
        showInteractionLayer 
          ? 'opacity-40 md:opacity-0 md:group-hover/guard:opacity-60' 
          : 'opacity-20'
        } ${watermarkClassName}`}>
        <Watermark />
      </div>
    </div>
  )
}

export default ImageGuard
