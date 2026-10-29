import { useState } from 'react'
import EventCard from './EventCard'
import EventModal from './EventModal'
import type { EventBody, EventItem } from './types'

const API = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'

const btn =
	'cursor-pointer rounded-xl px-5 py-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'

interface Props {
	token: string
	events: EventItem[]
	setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>
	notify: (msg: string) => void
	onUnauthorized: () => void
}

/** FastAPI `detail` is a string for business errors and a list of {loc, msg} for 422 validation errors. */
const detailText = (detail: unknown, fallback: string) =>
	typeof detail === 'string'
		? detail
		: Array.isArray(detail) && detail.length
			? detail.map((d) => d.msg).join('. ')
			: fallback

export default function EventsPanel({ token, events, setEvents, notify, onUnauthorized }: Props) {
	// undefined = closed, null = creating, EventItem = editing
	const [editing, setEditing] = useState<EventItem | null | undefined>(undefined)

	/** Shared fetch for writes; returns an error message for the modal, undefined on success. */
	async function write(path: string, method: string, body?: EventBody): Promise<{ ok?: boolean; error?: string; data?: EventItem }> {
		try {
			const res = await fetch(`${API}/events${path}`, {
				method,
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: body && JSON.stringify(body),
			})
			if (res.status === 401) {
				onUnauthorized()
				return {}
			}
			if (!res.ok) {
				const { detail } = await res.json().catch(() => ({}))
				return { error: detailText(detail, `Error al guardar (${res.status})`) }
			}
			return { ok: true, data: res.status === 204 ? undefined : await res.json() }
		} catch {
			return { error: 'No se pudo conectar' }
		}
	}

	async function submit(body: EventBody): Promise<string | undefined> {
		const id = editing?.id
		const { error, data } = await write(id ? `/${id}` : '', id ? 'PATCH' : 'POST', body)
		if (!data) return error
		setEvents((es) => (id ? es.map((x) => (x.id === id ? data : x)) : [...es, data]))
		notify(`Guardado: ${data.title}`)
		setEditing(undefined)
	}

	async function remove(): Promise<string | undefined> {
		const id = editing?.id
		const { ok, error } = await write(`/${id}`, 'DELETE')
		if (!ok) return error
		setEvents((es) => es.filter((x) => x.id !== id))
		notify('Guardado: evento borrado')
		setEditing(undefined)
	}

	return (
		<>
			<button onClick={() => setEditing(null)} className={`${btn} mb-6 bg-[#00e5ff] text-gray-900 hover:brightness-110`}>
				+ Agregar evento
			</button>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
				{[...events]
					.sort((a, b) => b.start_at.localeCompare(a.start_at))
					.map((e) => (
						<EventCard key={e.id} e={e} onEdit={() => setEditing(e)} />
					))}
			</div>
			{editing !== undefined && (
				<EventModal
					key={editing?.id ?? 'new'}
					event={editing}
					onSubmit={submit}
					onDelete={remove}
					onClose={() => setEditing(undefined)}
				/>
			)}
		</>
	)
}
