import { FiCalendar } from 'react-icons/fi'
import DashboardCard from './DashboardCard'
import type { EventItem } from './types'

const fmt = new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' })

export default function EventCard({ e, onEdit }: { e: EventItem; onEdit: () => void }) {
	return (
		<DashboardCard
			title={e.title}
			subtitle={e.type === 'meetup' ? 'Comunidad' : 'Taller'}
			description={e.description}
			fallback={<FiCalendar aria-hidden='true' />}
			meta={[`${fmt.format(new Date(e.start_at))} → ${fmt.format(new Date(e.end_at))}`, ...(e.location ? [e.location] : [])]}
			editLabel={`Editar evento ${e.title}`}
			onEdit={onEdit}
		/>
	)
}
