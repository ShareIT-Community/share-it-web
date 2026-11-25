import { useState } from 'react'
import ResourceCard from './ResourceCard'
import ResourceModal from './ResourceModal'
import { DashboardHeading, DashboardState, DashboardToolbar, type DashboardLoadState } from './DashboardShell'
import { normalizeSearch } from './search'
import { useCrud } from './useCrud'
import type { Resource, ResourceBody, Tag } from './types'

interface Props {
	token: string
	resources: Resource[]
	setResources: React.Dispatch<React.SetStateAction<Resource[]>>
	/** Tags loaded from the API; tags created while saving come back inside each resource. */
	tags: Tag[]
	onUnauthorized: () => void
	loadState: DashboardLoadState
	onRetry: () => void
}

export default function ResourcesPanel({ token, resources, setResources, tags, onUnauthorized, loadState, onRetry }: Props) {
	const { editing, setEditing, submit, remove } = useCrud<Resource, ResourceBody>({
		resource: 'resources',
		token,
		setItems: setResources,
		onUnauthorized,
		noun: 'Recurso',
	})
	const [query, setQuery] = useState('')

	const tagNames = [...new Set([...tags, ...resources.flatMap((r) => r.tags)].map((t) => t.name))].sort((a, b) => a.localeCompare(b, 'es'))
	const search = normalizeSearch(query)
	// Newest first
	const visible = resources
		.filter((r) => normalizeSearch(`${r.title} ${r.description} ${r.tags.map((t) => t.name).join(' ')}`).includes(search))
		.sort((a, b) => b.created_at.localeCompare(a.created_at))

	return (
		<>
			<DashboardHeading title='Recursos' description='Administra los recursos que la comunidad comparte en la web.' action='Agregar recurso' onAdd={() => setEditing(null)} />
			<DashboardToolbar query={query} onQueryChange={setQuery} placeholder='Buscar por título, descripción o tag…' resultLabel={loadState === 'ready' ? `${search ? `${visible.length} de ` : ''}${resources.length} ${resources.length === 1 ? 'recurso' : 'recursos'}` : ''} />
			{loadState === 'loading' ? <DashboardState title='Cargando recursos…' loading />
				: loadState === 'error' ? <DashboardState title='No se pudieron cargar los recursos' description='Comprueba la conexión e inténtalo de nuevo.' onRetry={onRetry} />
				: resources.length === 0 ? <DashboardState title='Aún no hay recursos' description='Agrega el primer recurso de la comunidad.' />
				: visible.length === 0 ? <DashboardState title='No se encontraron recursos' description='Prueba con otro título o tag.' />
				: <div className='dashboard-grid'>{visible.map((r) => <ResourceCard key={r.id} r={r} onEdit={() => setEditing(r)} />)}</div>
			}
			{editing !== undefined && (
				<ResourceModal
					key={editing?.id ?? 'new'}
					resource={editing}
					tagNames={tagNames}
					onSubmit={(body) => submit(body)}
					onDelete={remove}
					onClose={() => setEditing(undefined)}
				/>
			)}
		</>
	)
}
