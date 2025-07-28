import React from 'react';
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
  hoverColor = '#83d6e7',
  ariaLabel = 'social-button',
}) => {
  return (
    <div
      className={clsx(
        'flex items-center text-sm lg:text-lg hover:shadow-2xl bg-[#314aa9] active:scale-95 h-12 justify-center  hover:bg-transparent cursor-pointer text-white rounded-md w-full sm:w-auto font-semibold transition-all duration-200 hover:border',
        {
          [`hover:border-[${hoverColor}] hover:text-[${hoverColor}]`]: hoverColor,
        }
      )}
    >
      <button
        aria-label={ariaLabel}
        onClick={onClick}
        className="flex items-center gap-2  justify-between cursor-pointer  lg:px-18 h-full"
      >
        {description}
        <Icon className="lg:w-15 lg:h-7" />
      </button>
    </div>
  );
};