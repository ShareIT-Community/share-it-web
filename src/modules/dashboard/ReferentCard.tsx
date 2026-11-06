import DashboardCard from './DashboardCard'
import type { Referent } from './types'

export default function ReferentCard({ r, onEdit }: { r: Referent; onEdit: () => void }) {
	const initials = r.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('')
	return (
		<DashboardCard
			title={r.name}
			subtitle={r.role}
			description={r.description}
			image={r.image_url}
			fallback={<span aria-hidden='true'>{initials}</span>}
			avatar
			meta={[`${r.links.length} ${r.links.length === 1 ? 'enlace' : 'enlaces'}`]}
			editLabel={`Editar referente ${r.name}`}
			onEdit={onEdit}
		/>
	)
}
