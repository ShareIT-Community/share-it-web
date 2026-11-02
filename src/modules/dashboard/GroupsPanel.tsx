import { useEffect, useState, type FormEvent } from 'react'
import GroupCard from './GroupCard'
import GroupModal from './GroupModal'
import ReferentsPanel from './ReferentsPanel'
import LoginPanel from './LoginPanel'
import Toaster, { notifyError } from './Toaster'
import DashboardShell, { DashboardHeading, DashboardState, DashboardToolbar, type DashboardLoadState, type DashboardSection } from './DashboardShell'
import { normalizeSearch } from './search'
import EventsPanel from './EventsPanel'
import { API, useCrud } from './useCrud'
import type { EventItem, Group, GroupBody, Referent } from './types'

const KEY = 'panel_token'

export default function GroupsPanel() {
	const [token, setToken] = useState<string | null>(null)
	const [groups, setGroups] = useState<Group[]>([])
	const [referents, setReferents] = useState<Referent[]>([])
	const [tab, setTab] = useState<DashboardSection>('groups')
	const [query, setQuery] = useState('')
	const [groupsState, setGroupsState] = useState<DashboardLoadState>('loading')
	const [referentsState, setReferentsState] = useState<DashboardLoadState>('loading')
	const [eventsState, setEventsState] = useState<DashboardLoadState>('loading')
	const [reload, setReload] = useState(0)
	const [events, setEvents] = useState<EventItem[]>([])
	const { editing, setEditing, submit, remove } = useCrud<Group, GroupBody>({
		resource: 'groups',
		token,
		setItems: setGroups,
		onUnauthorized: () => logout('Sesión vencida'),
		noun: 'Grupo',
	})

	const logout = (m = '') => {
		if (m) notifyError(m)
		sessionStorage.removeItem(KEY)
		setToken(null)
		setGroups([])
		setReferents([])
		setQuery('')
		setTab('groups')
		setEvents([])
		setEditing(undefined)
	}

	useEffect(() => {
		setToken(sessionStorage.getItem(KEY))
	}, [])

	useEffect(() => {
		if (!token) return
		let active = true
		setGroupsState('loading')
		setReferentsState('loading')
		setEventsState('loading')
		fetch(`${API}/groups`)
			.then((r) => (r.ok ? r.json() : Promise.reject()))
			.then((data: Group[]) => {
				if (!active) return
				setGroups(data)
				setGroupsState('ready')
			})
			.catch(() => { if (active) { setGroupsState('error'); notifyError('No se pudieron cargar los grupos') } })
		fetch(`${API}/referents`)
			.then((r) => (r.ok ? r.json() : Promise.reject()))
			.then((data: Referent[]) => {
				if (!active) return
				setReferents(data)
				setReferentsState('ready')
			})
			.catch(() => { if (active) { setReferentsState('error'); notifyError('No se pudieron cargar los referentes') } })
		fetch(`${API}/events`)
			.then((r) => (r.ok ? r.json() : Promise.reject()))
			.then((data: EventItem[]) => {
				if (!active) return
				setEvents(data)
				setEventsState('ready')
			})
			.catch(() => { if (active) { setEventsState('error'); notifyError('No se pudieron cargar los eventos') } })
		return () => { active = false }
	}, [token, reload])

	async function login(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const f = new FormData(e.currentTarget)
		try {
			// OAuth2 form: `username` carries the email
			const res = await fetch(`${API}/auth/token`, { method: 'POST', body: new URLSearchParams(f as never) })
			if (!res.ok) { notifyError('Credenciales inválidas'); return }
			const { access_token } = await res.json()
			sessionStorage.setItem(KEY, access_token)
			setToken(access_token)
		} catch {
			notifyError('No se pudo conectar')
		}
	}

	if (!token) return <><LoginPanel onSubmit={login} /><Toaster /></>

	const search = normalizeSearch(query)
	const visibleGroups = groups.filter((g) => normalizeSearch(`${g.title} ${g.description}`).includes(search)).sort((a, b) => a.order - b.order)
	const retry = () => setReload((value) => value + 1)

	return (
		<DashboardShell section={tab} onSectionChange={(section) => { setTab(section); setQuery('') }} onLogout={() => logout()} groupCount={groupsState === 'ready' ? groups.length : undefined} referentCount={referentsState === 'ready' ? referents.length : undefined} eventCount={eventsState === 'ready' ? events.length : undefined}>
			{tab === 'events' ? (
				<EventsPanel token={token} events={events} setEvents={setEvents} onUnauthorized={() => logout('Sesión vencida')} loadState={eventsState} onRetry={retry} />
			) : tab === 'referents' ? (
				<ReferentsPanel token={token} referents={referents} setReferents={setReferents} onUnauthorized={() => logout('Sesión vencida')} loadState={referentsState} onRetry={retry} />
			) : (
				<>
					<DashboardHeading title='Grupos' description='Administra los espacios de la comunidad.' action='Agregar grupo' onAdd={() => setEditing(null)} />
					<DashboardToolbar query={query} onQueryChange={setQuery} placeholder='Buscar grupos…' resultLabel={groupsState === 'ready' ? `${search ? `${visibleGroups.length} de ` : ''}${groups.length} ${groups.length === 1 ? 'grupo' : 'grupos'}` : ''} />
					{groupsState === 'loading' ? <DashboardState title='Cargando grupos…' loading />
						: groupsState === 'error' ? <DashboardState title='No se pudieron cargar los grupos' description='Comprueba la conexión e inténtalo de nuevo.' onRetry={retry} />
						: groups.length === 0 ? <DashboardState title='Aún no hay grupos' description='Agrega el primer grupo de la comunidad para comenzar.' />
						: visibleGroups.length === 0 ? <DashboardState title='No se encontraron grupos' description='Prueba con otro nombre o una palabra de la descripción.' />
						: <div className='dashboard-grid'>{visibleGroups.map((g) => <GroupCard key={g.id} g={g} onEdit={() => setEditing(g)} />)}</div>
					}
				</>
			)}
			{editing !== undefined && (
				<GroupModal
					key={editing?.id ?? 'new'}
					group={editing}
					referents={referents}
					defaultOrder={Math.max(0, ...groups.map((g) => g.order)) + 1}
					onSubmit={submit}
					onDelete={remove}
					onClose={() => setEditing(undefined)}
				/>
			)}
			<Toaster />
		</DashboardShell>
	)
}
