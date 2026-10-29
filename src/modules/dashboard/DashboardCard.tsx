import type { ReactNode } from 'react'
import { FiEdit2 } from 'react-icons/fi'

interface Props {
	title: string
	subtitle?: string
	description: string
	/** Image URL; `fallback` is shown when missing. */
	image?: string | null
	fallback: ReactNode
	/** Round image, for people. */
	avatar?: boolean
	meta: string[]
	editLabel: string
	onEdit: () => void
}

/** Shared card for every dashboard section: image, heading, clamped description and a footer with meta + Editar. */
export default function DashboardCard({ title, subtitle, description, image, fallback, avatar, meta, editLabel, onEdit }: Props) {
	return (
		<article className='dashboard-card'>
			<div className='dashboard-card__header'>
				<div className={`dashboard-card__image ${avatar ? 'dashboard-card__image--avatar' : ''}`}>
					{image ? <img src={image} alt='' loading='lazy' /> : fallback}
				</div>
				<div className='dashboard-card__heading'><h2>{title}</h2>{subtitle && <p className='dashboard-card__role'>{subtitle}</p>}</div>
			</div>
			<p className='dashboard-card__description'>{description.replace(/\n\s*\n/g, ' ')}</p>
			<div className='dashboard-card__footer'>
				<div className='dashboard-card__meta'>{meta.map((m, i) => <span key={i}>{m}</span>)}</div>
				<button type='button' onClick={onEdit} aria-label={editLabel} className='dashboard-button dashboard-card__edit'><FiEdit2 aria-hidden='true' />Editar</button>
			</div>
		</article>
	)
}
