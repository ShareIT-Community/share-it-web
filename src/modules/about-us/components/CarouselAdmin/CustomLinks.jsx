import {
	GithubIcon,
	LinkedinIcon,
	WebsiteIcon,
	TwitterIcon,
	InstagramIcon,
} from '@icons/Icons';

const ICONS = {
	github: <GithubIcon />,
	linkedin: <LinkedinIcon />,
	website: <WebsiteIcon />,
	twitter: <TwitterIcon />,
	instagram: <InstagramIcon />,
};

export const SocialLinks = ({
	github,
	linkedin,
	website,
	twitter,
	instagram,
	className = 'flex gap-3 text-gray-400',
}) => {
	const links = { github, linkedin, website, twitter, instagram };

	return (
		<div className={className}>
			{Object.entries(links).map(([key, url]) => {
				if (!url) return null;

				const label =
					key === 'github'
						? 'GitHub profile'
						: key === 'linkedin'
						? 'LinkedIn profile'
						: key === 'website'
						? 'Personal website'
						: `${key.charAt(0).toUpperCase() + key.slice(1)} profile`;

				return (
					<a
						key={key}
						href={url}
						target='_blank'
						rel='noopener noreferrer'
						className='hover:text-secondary transition-colors'
						aria-label={label}>
						{ICONS[key]}
					</a>
				);
			})}
		</div>
	);
};
