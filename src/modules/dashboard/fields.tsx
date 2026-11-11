import { useEffect, useMemo, useRef, useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { IMAGE_TYPES, validateImage } from './image'
import type { Link } from './types'

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

/** File picker for the backend image upload: preview of the current/chosen image, remove action, inline error. Read it with `imageChange(FormData)`. */
export function ImageField({ label, current, avatar }: { label: string; current?: string | null; avatar?: boolean }) {
	const [file, setFile] = useState<File | null>(null)
	const [removed, setRemoved] = useState(false)
	const [error, setError] = useState('')
	const input = useRef<HTMLInputElement>(null)
	const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])
	useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])
	const shown = preview ?? (removed ? null : current)

	function pick(f?: File) {
		const err = f && validateImage(f)
		setError(err ?? '')
		if (err || !f) {
			if (input.current) input.current.value = ''
			return setFile(null)
		}
		setFile(f)
		setRemoved(false)
	}

	function remove() {
		if (input.current) input.current.value = ''
		setFile(null)
		setRemoved(true)
		setError('')
	}

	return (
		<div className='flex items-start gap-3'>
			{shown && <img src={shown} alt='' className={`h-16 w-16 shrink-0 border border-white/10 object-cover ${avatar ? 'rounded-full' : 'rounded-xl'}`} />}
			<div className='min-w-0 flex-1'>
				<label className={labelClass}>
					{label}
					<input
						ref={input}
						type='file'
						name='image'
						accept={IMAGE_TYPES.join(',')}
						aria-describedby={error ? 'image-error' : undefined}
						onChange={(e) => pick(e.target.files?.[0])}
						className={`${inputClass} file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-sm file:text-gray-100`}
					/>
				</label>
				{removed && !file && <input type='hidden' name='remove_image' value='1' />}
				{error && <p id='image-error' role='alert' className='mt-1 text-sm text-red-300'>{error}</p>}
				{shown && (
					<button
						type='button'
						onClick={remove}
						className='mt-2 cursor-pointer rounded-lg border border-white/20 px-3 py-1 text-sm text-gray-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff]'
					>
						Quitar imagen
					</button>
				)}
			</div>
		</div>
	)
}

const linkButton =
	'cursor-pointer rounded-xl px-5 py-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'

/** Editable list of `{label, url}` links; the parent owns the state. */
export function LinksField({ links, onChange }: { links: Link[]; onChange: (links: Link[]) => void }) {
	const setLink = (i: number, patch: Partial<Link>) => onChange(links.map((l, j) => (j === i ? { ...l, ...patch } : l)))
	return (
		<fieldset className='space-y-2'>
			<legend className={labelClass}>Enlaces</legend>
			{links.map((l, i) => (
				<div key={i} className='flex flex-col gap-2 sm:flex-row sm:items-center'>
					<input
						className={`${inputClass} mt-0 min-w-0 sm:w-1/3`}
						aria-label='Etiqueta'
						placeholder='LinkedIn'
						value={l.label}
						onChange={(e) => setLink(i, { label: e.target.value })}
						required
					/>
					<input
						className={`${inputClass} mt-0 min-w-0 flex-1`}
						aria-label='URL'
						type='url'
						placeholder='https://…'
						value={l.url}
						onChange={(e) => setLink(i, { url: e.target.value })}
						required
					/>
					<button
						type='button'
						aria-label='Quitar enlace'
						onClick={() => onChange(links.filter((_, j) => j !== i))}
						className={`${linkButton} self-end px-3 text-gray-300 hover:bg-white/10 sm:self-auto`}
					>
						×
					</button>
				</div>
			))}
			<button
				type='button'
				onClick={() => onChange([...links, { label: '', url: '' }])}
				className={`${linkButton} border border-white/20 py-1.5 text-sm text-gray-200 hover:bg-white/10`}
			>
				+ Agregar enlace
			</button>
		</fieldset>
	)
}
