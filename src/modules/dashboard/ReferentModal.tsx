import { useState } from 'react'
import Modal from './Modal'
import { imageChange, type ImageChange } from './image'
import { Field, ImageField, ImageUrlField, LinksField, TextAreaField } from './fields'
import type { Link, Referent, ReferentBody } from './types'

interface Props {
	referent: Referent | null // null = create
	/** Returns an error message, or undefined on success. */
	onSubmit: (body: ReferentBody, image: ImageChange) => Promise<string | undefined>
	/** Returns an error message, or undefined on success. */
	onDelete: () => Promise<string | undefined>
	onClose: () => void
}

export default function ReferentModal({ referent, onSubmit, onDelete, onClose }: Props) {
	const [links, setLinks] = useState<Link[]>(referent?.links ?? [])

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
				}, imageChange(f))
			}
		>
			<Field label='Nombre' name='name' defaultValue={referent?.name} maxLength={100} required />
			<Field label='Rol' name='role' defaultValue={referent?.role} maxLength={100} required />
			<TextAreaField label='Descripción (separá los párrafos con una línea en blanco)' name='description' rows={6} defaultValue={referent?.description} required />
			<ImageField label='Subir foto' current={referent?.image_url} avatar />
			<ImageUrlField label='Foto (URL)' name='image_url' defaultValue={referent?.image_url} avatar />
			<LinksField links={links} onChange={setLinks} />
		</Modal>
	)
}
