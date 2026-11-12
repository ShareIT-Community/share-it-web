import DashboardCard from './DashboardCard'
import type { Admin } from './types'

export default function AdminCard({ a, onEdit }: { a: Admin; onEdit: () => void }) {
	const initials = a.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('')
	return (
		<DashboardCard
			title={a.name}
			subtitle={`${a.role} · ${a.about}`}
			description={a.description}
			image={a.image_url}
			fallback={<span aria-hidden='true'>{initials}</span>}
			avatar
			meta={[`${a.links.length} ${a.links.length === 1 ? 'enlace' : 'enlaces'}`]}
			editLabel={`Editar admin ${a.name}`}
			onEdit={onEdit}
		/>
	)
}
