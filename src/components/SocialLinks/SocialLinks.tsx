import React, { useEffect, useState } from 'react';
import { socialLinks } from 'src/utils/aboutUs';
import { EntryForm } from '@components/EntryForm/EntryForm';
import { SocialContainer } from './SocialContainer';

export const SocialLinks: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen((prev) => !prev);
  };

    useEffect(() => {
      if (isFormOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }, [isFormOpen]);

  const whatsapp = socialLinks.whatsapp;

  return (
    <div className="flex flex-col justify-center gap-4 mt-2 w-full">
      <div className="flex justify-center gap-4 w-full flex-col">
        <SocialContainer
          description={whatsapp.description}
          icon={whatsapp.icon}
          onClick={openForm}
          hoverColor={"#25D366"}
          ariaLabel={whatsapp.title}
          social="whatsapp"
        />
        <SocialContainer
          description={socialLinks.github.description}
          icon={socialLinks.github.icon}
          onClick={() => window.open(socialLinks.github.url, '_blank')}
          hoverColor={"#6b8cff"}
          ariaLabel={socialLinks.github.title}
          social="redes"
          />
          
      </div>

      {isFormOpen && (
        <section className=" left-0 top-0 backdrop-blur-3xl flex justify-center items-center rounded fixed h-full z-50 w-full shadow">
          <div className="bg-white-5 rounded-lg shadow-lg  ">
            <EntryForm onClose={() => setIsFormOpen(false)} />
          </div>
        </section>
      )}
    </div>
  );
};
