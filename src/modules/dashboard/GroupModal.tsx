import { useEffect, useRef, useState, type FormEvent } from 'react'
import { whatsappGroupIcons } from 'src/modules/community/constants/whatsappGroupIcons'
import type { Group, GroupBody } from './types'

const input =
	'mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00e5ff] focus:ring-2 focus:ring-[#00e5ff]/50'
const label = 'block text-sm font-medium text-gray-300'
const btn =
	'cursor-pointer rounded-xl px-5 py-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'

interface Props {
	group: Group | null // null = create
	defaultOrder: number
	/** Returns an error message, or undefined on success. */
	onSubmit: (body: GroupBody) => Promise<string | undefined>
	/** Returns an error message, or undefined on success. */
	onDelete: () => Promise<string | undefined>
	onClose: () => void
}

export default function GroupModal({ group, defaultOrder, onSubmit, onDelete, onClose }: Props) {
	const ref = useRef<HTMLDialogElement>(null)
	const [error, setError] = useState('')
	const [busy, setBusy] = useState(false)
	const [confirming, setConfirming] = useState(false)
	const [image, setImage] = useState(group?.image_url ?? '')

	useEffect(() => {
		const opener = document.activeElement as HTMLElement | null
		ref.current?.showModal() // moves focus inside; Escape fires `close`
		return () => opener?.focus()
	}, [])

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const f = new FormData(e.currentTarget)
		setBusy(true)
		setError('')
		const err = await onSubmit({
			title: String(f.get('title')),
			order: Number(f.get('order')),
			description: String(f.get('description')),
			image_url: String(f.get('image_url')) || null,
			icon: String(f.get('icon')) || null,
		})
		setBusy(false)
		if (err) setError(err)
	}

	async function remove() {
		setBusy(true)
		setError('')
		const err = await onDelete()
		setBusy(false)
		if (err) setError(err)
	}

	return (
		<dialog
			ref={ref}
			onClose={onClose}
			onClick={(e) => e.target === ref.current && ref.current?.close()}
			aria-labelledby='group-modal-title'
			aria-modal='true'
			className='m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl border border-white/10 bg-[#0a0f1d] p-0 text-white backdrop:bg-black/70'
		>
			<form onSubmit={submit} className='space-y-4 p-6'>
				<h2 id='group-modal-title' className='font-[Josefin_Sans] text-2xl font-bold'>
					{group ? 'Editar grupo' : 'Agregar grupo'}
				</h2>
				{error && (
					<p role='alert' className='rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300'>
						{error}
					</p>
				)}
				<label className={label}>
					Título
					<input className={input} name='title' defaultValue={group?.title} maxLength={100} required />
				</label>
				<label className={label}>
					Orden
					<input className={input} name='order' type='number' defaultValue={group?.order ?? defaultOrder} required />
				</label>
				<label className={label}>
					Descripción (separá los párrafos con una línea en blanco)
					<textarea className={input} name='description' rows={6} defaultValue={group?.description} required />
				</label>
				<div className='flex items-end gap-3'>
					{image && <img src={image} alt='' className='h-12 w-12 shrink-0 rounded-xl border border-white/10 object-cover' />}
					<label className={`${label} min-w-0 flex-1`}>
						Imagen (URL)
						<input
							className={input}
							name='image_url'
							maxLength={500}
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
					</label>
				</div>
				<label className={label}>
					Ícono
					<select className={`${input} scheme-dark [&_option]:bg-gray-900`} name='icon' defaultValue={group?.icon ?? ''}>
						<option value=''>(ninguno)</option>
						{Object.keys(whatsappGroupIcons).map((k) => (
							<option key={k} value={k}>
								{k}
							</option>
						))}
					</select>
				</label>
				<div className='flex items-center justify-end gap-3'>
					{group && (
						<div className='mr-auto flex gap-2'>
							<button
								type='button'
								disabled={busy}
								onClick={() => (confirming ? remove() : setConfirming(true))}
								className={`${btn} border border-red-500/60 text-red-300 hover:bg-red-500/10 disabled:opacity-60`}
							>
								{confirming ? '¿Seguro? Confirmar borrado' : 'Borrar'}
							</button>
							{confirming && (
								<button type='button' onClick={() => setConfirming(false)} className={`${btn} text-gray-300 hover:bg-white/10`}>
									No
								</button>
							)}
						</div>
					)}
					<button type='button' onClick={() => ref.current?.close()} className={`${btn} border border-white/20 text-gray-200 hover:bg-white/10`}>
						Cancelar
					</button>
					<button type='submit' disabled={busy} className={`${btn} bg-[#00e5ff] text-gray-900 hover:brightness-110 disabled:opacity-60`}>
						{busy ? 'Guardando…' : 'Guardar'}
					</button>
				</div>
			</form>
		</dialog>
	)
}
