import React from 'react'

interface WatermarkProps {
  className?: string
}

const Watermark: React.FC<WatermarkProps> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 drop-shadow-sm">
        © {new Date().getFullYear()} interittus13.in
      </span>
    </div>
  )
}

export default Watermark
