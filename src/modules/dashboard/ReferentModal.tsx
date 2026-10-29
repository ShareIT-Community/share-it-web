import { useState } from 'react'
import Modal from './Modal'
import type { Link, Referent, ReferentBody } from './types'

const input =
	'mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00e5ff] focus:ring-2 focus:ring-[#00e5ff]/50'
const label = 'block text-sm font-medium text-gray-300'

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
	const [image, setImage] = useState(referent?.image_url ?? '')
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
					image_url: image || null,
					links,
				})
			}
		>
			<label className={label}>
				Nombre
				<input className={input} name='name' defaultValue={referent?.name} maxLength={100} required />
			</label>
			<label className={label}>
				Rol
				<input className={input} name='role' defaultValue={referent?.role} maxLength={100} required />
			</label>
			<label className={label}>
				Descripción (separá los párrafos con una línea en blanco)
				<textarea className={input} name='description' rows={6} defaultValue={referent?.description} required />
			</label>
			<div className='flex items-end gap-3'>
				{image && <img src={image} alt='' className='h-12 w-12 shrink-0 rounded-full border border-white/10 object-cover' />}
				<label className={`${label} min-w-0 flex-1`}>
					Foto (URL)
					<input className={input} maxLength={500} value={image} onChange={(e) => setImage(e.target.value)} />
				</label>
			</div>
			<fieldset className='space-y-2'>
				<legend className={label}>Enlaces</legend>
				{links.map((l, i) => (
					<div key={i} className='flex flex-col gap-2 sm:flex-row sm:items-center'>
						<input
							className={`${input} mt-0 min-w-0 sm:w-1/3`}
							aria-label='Etiqueta'
							placeholder='LinkedIn'
							value={l.label}
							onChange={(e) => setLink(i, { label: e.target.value })}
							required
						/>
						<input
							className={`${input} mt-0 min-w-0 flex-1`}
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
