import { useState } from 'react'
import EventCard from './EventCard'
import EventModal from './EventModal'
import { DashboardHeading, DashboardState, DashboardToolbar, type DashboardLoadState } from './DashboardShell'
import { normalizeSearch } from './search'
import { useCrud } from './useCrud'
import type { EventBody, EventItem } from './types'

interface Props {
	token: string
	events: EventItem[]
	setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>
	notify: (msg: string) => void
	onUnauthorized: () => void
	loadState: DashboardLoadState
	onRetry: () => void
}

export default function EventsPanel({ token, events, setEvents, notify, onUnauthorized, loadState, onRetry }: Props) {
	const { editing, setEditing, submit, remove } = useCrud<EventItem, EventBody>({
		resource: 'events',
		token,
		setItems: setEvents,
		notify,
		onUnauthorized,
		itemName: (e) => e.title,
		deletedMessage: 'evento borrado',
	})
	const [query, setQuery] = useState('')

	const search = normalizeSearch(query)
	// Newest first
	const visibleEvents = events
		.filter((e) => normalizeSearch(`${e.title} ${e.speaker ?? ''} ${e.location ?? ''}`).includes(search))
		.sort((a, b) => b.start_at.localeCompare(a.start_at))

	return (
		<>
			<DashboardHeading title='Eventos' description='Administra los meetups y talleres de la comunidad.' action='Agregar evento' onAdd={() => setEditing(null)} />
			<DashboardToolbar query={query} onQueryChange={setQuery} placeholder='Buscar por título, orador o lugar…' resultLabel={loadState === 'ready' ? `${search ? `${visibleEvents.length} de ` : ''}${events.length} ${events.length === 1 ? 'evento' : 'eventos'}` : ''} />
			{loadState === 'loading' ? <DashboardState title='Cargando eventos…' loading />
				: loadState === 'error' ? <DashboardState title='No se pudieron cargar los eventos' description='Comprueba la conexión e inténtalo de nuevo.' onRetry={onRetry} />
				: events.length === 0 ? <DashboardState title='Aún no hay eventos' description='Agrega el primer meetup o taller de la comunidad.' />
				: visibleEvents.length === 0 ? <DashboardState title='No se encontraron eventos' description='Prueba con otro título, orador o lugar.' />
				: <div className='dashboard-grid'>{visibleEvents.map((e) => <EventCard key={e.id} e={e} onEdit={() => setEditing(e)} />)}</div>
			}
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
