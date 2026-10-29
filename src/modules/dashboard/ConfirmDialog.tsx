import { useEffect, useRef } from 'react'

interface Props {
	title: string
	text: string
	confirmLabel?: string
	onConfirm: () => void
	/** Fires whenever the dialog closes (cancel, Escape, backdrop or after confirming). */
	onClose: () => void
}

const btn =
	'cursor-pointer rounded-xl px-5 py-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'

/** Small native alert dialog; mount it to open it. Cancel has the default focus. */
export default function ConfirmDialog({ title, text, confirmLabel = 'Borrar', onConfirm, onClose }: Props) {
	const ref = useRef<HTMLDialogElement>(null)
	useEffect(() => {
		ref.current?.showModal()
	}, [])
	return (
		<dialog
			ref={ref}
			role='alertdialog'
			aria-labelledby='confirm-title'
			aria-describedby='confirm-text'
			onClose={onClose}
			onClick={(e) => e.target === ref.current && ref.current?.close()}
			className='m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-white/10 bg-[#0a0f1d] p-6 text-white backdrop:bg-black/70'
		>
			<h2 id='confirm-title' className='font-[Josefin_Sans] text-xl font-bold break-words'>
				{title}
			</h2>
			<p id='confirm-text' className='mt-2 text-sm text-gray-300'>
				{text}
			</p>
			<div className='mt-6 flex justify-end gap-3'>
				<button
					type='button'
					autoFocus
					onClick={() => ref.current?.close()}
					className={`${btn} border border-white/20 text-gray-200 hover:bg-white/10`}
				>
					Cancelar
				</button>
				<button
					type='button'
					onClick={() => {
						ref.current?.close()
						onConfirm()
					}}
					className={`${btn} bg-red-600 text-white hover:bg-red-500`}
				>
					{confirmLabel}
				</button>
			</div>
		</dialog>
	)
}
