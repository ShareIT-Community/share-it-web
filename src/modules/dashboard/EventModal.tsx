import Modal from './Modal'
import { Field, labelClass, selectClass, TextAreaField } from './fields'
import type { EventBody, EventItem } from './types'

const pad = (n: number) => String(n).padStart(2, '0')
const toLocalInput = (iso?: string) => {
	if (!iso) return ''
	const d = new Date(/(Z|[+-]\d\d:\d\d)$/.test(iso) ? iso : `${iso}Z`)
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const toIso = (local: string) => new Date(local).toISOString()
const text = (f: FormData, k: string) => String(f.get(k) ?? '').trim() || null

interface Props {
	event: EventItem | null 
	onSubmit: (body: EventBody) => Promise<string | undefined>
	onDelete: () => Promise<string | undefined>
	onClose: () => void
}

export default function EventModal({ event, onSubmit, onDelete, onClose }: Props) {
	return (
		<Modal
			title={event ? 'Editar evento' : 'Agregar evento'}
			itemName={event?.title}
			onClose={onClose}
			onDelete={event ? onDelete : undefined}
			onSubmit={(f) =>
				onSubmit({
					title: String(f.get('title')),
					description: String(f.get('description')),
					type: f.get('type') as EventBody['type'],
					start_at: toIso(String(f.get('start_at'))),
					end_at: toIso(String(f.get('end_at'))),
					location: text(f, 'location'),
					speaker: text(f, 'speaker'),
					site: text(f, 'site'),
					media: text(f, 'media'),
					repository: text(f, 'repository'),
				})
			}
		>
			<Field label='Título' name='title' defaultValue={event?.title} maxLength={150} required />
			<label className={labelClass}>
				Tipo
				<select className={selectClass} name='type' defaultValue={event?.type ?? 'meetup'}>
					<option value='meetup'>Comunidad (meetup)</option>
					<option value='workshop'>Taller (workshop)</option>
				</select>
			</label>
			<TextAreaField label='Descripción' name='description' rows={5} defaultValue={event?.description} required />
			<div className='grid gap-4 sm:grid-cols-2'>
				<Field label='Inicio (tu hora local)' name='start_at' type='datetime-local' defaultValue={toLocalInput(event?.start_at)} required />
				<Field label='Fin (tu hora local)' name='end_at' type='datetime-local' defaultValue={toLocalInput(event?.end_at)} required />
			</div>
			<Field label='Lugar' name='location' defaultValue={event?.location ?? ''} />
			<Field label='Orador/a' name='speaker' defaultValue={event?.speaker ?? ''} />
			<Field label='Sitio (URL)' name='site' type='url' placeholder='https://…' defaultValue={event?.site ?? ''} />
			<Field label='Grabación (URL)' name='media' type='url' placeholder='https://…' defaultValue={event?.media ?? ''} />
			<Field label='Repositorio (URL)' name='repository' type='url' placeholder='https://…' defaultValue={event?.repository ?? ''} />
		</Modal>
	)
}
