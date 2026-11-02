import { useState, type Dispatch, type SetStateAction } from 'react'
import type { ImageChange } from './image'

export const API = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'


const detailText = (detail: unknown, fallback: string) =>
	typeof detail === 'string'
		? detail
		: Array.isArray(detail) && detail.length
			? detail.map((d) => d.msg).join('. ')
			: fallback

interface Options<T> {
	/** API collection path, e.g. `groups`. */
	resource: string
	token: string | null
	setItems: Dispatch<SetStateAction<T[]>>
	notify: (msg: string) => void
	onUnauthorized: () => void
	/** Name shown in the "Guardado: …" notice. */
	itemName: (item: T) => string
	deletedMessage: string
}

/** Create/update/delete for one collection plus the modal's editing state. */
export function useCrud<T extends { id: number }, B>({ resource, token, setItems, notify, onUnauthorized, itemName, deletedMessage }: Options<T>) {
	const [editing, setEditing] = useState<T | null | undefined>(undefined)

	/** Shared fetch for writes; returns an error message for the modal, undefined on success. */
	async function write(path: string, method: string, body?: B | FormData): Promise<{ ok?: boolean; error?: string; data?: T }> {
		try {
			const res = await fetch(`${API}/${resource}${path}`, {
				method,
				// FormData: the browser sets the multipart Content-Type (with boundary) itself.
				headers: { ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), Authorization: `Bearer ${token}` },
				body: body instanceof FormData ? body : body && JSON.stringify(body),
			})
			if (res.status === 401) {
				onUnauthorized()
				return {}
			}
			if (!res.ok) {
				const { detail } = await res.json().catch(() => ({}))
				return { error: detailText(detail, `Error al ${method === 'DELETE' ? 'borrar' : 'guardar'} (${res.status})`) }
			}
			return { ok: true, data: res.status === 204 ? undefined : await res.json() }
		} catch {
			return { error: 'No se pudo conectar' }
		}
	}

	/** PATCH/POST the fields, then PUT or DELETE the image. Returns an error message, undefined on success. */
	async function submit(body: B, image: ImageChange = {}): Promise<string | undefined> {
		const id = editing?.id
		const saved = await write(id ? `/${id}` : '', id ? 'PATCH' : 'POST', body)
		if (!saved.data) return saved.error
		let data = saved.data
		let imageError: string | undefined
		const imagePath = `/${data.id}/image`
		if (image.file) {
			const form = new FormData()
			form.append('file', image.file)
			const res = await write(imagePath, 'PUT', form)
			res.data ? (data = res.data) : (imageError = res.error ?? 'Sesión vencida')
		} else if (image.remove && id) {
			const res = await write(imagePath, 'DELETE')
			res.data ? (data = res.data) : (imageError = res.error ?? 'Sesión vencida')
		}
		setItems((items) => (items.some((x) => x.id === data.id) ? items.map((x) => (x.id === data.id ? data : x)) : [...items, data]))
		if (imageError) {
			setEditing(data) // fields are saved; a retry must PATCH, not create a duplicate
			return `Se guardaron los datos, pero la imagen falló: ${imageError}`
		}
		notify(`Guardado: ${itemName(data)}`)
		setEditing(undefined)
	}

	async function remove(): Promise<string | undefined> {
		const id = editing?.id
		const { ok, error } = await write(`/${id}`, 'DELETE')
		if (!ok) return error
		setItems((items) => items.filter((x) => x.id !== id))
		notify(`Guardado: ${deletedMessage}`)
		setEditing(undefined)
	}

	return { editing, setEditing, submit, remove }
}
