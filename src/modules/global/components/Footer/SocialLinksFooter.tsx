import { BsTwitterX } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';

export const SocialLinksFooter = () => {
	return (
		<div className='flex gap-5 [&_a]:text-[#83d6e7] [&_a]:hover:text-[#368beb] transition-all [&_a]:text-lg'>
			<a
				href='https://x.com/shareit_lat'
				target='_blank'
				rel='noopener noreferrer'>
				<BsTwitterX />
			</a>
			<a
				href='https://www.linkedin.com/company/shareitlat'
				target='_blank'
				rel='noopener noreferrer'>
				<FaLinkedinIn />
			</a>
			<a href='mailto:shareit.1124@gmail.com'>
				<SiGmail />
			</a>
		</div>
	);
};
