import type React from 'react';

interface Props {
	name: string;
	children?: React.ReactNode;
}
//recursos
export const CustomBadge = ({ name, children }: Props) => {
	return (
		<div className='text-white w-fit bg-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2'>
			{name}
			{children}
		</div>
	);
};
