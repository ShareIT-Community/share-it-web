import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { EntryForm } from 'src/modules/home/components/EntryForm/EntryForm';

export const JoinButton: React.FC = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	useEffect(() => {
		if (isFormOpen) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	}, [isFormOpen]);

	return (
		<>
			<button
				onClick={() => setIsFormOpen(true)}
				className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:opacity-90 transition-all cursor-pointer"
			>
				<span>Únete</span>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 127.14 96.36"
					className="hidden md:block w-5 h-5 fill-white"
				>
					<path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.07C2.79,32.65-1.17,56.61.77,80.21A105.73,105.73,0,0,0,32.94,96.36a77.7,77.7,0,0,0,6.7-10.92,68.42,68.42,0,0,1-10.56-5.1c.89-.66,1.76-1.35,2.6-2.06a75.57,75.57,0,0,0,63.78,0c.85.71,1.72,1.4,2.61,2.06a68.68,68.68,0,0,1-10.58,5.1,77.25,77.25,0,0,0,6.7,10.92A105.25,105.25,0,0,0,126.37,80.2C128.77,52.84,122.24,29.11,107.7,8.07ZM42.45,65.69c-6.23,0-11.35-5.68-11.35-12.66s5-12.66,11.35-12.66S53.8,46,53.8,53,48.68,65.69,42.45,65.69Zm42.24,0c-6.23,0-11.35-5.68-11.35-12.66s5-12.66,11.35-12.66S96,46,96,53,90.92,65.69,84.69,65.69Z" />
				</svg>
			</button>

			{isFormOpen && typeof window !== 'undefined'
				? createPortal(
						<section className="left-0 top-0 backdrop-blur-3xl flex justify-center items-center rounded fixed h-[100dvh] w-[100vw] z-[999] shadow">
							<div className="bg-white-5 rounded-lg shadow-lg">
								<EntryForm onClose={() => setIsFormOpen(false)} />
							</div>
						</section>,
						document.body
				  )
				: null}
		</>
	);
};
