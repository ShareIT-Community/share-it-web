import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FiChevronDown, FiChevronUp, FiGrid, FiMenu } from 'react-icons/fi'
import type { Group } from './types'

interface RowProps {
	g: Group
	index: number
	count: number
	onMove: (from: number, to: number) => void
}

function SortableRow({ g, index, count, onMove }: RowProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: g.id })
	return (
		<li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`dashboard-reorder-row${isDragging ? ' dashboard-sortable--dragging' : ''}`}>
			<button type='button' className='dashboard-reorder-row__handle' aria-label={`Mover ${g.title}`} {...attributes} {...listeners}>
				<FiMenu aria-hidden='true' />
			</button>
			<div className='dashboard-reorder-row__image'>{g.image_url ? <img src={g.image_url} alt='' loading='lazy' /> : <FiGrid aria-hidden='true' />}</div>
			<span className='dashboard-reorder-row__title'>{g.title}</span>
			<button type='button' className='dashboard-reorder-row__arrow' aria-label={`Subir ${g.title}`} disabled={index === 0} onClick={() => onMove(index, index - 1)}>
				<FiChevronUp aria-hidden='true' />
			</button>
			<button type='button' className='dashboard-reorder-row__arrow' aria-label={`Bajar ${g.title}`} disabled={index === count - 1} onClick={() => onMove(index, index + 1)}>
				<FiChevronDown aria-hidden='true' />
			</button>
		</li>
	)
}

/** Single-column reorder list: drag the handle, or use the up/down arrows; `onChange` receives the new order. */
export default function GroupReorderList({ groups, onChange }: { groups: Group[]; onChange: (groups: Group[]) => void }) {
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
		// The delay keeps one-finger page scrolling working on phones.
		useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	)
	const move = (from: number, to: number) => onChange(arrayMove(groups, from, to))
	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (!over || active.id === over.id) return
		move(groups.findIndex((g) => g.id === active.id), groups.findIndex((g) => g.id === over.id))
	}
	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
			<SortableContext items={groups.map((g) => g.id)} strategy={verticalListSortingStrategy}>
				<ol className='dashboard-reorder-list'>
					{groups.map((g, i) => <SortableRow key={g.id} g={g} index={i} count={groups.length} onMove={move} />)}
				</ol>
			</SortableContext>
		</DndContext>
	)
}
