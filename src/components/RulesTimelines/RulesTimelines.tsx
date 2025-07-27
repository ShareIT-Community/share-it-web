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
						className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-cyan-300 hover:border-cyan-300 font-semibold ${
							tabOption === 'general' ? 'text-cyan-300 border-cyan-300' : ''
						}`}
						onClick={() => handleChangeTab('general')}>
						Reglas generales
					</button>
				</li>

				<li className='me-2'>
					<button
						className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-cyan-300 hover:border-cyan-300 font-semibold ${
							tabOption === 'groups' ? 'text-cyan-300 border-cyan-300' : ''
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
		</>
	);
};
