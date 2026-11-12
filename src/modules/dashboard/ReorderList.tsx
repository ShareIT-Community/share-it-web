import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FiChevronDown, FiChevronUp, FiGrid, FiMenu } from 'react-icons/fi'
/** Anything with an id, a visible label and an optional image can be reordered. */
export interface ReorderItem {
	id: number
	label: string
	image_url: string | null
}

interface RowProps {
	g: ReorderItem
	index: number
	count: number
	onMove: (from: number, to: number) => void
}

function SortableRow({ g, index, count, onMove }: RowProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: g.id })
	return (
		<li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`dashboard-reorder-row${isDragging ? ' dashboard-sortable--dragging' : ''}`}>
			<button type='button' className='dashboard-reorder-row__handle' aria-label={`Mover ${g.label}`} {...attributes} {...listeners}>
				<FiMenu aria-hidden='true' />
			</button>
			<div className='dashboard-reorder-row__image'>{g.image_url ? <img src={g.image_url} alt='' loading='lazy' /> : <FiGrid aria-hidden='true' />}</div>
			<span className='dashboard-reorder-row__title'>{g.label}</span>
			<button type='button' className='dashboard-reorder-row__arrow' aria-label={`Subir ${g.label}`} disabled={index === 0} onClick={() => onMove(index, index - 1)}>
				<FiChevronUp aria-hidden='true' />
			</button>
			<button type='button' className='dashboard-reorder-row__arrow' aria-label={`Bajar ${g.label}`} disabled={index === count - 1} onClick={() => onMove(index, index + 1)}>
				<FiChevronDown aria-hidden='true' />
			</button>
		</li>
	)
}

/** Single-column reorder list: drag the handle, or use the up/down arrows; `onChange` receives the new order. */
export default function ReorderList<T extends ReorderItem>({ items, onChange }: { items: T[]; onChange: (items: T[]) => void }) {
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
		// The delay keeps one-finger page scrolling working on phones.
		useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	)
	const move = (from: number, to: number) => onChange(arrayMove(items, from, to))
	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (!over || active.id === over.id) return
		move(items.findIndex((g) => g.id === active.id), items.findIndex((g) => g.id === over.id))
	}
	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
			<SortableContext items={items.map((g) => g.id)} strategy={verticalListSortingStrategy}>
				<ol className='dashboard-reorder-list'>
					{items.map((g, i) => <SortableRow key={g.id} g={g} index={i} count={items.length} onMove={move} />)}
				</ol>
			</SortableContext>
		</DndContext>
	)
}
