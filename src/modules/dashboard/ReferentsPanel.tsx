import { useState } from 'react'
import ReferentCard from './ReferentCard'
import ReferentModal from './ReferentModal'
import { DashboardHeading, DashboardState, DashboardToolbar, type DashboardLoadState } from './DashboardShell'
import { normalizeSearch } from './search'
import type { Referent, ReferentBody } from './types'

const API = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'

interface Props {
	token: string
	referents: Referent[]
	setReferents: React.Dispatch<React.SetStateAction<Referent[]>>
	notify: (msg: string) => void
	onUnauthorized: () => void
	loadState: DashboardLoadState
	onRetry: () => void
}

export default function ReferentsPanel({ token, referents, setReferents, notify, onUnauthorized, loadState, onRetry }: Props) {
	// undefined = closed, null = creating, Referent = editing
	const [editing, setEditing] = useState<Referent | null | undefined>(undefined)
	const [query, setQuery] = useState('')

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

	const search = normalizeSearch(query)
	const visibleReferents = referents.filter((r) => normalizeSearch(`${r.name} ${r.role}`).includes(search))

	return (
		<>
			<DashboardHeading title='Referentes' description='Administra a las personas que acompañan la comunidad.' action='Agregar referente' onAdd={() => setEditing(null)} />
			<DashboardToolbar query={query} onQueryChange={setQuery} placeholder='Buscar por nombre o rol…' resultLabel={loadState === 'ready' ? `${search ? `${visibleReferents.length} de ` : ''}${referents.length} ${referents.length === 1 ? 'referente' : 'referentes'}` : ''} />
			{loadState === 'loading' ? <DashboardState title='Cargando referentes…' loading />
				: loadState === 'error' ? <DashboardState title='No se pudieron cargar los referentes' description='Comprueba la conexión e inténtalo de nuevo.' onRetry={onRetry} />
				: referents.length === 0 ? <DashboardState title='Aún no hay referentes' description='Agrega el primer referente para completar los perfiles de la comunidad.' />
				: visibleReferents.length === 0 ? <DashboardState title='No se encontraron referentes' description='Prueba con otro nombre o rol.' />
				: <div className='dashboard-grid'>{visibleReferents.map((r) => <ReferentCard key={r.id} r={r} onEdit={() => setEditing(r)} />)}</div>
			}
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
