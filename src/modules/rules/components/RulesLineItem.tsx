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
			className='relative space-y-8 before:absolute before:top-0
		before:left-[5px] sm:before:left-1/2 before:h-full before:w-0.5 sm:before:-translate-x-1/2 before:rounded-full before:bg-gray-700'>
			{data.map((group) => (
				<li
					className='group relative grid sm:grid-cols-2 sm:odd:-me-3 sm:even:-ms-3'
					key={group.title}>
					<div className='relative flex items-start gap-4 sm:group-odd:flex-row-reverse sm:group-odd:text-right sm:group-even:order-last'>
						<span className='size-3 shrink-0 rounded-full bg-blue-600'></span>

						<div className='-mt-2'>
							<h3 className='text-lg font-bold text-white'>{group.title}</h3>
							<p className='mt-0.5 text-sm text-gray-200'>
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
