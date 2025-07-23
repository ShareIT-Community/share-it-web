import React from 'react';
import clsx from 'clsx';
import { socialLinks } from 'src/utils/aboutUs';
import { FaWhatsapp, FaGithub } from 'react-icons/fa';

export const SocialLinks: React.FC = () => {
  return (
    <div className="flex flex-col justify-center gap-4 mt-2 w-full">
      <div className="flex sm:flex-row justify-center gap-4 w-full md:flex-col">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;

          const hoverColor =
            Icon === FaWhatsapp
              ? '#25D366'
              : Icon === FaGithub
              ? '#ffffff'
              : '#83d6e7';

          return (
            <a
              key={index}
              aria-label={link.title}
              rel="noopener noreferrer"
              target="_blank"
              href={link.url}
              className={clsx(
                'flex items-center lg:text-lg hover:shadow-2xl active:scale-95 h-12 justify-center gap-6 bg-[#314aa9] hover:bg-transparent hover:scale-105 text-white px-6 py-2 rounded-full w-full sm:w-auto font-semibold transition-all duration-200 hover:border',
                `hover:border-[${hoverColor}]`,
                `hover:text-[${hoverColor}]`
              )}
            >
              {link.description}
              <Icon className="lg:w-15 lg:h-7" />
            </a>
          );
        })}
      </div>
    </div>
  );
};
