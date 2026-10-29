import { useState } from 'react'
import ReferentCard from './ReferentCard'
import ReferentModal from './ReferentModal'
import { DashboardHeading, DashboardState, DashboardToolbar, type DashboardLoadState } from './DashboardShell'
import { normalizeSearch } from './search'
import { useCrud } from './useCrud'
import type { Referent, ReferentBody } from './types'

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
	const { editing, setEditing, submit, remove } = useCrud<Referent, ReferentBody>({
		resource: 'referents',
		token,
		setItems: setReferents,
		notify,
		onUnauthorized,
		itemName: (r) => r.name,
		deletedMessage: 'referente borrado',
	})
	const [query, setQuery] = useState('')

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
