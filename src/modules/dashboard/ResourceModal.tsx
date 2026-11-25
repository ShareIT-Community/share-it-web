import { useState } from 'react'
import Modal from './Modal'
import { Field, TagsField, TextAreaField } from './fields'
import type { Resource, ResourceBody } from './types'

interface Props {
	resource: Resource | null // null = create
	/** Every known tag name, for the autocomplete. */
	tagNames: string[]
	onSubmit: (body: ResourceBody) => Promise<string | undefined>
	onDelete: () => Promise<string | undefined>
	onClose: () => void
}

export default function ResourceModal({ resource, tagNames, onSubmit, onDelete, onClose }: Props) {
	const [tags, setTags] = useState<string[]>(resource?.tags.map((t) => t.name) ?? [])

	return (
		<Modal
			title={resource ? 'Editar recurso' : 'Agregar recurso'}
			itemName={resource?.title}
			onClose={onClose}
			onDelete={resource ? onDelete : undefined}
			onSubmit={(f) =>
				onSubmit({
					title: String(f.get('title')).trim(),
					description: String(f.get('description')).trim(),
					url: String(f.get('url')).trim(),
					tags,
				})
			}
		>
			<Field label='Título' name='title' defaultValue={resource?.title} maxLength={150} required />
			<TextAreaField label='Descripción' name='description' rows={4} defaultValue={resource?.description} required />
			<Field label='Enlace (URL)' name='url' type='url' placeholder='https://…' defaultValue={resource?.url} maxLength={500} required />
			<TagsField tags={tags} suggestions={tagNames} onChange={setTags} />
		</Modal>
	)
}
