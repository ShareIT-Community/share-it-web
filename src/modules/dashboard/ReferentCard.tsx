import { FiEdit2 } from 'react-icons/fi'
import type { Referent } from './types'

export default function ReferentCard({ r, onEdit }: { r: Referent; onEdit: () => void }) {
	return (
		<article className='dashboard-card'>
			<div className='dashboard-card__header'>
				<div className='dashboard-card__image dashboard-card__image--avatar'>
					{r.image_url ? <img src={r.image_url} alt='' loading='lazy' /> : <span aria-hidden='true'>{r.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('')}</span>}
				</div>
				<div className='dashboard-card__heading'><h2>{r.name}</h2><p className='dashboard-card__role'>{r.role}</p></div>
			</div>
			<p className='dashboard-card__description'>{r.description.replace(/\n\s*\n/g, ' ')}</p>
			<div className='dashboard-card__footer'>
				<span className='dashboard-card__meta'>{r.links.length} {r.links.length === 1 ? 'enlace' : 'enlaces'}</span>
				<button type='button' onClick={onEdit} aria-label={`Editar referente ${r.name}`} className='dashboard-button dashboard-card__edit'><FiEdit2 aria-hidden='true' />Editar</button>
			</div>
		</article>
	)
}
