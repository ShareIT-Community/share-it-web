import React, { useState } from 'react';
import clsx from 'clsx';

interface SocialButtonProps {
  description: string;
  icon: React.ElementType;
  onClick: () => void;
  hoverColor?: string;
  ariaLabel?: string;
}

export const SocialContainer: React.FC<SocialButtonProps> = ({
  description,
  icon: Icon,
  onClick,
  hoverColor = '#ffffff',
  ariaLabel = 'social-button',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={clsx(
        'flex items-center text-sm lg:text-lg active:scale-95 h-12 justify-center cursor-pointer rounded-md w-full sm:w-auto font-semibold transition-all duration-200',
        'bg-[#314aa9]',
        isHovered && 'bg-gray-900 border'
      )}
      style={isHovered ? { borderColor: hoverColor, color: hoverColor } : { color: 'white' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        aria-label={ariaLabel}
        onClick={onClick}
        className="flex items-center gap-2 justify-between cursor-pointer lg:px-18 h-full"
      >
        {description}
        <Icon className="lg:w-15 lg:h-7" />
      </button>
    </div>
  );
};
