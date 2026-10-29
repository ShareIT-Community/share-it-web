import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { FiTrash2, FiX } from 'react-icons/fi'
import ConfirmDialog from './ConfirmDialog'

const iconBtn =
	'flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'

interface Props {
	title: string
	/** Name shown in the delete confirmation. */
	itemName?: string
	children: ReactNode
	/** Return an error message, or undefined on success. */
	onSubmit: (data: FormData) => Promise<string | undefined>
	/** Delete is hidden when missing (create mode). Returns an error message, or undefined on success. */
	onDelete?: () => Promise<string | undefined>
	onClose: () => void
}

/** Shared dialog shell: title + close X, scrollable body, footer with delete icon + Guardar. */
export default function Modal({ title, itemName, children, onSubmit, onDelete, onClose }: Props) {
	const ref = useRef<HTMLDialogElement>(null)
	const [error, setError] = useState('')
	const [busy, setBusy] = useState(false)
	const [confirming, setConfirming] = useState(false)

	useEffect(() => {
		const opener = document.activeElement as HTMLElement | null
		ref.current?.showModal() // moves focus inside; Escape fires `close`
		return () => opener?.focus()
	}, [])

	async function run(action: () => Promise<string | undefined>) {
		setBusy(true)
		setError('')
		const err = await action()
		setBusy(false)
		if (err) setError(err)
	}

	function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const data = new FormData(e.currentTarget)
		run(() => onSubmit(data))
	}

	return (
		<dialog
			ref={ref}
			onClose={onClose}
			onClick={(e) => e.target === ref.current && ref.current?.close()}
			aria-labelledby='modal-title'
			aria-modal='true'
			className='m-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f1d] p-0 text-white backdrop:bg-black/70 open:flex open:max-h-[90dvh] open:flex-col'
		>
			<form onSubmit={submit} className='flex min-h-0 flex-1 flex-col'>
				<div className='flex items-start justify-between gap-3 px-6 pt-5 pb-2'>
					<h2 id='modal-title' className='min-w-0 font-[Josefin_Sans] text-2xl font-bold break-words'>
						{title}
					</h2>
					<button
						type='button'
						aria-label='Cerrar'
						onClick={() => ref.current?.close()}
						className={`${iconBtn} -mr-2 text-gray-300 hover:bg-white/10`}
					>
						<FiX size={22} aria-hidden />
					</button>
				</div>
				<div className='min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-2'>
					{error && (
						<p role='alert' className='rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300'>
							{error}
						</p>
					)}
					{children}
				</div>
				<div className='flex items-center gap-3 border-t border-white/10 px-6 py-4'>
					{onDelete && (
						<button
							type='button'
							aria-label='Borrar'
							disabled={busy}
							onClick={() => setConfirming(true)}
							className={`${iconBtn} border border-red-500/60 text-red-300 hover:bg-red-500/10 disabled:opacity-60`}
						>
							<FiTrash2 size={20} aria-hidden />
						</button>
					)}
					<button
						type='submit'
						disabled={busy}
						className='min-h-10 flex-1 cursor-pointer rounded-xl bg-[#00e5ff] px-5 py-2 font-semibold text-gray-900 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:opacity-60 sm:flex-none'
					>
						{busy ? 'Guardando…' : 'Guardar'}
					</button>
				</div>
			</form>
			{confirming && onDelete && (
				<ConfirmDialog
					title={`¿Borrar «${itemName ?? ''}»?`}
					text='Esta acción es irreversible.'
					onConfirm={() => run(onDelete)}
					onClose={() => setConfirming(false)}
				/>
			)}
		</dialog>
	)
}
