import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { InputField } from '../forms/InputField';
import { FaTimes } from 'react-icons/fa';
import { RulesTimelines } from '../RulesTimelines/RulesTimelines';
import { ProgressIndicator } from './ProgressIndicator';
import "./Button.css"
import { PersonalData } from './PersonalData';
import { WorkData } from './WorkData';
import { entryFormSchema, type FormInputData } from '@components/SocialLinks/schema/entryFormSchema';



type EntryFormProps = {
  onClose: () => void;
};



const inputClass = 'border p-2 rounded w-full bg-[#181f2a] text-white placeholder-gray-400';


const RulesAndConfirmation: React.FC<{ onAccept: () => void; onBack: () => void }> = ({ onAccept, onBack }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <>
      <h2 className="text-lg font-bold mt-4 text-white">REGLAS Y CONFIRMACIÓN</h2>
      
      <div className="  p-4 rounded-lg mb-4">
        
          <RulesTimelines />
        
      </div>


      <div className="flex items-start gap-3 mb-6">
        <input
          type="checkbox"
          id="accept-rules"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor="accept-rules" className="text-white text-sm">
          Entiendo y acepto las reglas de la comunidad
        </label>
      </div>

      <div className="flex h-10 justify-center items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-4 py-2 btn-back transition"
        >
          Volver
        </button>
        <div className="flex-1 flex justify-center h-10 items-center">
          <button
            type="button"
            onClick={onAccept}
            disabled={!accepted}
            className={`w-full flex justify-center items-center text-white rounded transition-all duration-200
                        ${accepted ? 'btn-gradient' : 'btn-disabled'}`}
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};

export const EntryForm: React.FC<EntryFormProps> = ({ onClose }) => {
  const [currentStage, setCurrentStage] = useState<'personal' | 'confirmation'>('personal');
  
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
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
      stack: '',
      experience: '',
      linkedin: '',
      github: '',
      behance: '',
      website: '',
      otherNetwork: '',
      expectations: '',
    },
  });

  const countryValue = watch('country');

  const onSubmit = (data: FormInputData) => {
    alert('Formulario enviado correctamente!');
    onClose();
  };

  const handleNext = async () => {
    // Validar todos los campos usando el schema existente
    const isValid = await trigger();
    if (isValid) {
      setCurrentStage('confirmation');
    }
  };

  const handleBack = () => {
    setCurrentStage('personal');
  };

  const handleSubmitForm = () => {
    // Aquí se enviaría el formulario
    alert('Formulario enviado correctamente!');
    onClose();
  };

  return (
    <form
      key="entry-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-screen gap-4 max-w-160 bg-gray-900  relative shadow-2xl shadow-black  overflow-y-auto p-10 rounded custom-scrollbar"
      style={{ boxSizing: 'border-box' }}
    >
      <h2 className='mb-5 text-3xl font-bold  flex justify-center items-center'>¡Bienvenido a la comunidad!</h2>
      
      {/* Progress Indicator */}
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
          
          <div className=" h-20">
            <button type="button" onClick={handleNext} className="btn-gradient h-20"    >
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


{/*
  linkedin obligatorio
  sacar limite de letras en lo ultimo
  sumar la advertencia al componente de reglas
  
  */}