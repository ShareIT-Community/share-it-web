import React, { useState } from 'react';
import clsx from 'clsx';
import { socialLinks } from 'src/utils/aboutUs';
import { FaWhatsapp } from 'react-icons/fa';
import { EntryForm } from '@components/EntryForm/EntryForm';
import { SocialContainer } from './SocialContainer';

export const SocialLinks: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  const whatsapp = socialLinks.whatsapp;

  return (
    <div className="flex flex-col justify-center gap-4 mt-2 w-full">
      <div className="flex justify-center gap-4 w-full flex-col">
        <SocialContainer
          description={whatsapp.description}
          icon={whatsapp.icon}
          onClick={openForm}
          hoverColor="#25D366"
          ariaLabel={whatsapp.title}
        />
        <SocialContainer
          description={socialLinks.github.description}
          icon={socialLinks.github.icon}
          onClick={() => window.open(socialLinks.github.url, '_blank')}
          hoverColor="white"
          ariaLabel={socialLinks.github.title}/>
      </div>

      {isFormOpen && (
        <section className=" p-4 left-0 backdrop-blur-2xl flex justify-center items-center rounded fixed h-screen z-50 w-full shadow">
          <div className="bg-white-5 rounded-lg shadow-lg   w-150 ">
            <EntryForm onClose={() => setIsFormOpen(false)} />
          </div>
        </section>
      )}
    </div>
  );
};
