import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Controller, type Control } from 'react-hook-form';

interface Props {
	control: Control<any>;
	name: string;
	label?: string;
	error: string;
}

export const InputPhoneNumber = ({ control, name, label, error }: Props) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div className='space-y-2 text-left'>
					{label && <label className='text-left block'>{label}</label>}
					<PhoneInput
						placeholder='Inserta tu telefono'
						value={field.value}
						defaultCountry='AR'
						international
						withCountryCallingCode
						onChange={field.onChange}
						className='w-full border border-white p-2 rounded-md'
					/>
					<span className='mt-4 text-sm text-red-500'>{error}</span>
				</div>
			)}
		/>
	);
};
