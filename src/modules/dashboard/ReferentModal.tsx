import { useState } from 'react'
import Modal from './Modal'
import { Field, ImageUrlField, inputClass, labelClass, TextAreaField } from './fields'
import type { Link, Referent, ReferentBody } from './types'

const btn =
	'cursor-pointer rounded-xl px-5 py-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'

interface Props {
	referent: Referent | null // null = create
	/** Returns an error message, or undefined on success. */
	onSubmit: (body: ReferentBody) => Promise<string | undefined>
	/** Returns an error message, or undefined on success. */
	onDelete: () => Promise<string | undefined>
	onClose: () => void
}

export default function ReferentModal({ referent, onSubmit, onDelete, onClose }: Props) {
	const [links, setLinks] = useState<Link[]>(referent?.links ?? [])

	const setLink = (i: number, patch: Partial<Link>) =>
		setLinks((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)))

	return (
		<Modal
			title={referent ? 'Editar referente' : 'Agregar referente'}
			itemName={referent?.name}
			onClose={onClose}
			onDelete={referent ? onDelete : undefined}
			onSubmit={(f) =>
				onSubmit({
					name: String(f.get('name')),
					role: String(f.get('role')),
					description: String(f.get('description')),
					image_url: String(f.get('image_url')) || null,
					links,
				})
			}
		>
			<Field label='Nombre' name='name' defaultValue={referent?.name} maxLength={100} required />
			<Field label='Rol' name='role' defaultValue={referent?.role} maxLength={100} required />
			<TextAreaField label='Descripción (separá los párrafos con una línea en blanco)' name='description' rows={6} defaultValue={referent?.description} required />
			<ImageUrlField label='Foto (URL)' name='image_url' defaultValue={referent?.image_url} avatar />
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
							onClick={() => setLinks((ls) => ls.filter((_, j) => j !== i))}
							className={`${btn} self-end px-3 text-gray-300 hover:bg-white/10 sm:self-auto`}
						>
							×
						</button>
					</div>
				))}
				<button
					type='button'
					onClick={() => setLinks((ls) => [...ls, { label: '', url: '' }])}
					className={`${btn} border border-white/20 py-1.5 text-sm text-gray-200 hover:bg-white/10`}
				>
					+ Agregar enlace
				</button>
			</fieldset>
		</Modal>
	)
}
