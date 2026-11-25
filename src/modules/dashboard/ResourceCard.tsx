import { FiBookOpen } from 'react-icons/fi'
import DashboardCard from './DashboardCard'
import type { Resource } from './types'

const host = (url: string) => {
	try {
		return new URL(url).hostname
	} catch {
		return url
	}
}

export default function ResourceCard({ r, onEdit }: { r: Resource; onEdit: () => void }) {
	return (
		<DashboardCard
			title={r.title}
			subtitle={host(r.url)}
			description={r.description}
			fallback={<FiBookOpen aria-hidden='true' />}
			meta={[r.tags.length ? r.tags.map((t) => t.name).join(' · ') : 'Sin tags']}
			editLabel={`Editar recurso ${r.title}`}
			onEdit={onEdit}
		/>
	)
}
