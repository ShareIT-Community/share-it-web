import { useRef, type MouseEvent, type RefObject } from 'react'

/** True only when the pointer is on the ::backdrop, not on the dialog's own box (padding/border included). */
function onBackdrop(e: MouseEvent<HTMLDialogElement>) {
	if (e.target !== e.currentTarget) return false
	const r = e.currentTarget.getBoundingClientRect()
	return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom
}

/**
 * Close a modal <dialog> on backdrop click. The press must also start on the backdrop:
 * dragging a text selection out of an input ends with a click targeted at the dialog itself.
 */
export function useBackdropClose(ref: RefObject<HTMLDialogElement | null>) {
	const pressed = useRef(false)
	return {
		onMouseDown: (e: MouseEvent<HTMLDialogElement>) => { pressed.current = onBackdrop(e) },
		onClick: (e: MouseEvent<HTMLDialogElement>) => {
			if (pressed.current && onBackdrop(e)) ref.current?.close()
			pressed.current = false
		},
	}
}
