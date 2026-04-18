import { FaTimes } from 'react-icons/fa';
import { RulesAndConfirmation } from './steps/RulesAndConfirmation';
import './Button.css';

const inputClass =
	'border p-2 rounded w-full bg-[#181f2a] text-white placeholder-gray-400';

type EntryFormProps = {
	onClose: () => void;
};

export const EntryForm: React.FC<EntryFormProps> = ({ onClose }) => {

	return (
		<form
			key='entry-form'
			className='flex flex-col w-[100vw] h-[100dvh] md:w-auto md:h-auto md:max-h-[90vh] md:max-w-2xl lg:max-w-3xl bg-gray-900 relative md:shadow-2xl shadow-black overflow-y-auto p-6 md:p-10 rounded-none md:rounded-2xl custom-scrollbar'
			style={{ boxSizing: 'border-box' }}>	
			<h2
				id='entry-form-title'
				className='mb-2 md:mb-5 text-2xl md:text-3xl font-bold flex text-center justify-center items-center pr-8 md:pr-0'>
				¡Bienvenido a la comunidad!
			</h2>

			<button
				type='button'
				onClick={onClose}
				aria-label='Cerrar formulario de ingreso'
				className='min-h-[44px] min-w-[44px] bg-red-500 hover:bg-red-600 hover:text-black cursor-pointer top-5 right-5 md:top-8 md:right-8 text-white rounded-full transition absolute flex items-center justify-center z-10'>
				<FaTimes size={14} className='md:w-4 md:h-4' aria-hidden />
			</button>
				<RulesAndConfirmation/>
		</form>
	);
};
