import React, { useState } from 'react'
import clsx from 'clsx'

interface SocialButtonProps {
  description: string
  icon: React.ElementType
  onClick?: () => void
  url?: string
  hoverColor?: string
  ariaLabel?: string
  social?: string
}

export const SocialContainer: React.FC<SocialButtonProps> = ({
  description,
  icon: Icon,
  onClick,
  url,
  hoverColor,
  ariaLabel = 'Acción de red social',
  social = 'default',
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else if (onClick) {
      onClick()
    }
  }

  const borderColor = clsx(
    social === 'discord' || social === 'whatsapp'
      ? isHovered
        ? 'border-[#ff6900]'
        : 'border-transparent'
      : social === 'redes'
        ? isHovered
          ? 'border-transparent'
          : 'border-[#00e5ff]'
        : isHovered
          ? 'border-transparent'
          : social === 'github'
            ? 'border-gray-300'
            : 'border-[#94e7f8]',
  )

  const textColor = clsx(
    social === 'discord' || social === 'whatsapp'
      ? isHovered
        ? 'text-[#ff6900]'
        : 'text-white'
      : social === 'redes'
        ? isHovered
          ? 'text-[#19243e]'
          : 'text-[#00e5ff]'
        : isHovered
          ? 'text-white'
          : '',
  )

  const baseStyle =
    social === 'discord' || social === 'whatsapp'
      ? isHovered
        ? { background: 'transparent' }
        : { background: '#ff6900' }
      : isHovered
        ? { background: hoverColor ?? 'rgba(255, 255, 255, 0.1)' }
        : {}

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={clsx(
        'flex items-center text-lg active:scale-95 min-h-[48px] justify-center cursor-pointer rounded-md w-full sm:w-auto font-semibold transition-all duration-200 border p-4 lg:px-10',
        borderColor,
        textColor,
      )}
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <span className="flex items-center gap-2 w-full justify-center">
        {description}
        <Icon className="lg:w-15 lg:h-7" aria-hidden />
      </span>
    </button>
  )
}
