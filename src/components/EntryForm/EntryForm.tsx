import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	entryFormSchema,
	type FormInputData,
} from '../SocialLinks/schema/entryFormSchema';
import { InputField } from '../forms/InputField';
import { FaTimes } from 'react-icons/fa';
import './Button.css';
import { registerMember } from 'src/services/form.service';
import { registerMemberAdapter } from 'src/adapters/register-member.adapter';
import { ProgressIndicator } from './steps/ProgressIndicator';
import { PersonalData } from './inputs/PersonalData';
import { WorkData } from './inputs/WorkData';
import { RulesAndConfirmation } from './steps/RulesAndConfirmation';
import { showNotification } from '@components/Toasts/notifications';


const inputClass =
	'border p-2 rounded w-full bg-[#181f2a] text-white placeholder-gray-400';

type EntryFormProps = {
	onClose: () => void;
};

export const EntryForm: React.FC<EntryFormProps> = ({ onClose }) => {
	const [currentStage, setCurrentStage] = useState<'personal' | 'confirmation'>(
		'personal',
	);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		control,
		trigger,
	} = useForm<FormInputData>({
		resolver: zodResolver(entryFormSchema),
		defaultValues: {
			email: '',
			age: undefined,
			firstName: '',
			lastName: '',
			phone: '',
			discord: '',
			country: '',
			otherCountry: '',
			role: '',
			stack: [],
			experience: '',
			linkedin: '',
			github: '',
			behance: '',
			website: '',
			otherNetwork: '',
			expectations: '',
		},
		mode: 'onChange',
	});

	const countryValue = watch('country');

	const handleNext = () => {
		trigger().then((valid) => {
			if (!valid) {
				showNotification('errorForm');
				return;
			}
			setCurrentStage('confirmation');
		});
	};

	const handleBack = () => {
		setCurrentStage('personal');
	};

	const handleSubmitForm = (data: FormInputData) => {
		const formattedData = registerMemberAdapter(data);

		registerMember(formattedData)
			.then((res) => {
				onClose();
			})
			.catch((err: Error) => {
				console.log(err.message);
			});
	};

	return (
		<form
			key='entry-form'
			onSubmit={handleSubmit(handleSubmitForm)}
			className='flex flex-col h-screen gap-4 max-w-160 bg-gray-900  relative shadow-2xl shadow-black  overflow-y-auto p-10 rounded custom-scrollbar'
			style={{ boxSizing: 'border-box' }}>
			<h2 className='mb-5 text-3xl font-bold  flex justify-center items-center'>
				¡Bienvenido a la comunidad!
			</h2>

			{/* Progress Indicator */}
			<ProgressIndicator currentStage={currentStage} />

			<button
				type='button'
				onClick={onClose}
				className='w-8 h-8 bg-red-500 top-10 right-5 text-white rounded-full hover:bg-red-600 transition absolute flex items-center justify-center'>
				<FaTimes size={16} />
			</button>

			{currentStage === 'personal' ? (
				<>
					<InputField
						label='Correo electrónico *'
						error={errors.email?.message}>
						<input
							type='email'
							{...register('email')}
							className={inputClass}
							placeholder='Tu correo electrónico'
						/>
					</InputField>
					<PersonalData
						register={register}
						errors={errors}
						countryValue={countryValue ?? ''}
						control={control}
					/>
					<WorkData
						register={register}
						errors={errors}
						control={control}
					/>

					<div className=' h-20'>
						<button
							type='button'
							onClick={handleNext}
							className='btn-gradient h-20'>
							Siguiente
						</button>
					</div>
				</>
			) : (
				<RulesAndConfirmation
					onAccept={handleSubmit(handleSubmitForm)}
					onBack={handleBack}
				/>
			)}
		</form>
	);
};
