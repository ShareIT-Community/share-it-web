import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { InputField } from '../forms/InputField';
import { registerMember } from 'src/services/form.service';
import { registerMemberAdapter } from 'src/adapters/register-member.adapter';
import { ProgressIndicator } from './steps/ProgressIndicator';
import { PersonalData } from './inputs/PersonalData';
import { WorkData } from './inputs/WorkData';
import { RulesAndConfirmation } from './steps/RulesAndConfirmation';
import { useEntryForm } from 'src/hooks/useEntryForm'; 
import './Button.css';
import { toast } from 'react-toastify';

const inputClass =
	'border p-2 rounded w-full bg-[#181f2a] text-white placeholder-gray-400';

type EntryFormProps = {
	onClose: () => void;
};

export const EntryForm: React.FC<EntryFormProps> = ({ onClose }) => {
	const [currentStage, setCurrentStage] = useState<'personal' | 'confirmation'>(
		'personal',
	);
	const [isSucess, setIssSucess] = useState(false)
	const [isLoading, setIsloading] = useState(false)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		control,
		trigger,
	} = useEntryForm();

	const countryValue = watch('country');

	const handleNext = () => {
		trigger().then((valid) => {
			if (!valid) {
				toast.error('Error al llenar el formulario. Por favor, modifica los campos solicitados.');
				return;
			}
			setCurrentStage('confirmation');
		});
	};

	const handleBack = () => {
		setCurrentStage('personal');
		setIssSucess(false)
	};

	const handleSubmitForm = async (data: any) => {
		const formattedData = registerMemberAdapter(data);
		

		try{
			setIsloading(true)
			const data = await registerMember(formattedData)
			toast.success(data.message)
			setIssSucess(data.success)
		}catch(error:any){
			toast.error(error.message)
				setIssSucess(error.success)
		}finally{
			setIsloading(false)
		}
	}

	return (
		<form
			key='entry-form'
			onSubmit={handleSubmit(handleSubmitForm)}
			className='flex flex-col h-screen gap-4 max-w-160 bg-gray-900 relative shadow-2xl shadow-black overflow-y-auto p-10 rounded custom-scrollbar'
			style={{ boxSizing: 'border-box' }}>	
			<h2 className='mb-5 text-3xl font-bold flex justify-center items-center'>
				¡Bienvenido a la comunidad!
			</h2>	
			{/* Progress Indicator */}
			<ProgressIndicator currentStage={currentStage} />	
			{/* Botón cerrar */}
			<button
				type='button'
				onClick={onClose}
				className='w-8 h-8 bg-red-500 top-10 right-5 text-white rounded-full hover:bg-red-600 transition absolute flex items-center justify-center'>
				<FaTimes size={16} />
			</button>	
			{currentStage === 'personal' ? (
				<>
			    	<InputField label='Correo electrónico *' error={errors.email?.message}>
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
					<WorkData register={register} errors={errors} control={control} />
			
					<div className='h-20'>
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
					isSucces={isSucess}
					isLoading={isLoading}
				/>
			)}
		</form>
	);
};
