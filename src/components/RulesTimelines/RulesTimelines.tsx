import { useState } from 'react';
import {
	COMMUNITY_RULES_DISCORD,
	COMMUNITY_RULES_GROUPS,
} from 'src/const/rules.const';
import { RulesLineItem } from './RulesLineItem';

type tabsOption = 'groups' | 'general';

export const RulesTimelines = () => {
	const [tabOption, setTabOption] = useState<tabsOption>('general');

	const handleChangeTab = (tab: tabsOption) => {
		setTabOption(tab);
	};

	return (
		<>
			<ul className='flex items-center justify-center mb-8 text-sm font-medium text-center text-gray-400'>
				<li className='me-2'>
					<button
						type="button"

						className={`inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-cyan-300 hover:border-cyan-300 font-semibold cursor-pointer ${
							tabOption === 'general'
								? 'text-cyan-300 border-cyan-300'
								: 'border-transparent'
						}`}
						onClick={() => handleChangeTab('general')}>
						Reglas generales
					</button>
				</li>

				<li className='me-2'>
					<button
						type="button"
						className={`inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-cyan-300 hover:border-cyan-300 font-semibold cursor-pointer ${
							tabOption === 'groups'
								? 'text-cyan-300 border-cyan-300'
								: 'border-transparent'
						}`}
						onClick={() => handleChangeTab('groups')}>
						Grupos de WhatsApp
					</button>
				</li>
			</ul>

			{tabOption === 'groups' && (
				<RulesLineItem data={COMMUNITY_RULES_GROUPS} />
			)}

			{tabOption === 'general' && (
				<RulesLineItem data={COMMUNITY_RULES_DISCORD} />
			)}


			<div
				className='border border-yellow-400 bg-yellow-100/10 text-yellow-300 p-4 rounded-xl text-sm max-w-xl mx-auto mt-10'>
				<p className='block font-extrabold mb-1 text-yellow-400 text-xl'
					>⚠️ Aviso Importante</p>
				<p className='text-base font-bold'>
					La administración se reserva el derecho de admisión y permanencia. Estas
					reglas se presumen conocidas por todos los miembros de la comunidad.
				</p>
			</div>
		</>
	);
};
