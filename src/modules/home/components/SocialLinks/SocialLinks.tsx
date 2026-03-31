import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { socialLinks } from 'src/modules/about-us/constants/about-us.const';
import { SocialContainer } from './SocialContainer';
import { EntryForm } from '../EntryForm/EntryForm';

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

	const discord = socialLinks.discord;
	const github = socialLinks.github;

	return (
		<div className='flex justify-center gap-4 mt-2 w-full'>
			<div className='flex flex-row flex-wrap justify-center gap-4'>
				<SocialContainer
					description={discord.description}
					icon={discord.icon}
					onClick={openForm}
					hoverColor={'#5865F2'}
					ariaLabel={discord.title}
					social='discord'
				/>
				<SocialContainer
					description={github.description}
					icon={github.icon}
					url={github.url}
					hoverColor={'#6b8cff'}
					ariaLabel={github.title}
					social='redes'
				/>
			</div>

			{isFormOpen && typeof window !== 'undefined'
				? createPortal(
						<section className='left-0 top-0 backdrop-blur-3xl flex justify-center items-center rounded fixed h-[100dvh] w-[100vw] z-[999] shadow'>
							<div className='bg-white-5 rounded-lg shadow-lg  '>
								<EntryForm onClose={() => setIsFormOpen(false)} />
							</div>
						</section>,
						document.body
				  )
				: null}
		</div>
	);
};
