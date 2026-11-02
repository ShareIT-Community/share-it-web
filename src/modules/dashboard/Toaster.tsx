import { useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/** Success toast: polite live region (role=status). */
export const notifyOk = (msg: string) => toast.success(msg, { role: 'status', autoClose: 4000 })
/** Error toast: assertive live region (role=alert), stays a bit longer. */
export const notifyError = (msg: string) => toast.error(msg, { role: 'alert', autoClose: 6000 })

/**
 * Rendered once in the dashboard root. It lives in a manual popover (top layer) and is re-shown
 * on every new toast so it stays above an open `<dialog>` modal.
 * shortcut: toast close buttons are inert while a modal is open (auto-dismiss still works).
 */
export default function Toaster() {
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const show = () => {
			const el = ref.current
			if (!el?.showPopover) return
			if (el.matches(':popover-open')) el.hidePopover()
			el.showPopover()
		}
		show()
		return toast.onChange((item) => { if (item.status === 'added') show() })
	}, [])
	return (
		<div ref={ref} popover='manual' className='dashboard-toaster'>
			<ToastContainer
				position='bottom-right'
				theme='dark'
				newestOnTop
				className='dashboard-toast-container'
				toastClassName='dashboard-toast'
				closeButton={({ closeToast }) => (
					<button type='button' className='dashboard-toast-close' aria-label='Cerrar notificación' onClick={closeToast}>×</button>
				)}
			/>
		</div>
	)
}
