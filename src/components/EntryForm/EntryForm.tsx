import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ProgressIndicator } from './steps/ProgressIndicator';
import { InputField } from '../forms/InputField';
import { PersonalData } from './inputs/PersonalData';
import { WorkData } from './inputs/WorkData';
import { RulesAndConfirmation } from './steps/RulesAndConfirmation';

import "./Button.css";
import { useEntryForm } from 'src/hooks/useEntryForm';

type EntryFormProps = {
  onClose: () => void;
};

const inputClass = 'border p-2 rounded w-full bg-[#181f2a] text-white placeholder-gray-400';

export const EntryForm: React.FC<EntryFormProps> = ({ onClose }) => {
  const [currentStage, setCurrentStage] = useState<'personal' | 'confirmation'>('personal');
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useEntryForm();

  const countryValue = watch('country');

  const onSubmit = (data: any) => {
    alert('Formulario enviado correctamente!');
    onClose();
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) setCurrentStage('confirmation');
  };

  const handleBack = () => setCurrentStage('personal');

  // para pasar a RulesAndConfirmation y que ejecute la validación de react-hook-form
  const handleSubmitForm = handleSubmit((data) => {
    alert('Formulario enviado correctamente!');
    onClose();
  });

  return (
    <form
      key="entry-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-screen gap-4 max-w-160 bg-gray-900 relative shadow-2xl shadow-black overflow-y-auto p-10 rounded custom-scrollbar"
      style={{ boxSizing: 'border-box' }}
    >
      <h2 className='mb-5 text-3xl font-bold flex justify-center items-center'>¡Bienvenido a la comunidad!</h2>

      <ProgressIndicator currentStage={currentStage} />

      <button
        type="button"
        onClick={onClose}
        className="w-8 h-8 bg-red-500 top-10 right-5 text-white rounded-full hover:bg-red-600 transition absolute flex items-center justify-center"
      >
        <FaTimes size={16} />
      </button>

      {currentStage === 'personal' ? (
        <>
          <InputField label="Correo electrónico *" error={errors.email?.message}>
            <input
              type="email"
              {...register('email')}
              className={inputClass}
              placeholder="Tu correo electrónico"
            />
          </InputField>

          <PersonalData register={register} errors={errors} countryValue={countryValue ?? ''} />
          <WorkData register={register} errors={errors} />

          <div className="h-20">
            <button type="button" onClick={handleNext} className="btn-gradient h-20">
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <RulesAndConfirmation onAccept={handleSubmitForm} onBack={handleBack} />
      )}

      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #94e7f8 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #111;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-left: 1px solid #222;
        }
      `}</style>
    </form>
  );
};
