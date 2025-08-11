import { InputField } from "@components/forms/InputField";
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { entryFormSchema, type FormInputData } from '../SocialLinks/schema/entryFormSchema';

const inputClass = 'border p-2 rounded w-full bg-[#181f2a] text-white placeholder-gray-400';

type FormSectionProps = {
    register: UseFormRegister<FormInputData>;
    errors: FieldErrors<FormInputData>;
};

export const WorkData: React.FC<FormSectionProps> = ({ register, errors }) => (
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
