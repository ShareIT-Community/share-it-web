import type { Referent } from './types'

// Same card look as GroupCard: photo, name, role and an edit button.
export default function ReferentCard({ r, onEdit }: { r: Referent; onEdit: () => void }) {
	return (
		<div
			onClick={onEdit}
			className='group/card relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-3xl border border-white/5 bg-[#0a0f1d]/60 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,229,255,0.06)]'
		>
			<div className='h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover/card:border-[#00e5ff]/50'>
				{r.image_url && <img src={r.image_url} alt={r.name} className='h-full w-full object-cover' />}
			</div>
			<div className='min-w-0 flex-1'>
				<h3 className='truncate text-xl font-bold text-white transition-colors group-hover/card:text-[#00e5ff]'>{r.name}</h3>
				<p className='truncate text-sm text-gray-400'>{r.role}</p>
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
