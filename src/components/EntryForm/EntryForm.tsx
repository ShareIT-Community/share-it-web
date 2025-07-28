import React from 'react';
import { useForm } from 'react-hook-form';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { entryFormSchema, type FormData, type FormInputData } from '../SocialLinks/schema/entryFormSchema';
import { InputField } from '../forms/InputField';
import { FaTimes } from 'react-icons/fa';

const inputClass = 'border p-2 rounded w-full bg-[#181f2a] text-white placeholder-gray-400';

type EntryFormProps = {
  onClose: () => void;
};

type FormSectionProps = {
  register: UseFormRegister<FormInputData>;
  errors: FieldErrors<FormInputData>;
};

type DatosPersonalesProps = FormSectionProps & {
  countryValue: string;
};

const DatosPersonales: React.FC<DatosPersonalesProps> = ({ register, errors, countryValue }) => (
  <>
    <h2 className="text-lg font-bold mt-4 text-white">DATOS PERSONALES</h2>
    <InputField label="Edad *" error={errors.age?.message}>
      <input type="number" {...register('age')} className={inputClass} placeholder="Inserta tu edad" />
    </InputField>
    <InputField label="Nombre *" error={errors.firstName?.message}>
      <input type="text" {...register('firstName')} className={inputClass} placeholder="Tu nombre" />
    </InputField>
    <InputField label="Apellido *" error={errors.lastName?.message}>
      <input type="text" {...register('lastName')} className={inputClass} placeholder="Tu apellido" />
    </InputField>
    <InputField label="Celular *" error={errors.phone?.message}>
      <input type="text" {...register('phone')} className={inputClass} placeholder="Ej: 11-1234-5678" />
    </InputField>
    <InputField label="Alias o Nick en Discord" error={errors.discord?.message}>
      <input type="text" {...register('discord')} className={inputClass} placeholder="Tu usuario de Discord" />
    </InputField>
    <InputField label="País de Residencia *" error={errors.country?.message}>
      <select {...register('country')} className={inputClass}>
        <option value="">Selecciona un país</option>
        <option value="Argentina">Argentina</option>
        <option value="México">México</option>
        <option value="Colombia">Colombia</option>
        <option value="Otra">Otra</option>
      </select>
    </InputField>
    {countryValue === 'Otra' && (
      <InputField
        label="Si pusiste Otra en País de Residencia, especificá cuál es."
        error={errors.otherCountry?.message}
      >
        <input type="text" {...register('otherCountry')} className={inputClass} placeholder="Tu país" />
      </InputField>
    )}
  </>
);

const DatosLaborales: React.FC<FormSectionProps> = ({ register, errors }) => (
  <>
    <h2 className="text-lg font-bold mt-4 text-white">DATOS LABORALES</h2>
    <InputField label="Rol actual / Rol al que aspiras *" error={errors.role?.message}>
      <input type="text" {...register('role')} className={inputClass} placeholder="Ej: Frontend Developer" />
    </InputField>
    <InputField label="¿Cuál es tu stack tecnológico? Por favor escribe las tecnologías separadas por comas." error={errors.stack?.message}>
      <input type="text" {...register('stack')} className={inputClass} placeholder="Ej: React, TypeScript, Tailwind CSS" />
    </InputField>
    <InputField label="Si estás trabajando en la industria, ¿cuántos años de experiencia tenés?" error={errors.experience?.message}>
      <input type="text" {...register('experience')} className={inputClass} placeholder="Ej: 3 años" />
    </InputField>
    <InputField label="Tu LinkedIn es..." error={errors.linkedin?.message}>
      <input type="text" {...register('linkedin')} className={inputClass} placeholder="Tu perfil de LinkedIn" />
    </InputField>
    <InputField label="Tu GitHub es..." error={errors.github?.message}>
      <input type="text" {...register('github')} className={inputClass} placeholder="Tu perfil de GitHub" />
    </InputField>
    <InputField label="Tu Behance es..." error={errors.behance?.message}>
      <input type="text" {...register('behance')} className={inputClass} placeholder="Tu perfil de Behance" />
    </InputField>
    <InputField label="Tu sitio web es..." error={errors.website?.message}>
      <input type="text" {...register('website')} className={inputClass} placeholder="Tu sitio web personal" />
    </InputField>
    <InputField label="Tenés otra red? Contanos" error={errors.otherNetwork?.message}>
      <input type="text" {...register('otherNetwork')} className={inputClass} placeholder="Otras redes sociales" />
    </InputField>
    <InputField label="¿Qué es lo que esperás de la comunidad? ¿Cuáles serían tus ideas para contribuir a la misma?" error={errors.expectations?.message}>
      <textarea {...register('expectations')} className={inputClass} placeholder="Cuéntanos tus expectativas y cómo te gustaría contribuir a la comunidad." />
    </InputField>
  </>
);

export const EntryForm: React.FC<EntryFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
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

  return (
    <form
      key="entry-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full relative shadow-2xl shadow-black h-200 overflow-y-auto p-10 bg-[#101828] rounded custom-scrollbar"
      style={{ boxSizing: 'border-box' }}
    >
      <h2 className='mb-5 text-3xl font-bold'>¡Binvenido a la comunidad!</h2>
      <InputField label="Correo electrónico *" error={errors.email?.message}>
        <input
          type="email"
          {...register('email')}
          className={inputClass}
          placeholder="Tu correo electrónico"
        />
      </InputField>
      <DatosPersonales register={register} errors={errors} countryValue={countryValue ?? ''} />
      <DatosLaborales register={register} errors={errors} />
      <div className="mt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Siguiente
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 bg-red-500 top-5 right-5 text-white rounded-full hover:bg-red-600 transition absolute flex items-center justify-center"
        >
          <FaTimes size={16} />
        </button>
      </div>
      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #85D9F6  transparent;
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
