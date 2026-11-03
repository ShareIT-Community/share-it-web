import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FiMove } from 'react-icons/fi'
import GroupCard from './GroupCard'
import type { Group } from './types'

function SortableGroup({ g }: { g: Group }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: g.id })
	const handle = (
		<button type='button' className='dashboard-button dashboard-card__edit dashboard-sortable__handle' aria-label={`Mover ${g.title}`} {...attributes} {...listeners}>
			<FiMove aria-hidden='true' />Mover
		</button>
	)
	return (
		<div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={isDragging ? 'dashboard-sortable--dragging' : undefined}>
			<GroupCard g={g} control={handle} />
		</div>
	)
}

/** Drag-and-drop (or keyboard) reordering of every group; `onChange` receives the new order. */
export default function GroupReorderList({ groups, onChange }: { groups: Group[]; onChange: (groups: Group[]) => void }) {
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
		// The delay keeps one-finger page scrolling working on phones.
		useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	)
	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (!over || active.id === over.id) return
		const from = groups.findIndex((g) => g.id === active.id)
		const to = groups.findIndex((g) => g.id === over.id)
		onChange(arrayMove(groups, from, to))
	}
	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
			<SortableContext items={groups.map((g) => g.id)} strategy={rectSortingStrategy}>
				<div className='dashboard-grid'>{groups.map((g) => <SortableGroup key={g.id} g={g} />)}</div>
			</SortableContext>
		</DndContext>
	)
}
