'use client'

import React, { Fragment, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  src: string
  alt: string
}

export default function ImageLightbox({ isOpen, onClose, src, alt }: ImageLightboxProps) {
  const [zoomLevel, setZoomLevel] = useState(0) // 0: Fit, 1: 1.5x, 2: 2.5x
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const lastMousePos = useRef({ x: 0, y: 0 })
  const hasMovedSignificant = useRef(false)

  // Reset zoom on close
  useEffect(() => {
    if (!isOpen) {
      setZoomLevel(0)
      setPosition({ x: 0, y: 0 })
    }
  }, [isOpen])

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation()
    // If they were moving the mouse significantly, don't toggle zoom
    if (hasMovedSignificant.current) {
      hasMovedSignificant.current = false
      return
    }
    setZoomLevel((prev) => (prev + 1) % 3)
    if (zoomLevel === 2) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    // Track if mouse has moved significantly since down (to prevent accidental zoom)
    const dist = Math.sqrt(
      Math.pow(e.clientX - lastMousePos.current.x, 2) + 
      Math.pow(e.clientY - lastMousePos.current.y, 2)
    )
    if (dist > 5) hasMovedSignificant.current = true

    if (zoomLevel === 0) return

    const scales = [1, 1.5, 2.5]
    const currentScale = scales[zoomLevel]
    
    // Viewfinder Panning Logic:
    // percentage 0 -> offset is positive (shows left side)
    // percentage 1 -> offset is negative (shows right side)
    const xPct = e.clientX / window.innerWidth
    const yPct = e.clientY / window.innerHeight
    
    // The amount we can scroll is (Scale - 1) * Dimensions
    // We want to move it from +MaxScroll to -MaxScroll
    const xOffset = (0.5 - xPct) * (currentScale - 1) * window.innerWidth
    const yOffset = (0.5 - yPct) * (currentScale - 1) * window.innerHeight

    setPosition({ x: xOffset, y: yOffset })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    lastMousePos.current = { x: e.clientX, y: e.clientY }
    hasMovedSignificant.current = false
  }

  const scales = [1, 1.5, 2.5]
  const currentScale = scales[zoomLevel]

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-950/90 backdrop-blur-2xl transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-hidden">
          <div 
            className="flex min-h-full items-center justify-center p-0 text-center"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`relative flex items-center justify-center transform bg-transparent transition-all ${
                zoomLevel === 0 ? 'w-full h-full p-4' : ''
              }`}>
                <div className="absolute top-6 right-6 z-[110]">
                  <button
                    type="button"
                    className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-all active:scale-95 focus:outline-none backdrop-blur-md"
                    onClick={(e) => {
                      e.stopPropagation()
                      onClose()
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                
                <div 
                  className={`relative flex items-center justify-center transition-transform duration-200 ease-out select-none ${
                    zoomLevel === 0 ? 'cursor-zoom-in w-full h-full' : 'cursor-crosshair w-auto h-auto'
                  }`}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${currentScale})`,
                  }}
                  onClick={handleZoom}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={1920}
                    height={1080}
                    className={`w-auto h-auto shadow-2xl rounded-sm transition-all duration-300 ${
                      zoomLevel === 0 ? 'max-w-[85vw] max-h-[85vh] object-contain' : 'max-w-none max-h-none'
                    }`}
                    unoptimized 
                    priority
                    draggable={false}
                  />
                </div>

                {alt && zoomLevel === 0 && (
                  <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
                    <p className="text-sm font-medium text-zinc-400 italic animate-in fade-in slide-in-from-bottom-2 duration-700">
                      {alt}
                    </p>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
