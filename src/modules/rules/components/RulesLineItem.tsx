import React from 'react';

interface IData {
	title: string;
	description: string;
}

interface Props {
	data: IData[];
}

export const RulesLineItem = ({ data = [] }: Props) => {
	return (
		<ol
			className='relative space-y-12 before:absolute before:top-0
		before:left-[5px] sm:before:left-1/2 before:h-full before:w-px sm:before:-translate-x-1/2 before:bg-gradient-to-b before:from-[#00e5ff]/50 before:via-[#00e5ff]/10 before:to-transparent'>
			{data.map((group) => (
				<li
					className='group relative grid sm:grid-cols-2 sm:odd:-me-3 sm:even:-ms-3 ml-6 sm:ml-0'
					key={group.title}>
					<div className='relative flex items-start gap-6 sm:group-odd:flex-row-reverse sm:group-odd:text-right sm:group-even:order-last'>
						<span className='size-3 shrink-0 rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff] mt-2 sm:mt-1'></span>

						<div className='flex-1'>
							<h3 className='text-xl font-bold text-white group-hover:text-[#00e5ff] transition-colors duration-300'>{group.title}</h3>
							<p className='mt-2 text-md text-gray-400 leading-relaxed'>
								{group.description}
							</p>
						</div>
					</div>

					<div aria-hidden='true'></div>
				</li>
			))}
		</ol>
	);
};
