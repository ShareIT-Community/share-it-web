import Modal from './Modal'
import type { EventBody, EventItem } from './types'

const input =
	'mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00e5ff] focus:ring-2 focus:ring-[#00e5ff]/50'
const label = 'block text-sm font-medium text-gray-300'

const pad = (n: number) => String(n).padStart(2, '0')
/** API ISO -> `datetime-local` value in the browser's timezone. */
const toLocalInput = (iso?: string) => {
	if (!iso) return ''
	const d = new Date(/(Z|[+-]\d\d:\d\d)$/.test(iso) ? iso : `${iso}Z`)
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
/** `datetime-local` value (browser timezone) -> aware ISO string (UTC); the backend rejects naive datetimes. */
const toIso = (local: string) => new Date(local).toISOString()
const text = (f: FormData, k: string) => String(f.get(k) ?? '').trim() || null

interface Props {
	event: EventItem | null // null = create
	/** Returns an error message, or undefined on success. */
	onSubmit: (body: EventBody) => Promise<string | undefined>
	/** Returns an error message, or undefined on success. */
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
			<label className={label}>
				Título
				<input className={input} name='title' defaultValue={event?.title} maxLength={150} required />
			</label>
			<label className={label}>
				Tipo
				<select className={`${input} scheme-dark [&_option]:bg-gray-900`} name='type' defaultValue={event?.type ?? 'meetup'}>
					<option  value='meetup'>Comunidad (meetup)</option>
					<option value='workshop'>Taller (workshop)</option>
				</select>
			</label>
			<label className={label}>
				Descripción
				<textarea className={input} name='description' rows={5} defaultValue={event?.description} required />
			</label>
			<div className='grid gap-4 sm:grid-cols-2'>
				<label className={label}>
					Inicio (tu hora local)
					<input className={input} name='start_at' type='datetime-local' defaultValue={toLocalInput(event?.start_at)} required />
				</label>
				<label className={label}>
					Fin (tu hora local)
					<input className={input} name='end_at' type='datetime-local' defaultValue={toLocalInput(event?.end_at)} required />
				</label>
			</div>
			<label className={label}>
				Lugar
				<input className={input} name='location' defaultValue={event?.location ?? ''} />
			</label>
			<label className={label}>
				Orador/a
				<input className={input} name='speaker' defaultValue={event?.speaker ?? ''} />
			</label>
			<label className={label}>
				Sitio (URL)
				<input className={input} name='site' type='url' placeholder='https://…' defaultValue={event?.site ?? ''} />
			</label>
			<label className={label}>
				Grabación (URL)
				<input className={input} name='media' type='url' placeholder='https://…' defaultValue={event?.media ?? ''} />
			</label>
			<label className={label}>
				Repositorio (URL)
				<input className={input} name='repository' type='url' placeholder='https://…' defaultValue={event?.repository ?? ''} />
			</label>
		</Modal>
	)
}
