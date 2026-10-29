import { useState, type Dispatch, type SetStateAction } from 'react'

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
	async function write(path: string, method: string, body?: B): Promise<{ ok?: boolean; error?: string; data?: T }> {
		try {
			const res = await fetch(`${API}/${resource}${path}`, {
				method,
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: body && JSON.stringify(body),
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

	async function submit(body: B): Promise<string | undefined> {
		const id = editing?.id
		const { error, data } = await write(id ? `/${id}` : '', id ? 'PATCH' : 'POST', body)
		if (!data) return error
		setItems((items) => (id ? items.map((x) => (x.id === id ? data : x)) : [...items, data]))
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
