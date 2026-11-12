import { useState } from 'react'
import Modal from './Modal'
import { imageChange, type ImageChange } from './image'
import { Field, ImageField, ImageUrlField, LinksField, TextAreaField } from './fields'
import type { Admin, AdminBody, Link } from './types'

interface Props {
	admin: Admin | null // null = create
	/** Returns an error message, or undefined on success. */
	onSubmit: (body: AdminBody, image: ImageChange) => Promise<string | undefined>
	/** Returns an error message, or undefined on success. */
	onDelete: () => Promise<string | undefined>
	onClose: () => void
}

export default function AdminModal({ admin, onSubmit, onDelete, onClose }: Props) {
	const [links, setLinks] = useState<Link[]>(admin?.links ?? [])

	return (
		<Modal
			title={admin ? 'Editar admin' : 'Agregar admin'}
			itemName={admin?.name}
			onClose={onClose}
			onDelete={admin ? onDelete : undefined}
			onSubmit={(f) =>
				onSubmit({
					name: String(f.get('name')),
					about: String(f.get('about')),
					role: String(f.get('role')),
					description: String(f.get('description')),
					image_url: String(f.get('image_url')) || null,
					links,
				}, imageChange(f))
			}
		>
			<Field label='Nombre' name='name' defaultValue={admin?.name} maxLength={100} required />
			<Field label='Cargo en la comunidad' name='about' placeholder='Admin' defaultValue={admin?.about} maxLength={100} required />
			<Field label='Rol profesional' name='role' placeholder='Data Engineer' defaultValue={admin?.role} maxLength={100} required />
			<TextAreaField label='Descripción (separá los párrafos con una línea en blanco)' name='description' rows={6} defaultValue={admin?.description} required />
			<ImageField label='Subir foto' current={admin?.image_url} avatar />
			<ImageUrlField label='Foto (URL)' name='image_url' defaultValue={admin?.image_url} avatar />
			<LinksField links={links} onChange={setLinks} />
		</Modal>
	)
}
