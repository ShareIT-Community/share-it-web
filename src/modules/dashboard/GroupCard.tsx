import { FiGrid } from 'react-icons/fi'
import DashboardCard from './DashboardCard'
import type { Group } from './types'

export default function GroupCard({ g, onEdit }: { g: Group; onEdit: () => void }) {
	return (
		<DashboardCard
			title={g.title}
			description={g.description}
			image={g.image_url}
			fallback={<FiGrid aria-hidden='true' />}
			meta={[`Orden ${g.order}`, `${g.referents.length} ${g.referents.length === 1 ? 'referente' : 'referentes'}`]}
			editLabel={`Editar grupo ${g.title}`}
			onEdit={onEdit}
		/>
	)
}
