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
			className='flex flex-col h-screen gap-4 max-w-160 bg-gray-900 relative shadow-2xl shadow-black overflow-y-auto p-10 rounded custom-scrollbar'
			style={{ boxSizing: 'border-box' }}>	
			<h2 className='mb-5 text-3xl font-bold flex justify-center items-center'>
				¡Bienvenido a la comunidad!
			</h2>	

			<button
				type='button'
				onClick={onClose}
				className='w-8 h-8 bg-red-500 hover:bg-red-00 hover:text-black cursor-pointer top-10 right-5 text-white rounded-full transition absolute flex items-center justify-center'>
				<FaTimes size={16} />
			</button>
				<RulesAndConfirmation/>
		</form>
	);
};
