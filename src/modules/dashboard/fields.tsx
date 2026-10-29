import { useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

export const inputClass =
	'mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00e5ff] focus:ring-2 focus:ring-[#00e5ff]/50'
export const selectClass = `${inputClass} scheme-dark [&_option]:bg-gray-900`
export const labelClass = 'block text-sm font-medium text-gray-300'

export function Field({ label, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
	return (
		<label className={labelClass}>
			{label}
			<input className={inputClass} {...props} />
		</label>
	)
}

export function TextAreaField({ label, ...props }: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return (
		<label className={labelClass}>
			{label}
			<textarea className={inputClass} {...props} />
		</label>
	)
}

/** URL input with a live thumbnail; `avatar` rounds it for people. */
export function ImageUrlField({ label, name, defaultValue, avatar }: { label: string; name: string; defaultValue?: string | null; avatar?: boolean }) {
	const [image, setImage] = useState(defaultValue ?? '')
	return (
		<div className='flex items-end gap-3'>
			{image && <img src={image} alt='' className={`h-12 w-12 shrink-0 border border-white/10 object-cover ${avatar ? 'rounded-full' : 'rounded-xl'}`} />}
			<label className={`${labelClass} min-w-0 flex-1`}>
				{label}
				<input className={inputClass} name={name} maxLength={500} value={image} onChange={(e) => setImage(e.target.value)} />
			</label>
		</div>
	)
}
