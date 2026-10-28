import { whatsappGroupIcons } from 'src/modules/community/constants/whatsappGroupIcons'
import type { Group } from './types'

// Same look as community/components/DiscordGroupCard.astro, plus order, icon and an edit button.
export default function GroupCard({ g, onEdit }: { g: Group; onEdit: () => void }) {
	const icon = whatsappGroupIcons[g.icon as keyof typeof whatsappGroupIcons]
	return (
		<div
			onClick={onEdit}
			className='group/card relative flex h-full cursor-pointer flex-col gap-6 overflow-hidden rounded-3xl border border-white/5 bg-[#0a0f1d]/60 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,229,255,0.06)]'
		>
			<div className='absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#00e5ff]/5 blur-2xl transition-colors group-hover/card:bg-[#00e5ff]/10' />
			<div className='relative z-10 flex items-center gap-4'>
				{g.image_url && (
					<div className='h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 group-hover/card:scale-105 group-hover/card:border-[#00e5ff]/50'>
						<img src={g.image_url} alt={g.title} className='h-full w-full object-cover' />
					</div>
				)}
				<div className='min-w-0 flex-1'>
					<h3 className='px-1 text-2xl font-bold leading-tight text-white transition-colors group-hover/card:text-[#00e5ff]'>
						{g.title}
					</h3>
					<div className='mt-1 flex items-center gap-2 px-1 text-[10px] font-bold uppercase tracking-widest text-gray-500'>
						<span className='h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' />
						<span>Orden {g.order}</span>
					</div>
				</div>
				{icon && (
					<span
						className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 [&_svg]:h-5 [&_svg]:w-5'
						dangerouslySetInnerHTML={{ __html: icon }}
					/>
				)}
			</div>
			<div className='flex flex-grow flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-6 leading-relaxed text-gray-300'>
				{g.description.split(/\n\n+/).map((p, i) => (
					<p key={i} className='italic [text-wrap:pretty]'>
						{p}
					</p>
				))}
			</div>
			<button
				type='button'
				onClick={onEdit}
				className='relative z-10 cursor-pointer self-start rounded-xl border border-white/20 px-4 py-1.5 text-sm font-semibold text-gray-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff]'
			>
				Editar
			</button>
		</div>
	)
}
