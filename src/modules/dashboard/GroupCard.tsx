import { FiEdit2, FiGrid } from 'react-icons/fi'
import type { Group } from './types'

export default function GroupCard({ g, onEdit }: { g: Group; onEdit: () => void }) {
	return (
		<article className='dashboard-card'>
			<div className='dashboard-card__header'>
				<div className='dashboard-card__image'>
					{g.image_url ? <img src={g.image_url} alt='' loading='lazy' /> : <FiGrid aria-hidden='true' />}
				</div>
				<div className='dashboard-card__heading'><h2>{g.title}</h2></div>
			</div>
			<p className='dashboard-card__description'>{g.description.replace(/\n\s*\n/g, ' ')}</p>
			<div className='dashboard-card__footer'>
				<div className='dashboard-card__meta'><span>Orden {g.order}</span><span>{g.referents.length} {g.referents.length === 1 ? 'referente' : 'referentes'}</span></div>
				<button type='button' onClick={onEdit} aria-label={`Editar grupo ${g.title}`} className='dashboard-button dashboard-card__edit'><FiEdit2 aria-hidden='true' />Editar</button>
			</div>
		</article>
	)
}
