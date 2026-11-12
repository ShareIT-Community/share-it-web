import { useEffect, useState } from 'react'
import { FiMove } from 'react-icons/fi'
import AdminCard from './AdminCard'
import AdminModal from './AdminModal'
import ReorderList from './ReorderList'
import { DashboardHeading, DashboardState, DashboardToolbar, type DashboardLoadState } from './DashboardShell'
import { normalizeSearch } from './search'
import { notifyError, notifyOk } from './Toaster'
import { API, useCrud } from './useCrud'
import type { Admin, AdminBody } from './types'

interface Props {
	token: string
	admins: Admin[]
	setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>
	onUnauthorized: () => void
	loadState: DashboardLoadState
	onRetry: () => void
}

export default function AdminsPanel({ token, admins, setAdmins, onUnauthorized, loadState, onRetry }: Props) {
	const { editing, setEditing, submit, remove } = useCrud<Admin, AdminBody>({
		resource: 'admins',
		token,
		setItems: setAdmins,
		onUnauthorized,
		noun: 'Admin',
	})
	const [query, setQuery] = useState('')
	/** Working order while reordering; null = not reordering. */
	const [draft, setDraft] = useState<Admin[] | null>(null)
	const [saving, setSaving] = useState(false)

	const sorted = [...admins].sort((a, b) => a.order - b.order)
	const search = normalizeSearch(query)
	const visible = sorted.filter((a) => normalizeSearch(`${a.name} ${a.role} ${a.about}`).includes(search))
	const reordering = draft !== null
	const changed = reordering && draft.some((a, i) => a.id !== sorted[i]?.id)

	// Warn before a reload or tab close would drop an unsaved order.
	useEffect(() => {
		if (!changed) return
		const warn = (e: BeforeUnloadEvent) => e.preventDefault()
		window.addEventListener('beforeunload', warn)
		return () => window.removeEventListener('beforeunload', warn)
	}, [changed])

	async function saveOrder() {
		if (!draft) return
		setSaving(true)
		try {
			const res = await fetch(`${API}/admins/order`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: JSON.stringify({ ids: draft.map((a) => a.id) }),
			})
			if (res.status === 401 || res.status === 403) return onUnauthorized()
			if (res.status === 409) {
				notifyError('La lista de admins cambió. Se recargó la lista.')
				setDraft(null)
				return onRetry()
			}
			if (!res.ok) return notifyError(`Error al guardar el orden (${res.status})`)
			setAdmins(await res.json())
			setDraft(null)
			notifyOk('Orden guardado')
		} catch {
			notifyError('No se pudo conectar')
		} finally {
			setSaving(false)
		}
	}

	return (
		<>
			<DashboardHeading title='Admins' description='Administra a las personas que lideran la comunidad.' action='Agregar admin' onAdd={() => setEditing(null)} addDisabled={reordering} extra={loadState === 'ready' && admins.length > 1 && !reordering ? <button className='dashboard-button' type='button' onClick={() => setDraft(sorted)}><FiMove aria-hidden='true' />Reordenar</button> : undefined} />
			{reordering ? (
				<div className='dashboard-reorder-bar'>
					<p>Arrastra los admins desde el ícono o usa las flechas para cambiar su orden.</p>
					<div>
						<button className='dashboard-button' type='button' onClick={() => setDraft(null)} disabled={saving}>Cancelar</button>
						<button className='dashboard-button dashboard-button--primary' type='button' onClick={saveOrder} disabled={saving || !changed}>{saving ? 'Guardando…' : 'Guardar'}</button>
					</div>
				</div>
			) : <DashboardToolbar query={query} onQueryChange={setQuery} placeholder='Buscar por nombre o rol…' resultLabel={loadState === 'ready' ? `${search ? `${visible.length} de ` : ''}${admins.length} ${admins.length === 1 ? 'admin' : 'admins'}` : ''} />}
			{loadState === 'loading' ? <DashboardState title='Cargando admins…' loading />
				: loadState === 'error' ? <DashboardState title='No se pudieron cargar los admins' description='Comprueba la conexión e inténtalo de nuevo.' onRetry={onRetry} />
				: admins.length === 0 ? <DashboardState title='Aún no hay admins' description='Agrega el primer admin para mostrarlo en Sobre nosotros.' />
				: reordering ? <ReorderList items={draft.map((a) => ({ ...a, label: a.name }))} onChange={setDraft} />
				: visible.length === 0 ? <DashboardState title='No se encontraron admins' description='Prueba con otro nombre o rol.' />
				: <div className='dashboard-grid'>{visible.map((a) => <AdminCard key={a.id} a={a} onEdit={() => setEditing(a)} />)}</div>
			}
			{editing !== undefined && (
				<AdminModal
					key={editing?.id ?? 'new'}
					admin={editing}
					onSubmit={submit}
					onDelete={remove}
					onClose={() => setEditing(undefined)}
				/>
			)}
		</>
	)
}
