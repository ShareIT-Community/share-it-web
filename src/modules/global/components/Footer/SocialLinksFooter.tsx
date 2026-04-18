import { BsTwitterX } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';

export const SocialLinksFooter = () => {
	return (
		<div className='flex gap-5 [&_a]:text-[#83d6e7] [&_a]:hover:text-[#368beb] transition-all [&_a]:text-lg'>
			<a
				href='https://x.com/shareit_tech'
				target='_blank'
				rel='noopener noreferrer'
				aria-label='ShareIT en X (Twitter)'
			>
				<BsTwitterX aria-hidden />
			</a>
			<a
				href='https://www.linkedin.com/company/shareit-tech'
				target='_blank'
				rel='noopener noreferrer'
				aria-label='ShareIT en LinkedIn'
			>
				<FaLinkedinIn aria-hidden />
			</a>
			<a
				href='mailto:shareit.1124@gmail.com'
				aria-label='Enviar correo a ShareIT'
			>
				<SiGmail aria-hidden />
			</a>
		</div>
	);
};
