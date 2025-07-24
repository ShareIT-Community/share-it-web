import React from 'react';
import clsx from 'clsx';
import { socialLinks } from 'src/utils/aboutUs';
import { FaWhatsapp, FaGithub } from 'react-icons/fa';
import { useUIStore } from '../../store/FormEntryStore';

export const SocialLinks: React.FC = () => {
  const openForm = useUIStore((state) => state.openForm);


  return (
    <div className="flex flex-col justify-center gap-4 mt-2 w-full">
      <div className="flex sm:flex-row justify-center gap-4 w-full md:flex-col">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;

          return (
            <button
              key={index}
              aria-label={link.title}
              onClick={openForm}
              rel="noopener noreferrer"
              className={clsx(
                'flex items-center lg:text-lg hover:shadow-2xl active:scale-95 h-12 justify-center gap-6 bg-[#314aa9] hover:bg-transparent cursor-pointer text-white px-6 py-2 rounded-md w-full sm:w-auto font-semibold transition-all duration-200 hover:border',
                {
                  'hover:border-[#25D366] hover:text-[#25D366]': Icon === FaWhatsapp,
                  'hover:border-white hover:text-white': Icon === FaGithub,
                  'hover:border-[#83d6e7] hover:text-[#83d6e7]':
                    Icon !== FaWhatsapp && Icon !== FaGithub,
                }
              )}
            >
              {link.description}
              <Icon className="lg:w-15 lg:h-7" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
