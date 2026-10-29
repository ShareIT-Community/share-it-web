import { whatsappGroupIcons } from 'src/modules/community/constants/whatsappGroupIcons'
import Modal from './Modal'
import { Field, ImageUrlField, labelClass, selectClass, TextAreaField } from './fields'
import type { Group, GroupBody, Referent } from './types'

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
			<Field label='Título' name='title' defaultValue={group?.title} maxLength={100} required />
			<Field label='Orden' name='order' type='number' defaultValue={group?.order ?? defaultOrder} required />
			<TextAreaField label='Descripción (separá los párrafos con una línea en blanco)' name='description' rows={6} defaultValue={group?.description} required />
			<ImageUrlField label='Imagen (URL)' name='image_url' defaultValue={group?.image_url} />
			<label className={labelClass}>
				Ícono
				<select className={selectClass} name='icon' defaultValue={group?.icon ?? ''}>
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
					<legend className={labelClass}>Referentes</legend>
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
