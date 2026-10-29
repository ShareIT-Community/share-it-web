import { useState } from 'react'
import { whatsappGroupIcons } from 'src/modules/community/constants/whatsappGroupIcons'
import Modal from './Modal'
import type { Group, GroupBody, Referent } from './types'

const input =
	'mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00e5ff] focus:ring-2 focus:ring-[#00e5ff]/50'
const label = 'block text-sm font-medium text-gray-300'

interface Props {
	group: Group | null // null = create
	defaultOrder: number
	referents: Referent[]
	/** Returns an error message, or undefined on success. */
	onSubmit: (body: GroupBody) => Promise<string | undefined>
	/** Returns an error message, or undefined on success. */
	onDelete: () => Promise<string | undefined>
	onClose: () => void
}

export default function GroupModal({ group, defaultOrder, referents, onSubmit, onDelete, onClose }: Props) {
	const [image, setImage] = useState(group?.image_url ?? '')

	return (
		<Modal
			title={group ? 'Editar grupo' : 'Agregar grupo'}
			itemName={group?.title}
			onClose={onClose}
			onDelete={group ? onDelete : undefined}
			onSubmit={(f) =>
				onSubmit({
					title: String(f.get('title')),
					order: Number(f.get('order')),
					description: String(f.get('description')),
					image_url: String(f.get('image_url')) || null,
					icon: String(f.get('icon')) || null,
					referent_ids: f.getAll('referent_ids').map(Number),
				})
			}
		>
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
			{referents.length > 0 && (
				<fieldset className='space-y-1'>
					<legend className={label}>Referentes</legend>
					{referents.map((r) => (
						<label key={r.id} className='flex items-center gap-2 text-sm text-gray-200'>
							<input
								type='checkbox'
								name='referent_ids'
								value={r.id}
								defaultChecked={group?.referents.some((x) => x.id === r.id)}
								className='accent-[#00e5ff]'
							/>
							{r.name}
						</label>
					))}
				</fieldset>
			)}
		</Modal>
	)
}
