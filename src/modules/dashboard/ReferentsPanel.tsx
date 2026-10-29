import { useState } from 'react'
import ReferentCard from './ReferentCard'
import ReferentModal from './ReferentModal'
import type { Referent, ReferentBody } from './types'

const API = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'

const btn =
	'cursor-pointer rounded-xl px-5 py-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'

interface Props {
	token: string
	referents: Referent[]
	setReferents: React.Dispatch<React.SetStateAction<Referent[]>>
	notify: (msg: string) => void
	onUnauthorized: () => void
}

export default function ReferentsPanel({ token, referents, setReferents, notify, onUnauthorized }: Props) {
	// undefined = closed, null = creating, Referent = editing
	const [editing, setEditing] = useState<Referent | null | undefined>(undefined)

	/** Shared fetch for writes; returns an error message for the modal, undefined on success. */
	async function write(path: string, method: string, body?: ReferentBody): Promise<{ ok?: boolean; error?: string; data?: Referent }> {
		try {
			const res = await fetch(`${API}/referents${path}`, {
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
				return { error: typeof detail === 'string' ? detail : `Error al guardar (${res.status})` }
			}
			return { ok: true, data: res.status === 204 ? undefined : await res.json() }
		} catch {
			return { error: 'No se pudo conectar' }
		}
	}

	async function submit(body: ReferentBody): Promise<string | undefined> {
		const id = editing?.id
		const { error, data } = await write(id ? `/${id}` : '', id ? 'PATCH' : 'POST', body)
		if (!data) return error
		setReferents((rs) => (id ? rs.map((x) => (x.id === id ? data : x)) : [...rs, data]))
		notify(`Guardado: ${data.name}`)
		setEditing(undefined)
	}

	async function remove(): Promise<string | undefined> {
		const id = editing?.id
		const { ok, error } = await write(`/${id}`, 'DELETE')
		if (!ok) return error
		setReferents((rs) => rs.filter((x) => x.id !== id))
		notify('Guardado: referente borrado')
		setEditing(undefined)
	}

	return (
		<>
			<button onClick={() => setEditing(null)} className={`${btn} mb-6 bg-[#00e5ff] text-gray-900 hover:brightness-110`}>
				+ Agregar referente
			</button>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
				{referents.map((r) => (
					<ReferentCard key={r.id} r={r} onEdit={() => setEditing(r)} />
				))}
			</div>
			{editing !== undefined && (
				<ReferentModal
					key={editing?.id ?? 'new'}
					referent={editing}
					onSubmit={submit}
					onDelete={remove}
					onClose={() => setEditing(undefined)}
				/>
			)}
		</>
	)
}
