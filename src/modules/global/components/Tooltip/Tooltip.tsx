import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
  active?: boolean
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'right',
  active = true,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      let top = 0
      let left = 0

      switch (position) {
        case 'top':
          top = rect.top - 8
          left = rect.left + rect.width / 2
          break
        case 'right':
          top = rect.top + rect.height / 2
          left = rect.right + 8
          break
        case 'bottom':
          top = rect.bottom + 8
          left = rect.left + rect.width / 2
          break
        case 'left':
          top = rect.top + rect.height / 2
          left = rect.left - 8
          break
      }

      setCoords({ top, left })
    }
  }

  useEffect(() => {
    if (isVisible) {
      updatePosition()
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
    }
    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isVisible])

  if (!active) return <>{children}</>

  const translateClasses = {
    top: '-translate-x-1/2 -translate-y-full',
    right: '-translate-y-1/2',
    bottom: '-translate-x-1/2',
    left: '-translate-x-full -translate-y-1/2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t-slate-800',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r-slate-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-slate-800',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1 border-l-slate-800',
  }

  return (
    <div
      ref={triggerRef}
      className='flex items-center'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className={`fixed z-[9999] px-2.5 py-1.5 text-xs font-medium text-white bg-slate-800 border border-slate-700 rounded-md shadow-2xl whitespace-nowrap pointer-events-none transition-opacity duration-200 ${translateClasses[position]}`}
            style={{
              top: coords.top,
              left: coords.left,
            }}
          >
            {content}
            <div
              className={`absolute w-2 h-2 border-4 border-transparent ${arrowClasses[position]}`}
            />
          </div>,
          document.body,
        )}
    </div>
  )
}

export default Tooltip
