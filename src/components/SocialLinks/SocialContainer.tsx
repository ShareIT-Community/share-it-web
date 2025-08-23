import React, { useState } from 'react';
import clsx from 'clsx';

interface SocialButtonProps {
  description: string;
  icon: React.ElementType;
  onClick: () => void;
  hoverColor?: string;
  ariaLabel?: string;
  social?: string;
}

export const SocialContainer: React.FC<SocialButtonProps> = ({
  description,
  icon: Icon,
  onClick,
  hoverColor,
  ariaLabel = 'social-button',
  social = 'default',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const borderColor = clsx({
    'border-green-500': social === 'whatsapp' && !isHovered,
    'border-gray-300': social === 'github' && !isHovered,
    'border-[#94e7f8]': social !== 'whatsapp' && social !== 'github' && !isHovered,
    'border-transparent': isHovered,
  });

  const textColor = isHovered
    ? 'text-white'
    : clsx({
        'text-green-500': social === 'whatsapp',
        'text-[#6b8cff]': social === 'redes',
        'text-white': social !== 'whatsapp' && social !== 'redes',
      });

  const hoveredStyle = isHovered
    ? { background: hoverColor ?? 'rgba(255, 255, 255, 0.1)' }
    : {};

  return (
    <div
      className={clsx(
        'flex items-center text-lg active:scale-95 h-12 justify-center cursor-pointer rounded-md w-full sm:w-auto font-semibold transition-all duration-200 border',
        borderColor,
        textColor
      )}
      style={hoveredStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        aria-label={ariaLabel}
        onClick={onClick}
        className="flex items-center gap-2 w-full justify-center cursor-pointer lg:px-10 h-full"
      >
        {description}
        <Icon className="lg:w-15 lg:h-7" />
      </button>
    </div>
  );
};

