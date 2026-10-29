import type { EventItem } from './types'

const fmt = new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' })

// Same card look as ReferentCard: type, title, local date range and an edit button.
export default function EventCard({ e, onEdit }: { e: EventItem; onEdit: () => void }) {
	return (
		<div
			onClick={onEdit}
			className='group/card relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-3xl border border-white/5 bg-[#0a0f1d]/60 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,229,255,0.06)]'
		>
			<div className='min-w-0 flex-1'>
				<p className='text-[10px] font-bold uppercase tracking-widest text-gray-500'>
					{e.type === 'meetup' ? 'Comunidad' : 'Taller'}
				</p>
				<h3 className='truncate text-xl font-bold text-white transition-colors group-hover/card:text-[#00e5ff]'>{e.title}</h3>
				<p className='truncate text-sm text-gray-400'>
					{fmt.format(new Date(e.start_at))} → {fmt.format(new Date(e.end_at))}
				</p>
			</div>
			<button
				type='button'
				onClick={onEdit}
				className='cursor-pointer rounded-xl border border-white/20 px-4 py-1.5 text-sm font-semibold text-gray-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff]'
			>
				Editar
			</button>
		</div>
	)
}
