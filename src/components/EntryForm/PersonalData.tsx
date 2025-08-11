import { InputField } from "@components/forms/InputField";
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { entryFormSchema, type FormInputData } from '../SocialLinks/schema/entryFormSchema';

const inputClass = 'border p-2 rounded w-full bg-[#181f2a] text-white placeholder-gray-400';

type FormSectionProps = {
  register: UseFormRegister<FormInputData>;
  errors: FieldErrors<FormInputData>;
};


type PersonalDataProps = FormSectionProps & {
  countryValue: string;
};

export const PersonalData: React.FC<PersonalDataProps> = ({ register, errors, countryValue }) => (
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