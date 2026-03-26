import { RulesTimelines } from 'src/modules/rules/components/RulesTimelines';
import { useState } from 'react';
import { CommunityEntrance } from './CommunityEntrance';

export const RulesAndConfirmation = () => {
	const [accepted, setAccepted] = useState(false);

	const handleAccepted = () => {
		setAccepted(true);
	};

	return (
		<div className='relative'>
			<h2 className='text-lg font-bold mt-4 text-white'>
				REGLAS Y CONFIRMACIÓN
			</h2>

			<div className='p-4 rounded-lg mb-4'>
				<RulesTimelines />
			</div>

			{accepted && (
				<div className='mb-4'>
					<CommunityEntrance />
				</div>
			)}

			<div className='flex h-10 justify-center items-center gap-3'>
				<div className='flex-1 flex justify-center h-10 items-center'>
					<button
						onClick={handleAccepted}
						id='accept-rules'
						type='button'
						className={`mt-4 px-6 py-2 btn-gradient flex justify-center items-center rounded transition ${
							accepted ? 'hidden' : 'block'
						}`}>
						Entiendo y acepto las reglas
					</button>
				</div>
			</div>
		</div>
	);
};
