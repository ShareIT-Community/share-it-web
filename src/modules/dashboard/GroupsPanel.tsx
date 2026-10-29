import { useEffect, useState, type FormEvent } from 'react'
import GroupCard from './GroupCard'
import GroupModal from './GroupModal'
import ReferentsPanel from './ReferentsPanel'
import type { Group, GroupBody, Referent } from './types'

const API = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'
const KEY = 'panel_token'

const input =
	'mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00e5ff] focus:ring-2 focus:ring-[#00e5ff]/50'
const label = 'block text-sm font-medium text-gray-300'
const btn =
	'cursor-pointer rounded-xl px-5 py-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'
const card = 'rounded-3xl bg-[#0a0f1d]/60 border border-white/5 backdrop-blur-md p-6'

export default function GroupsPanel() {
	const [token, setToken] = useState<string | null>(null)
	const [groups, setGroups] = useState<Group[]>([])
	const [referents, setReferents] = useState<Referent[]>([])
	const [tab, setTab] = useState<'groups' | 'referents'>('groups')
	const [msg, setMsg] = useState('')
	// undefined = closed, null = creating, Group = editing
	const [editing, setEditing] = useState<Group | null | undefined>(undefined)

	const logout = (m = '') => {
		sessionStorage.removeItem(KEY)
		setToken(null)
		setGroups([])
		setReferents([])
		setEditing(undefined)
		setMsg(m)
	}

	useEffect(() => {
		setToken(sessionStorage.getItem(KEY))
	}, [])

	useEffect(() => {
		if (!token) return
		fetch(`${API}/groups`)
			.then((r) => (r.ok ? r.json() : Promise.reject()))
			.then(setGroups)
			.catch(() => setMsg('No se pudieron cargar los grupos'))
		fetch(`${API}/referents`)
			.then((r) => (r.ok ? r.json() : Promise.reject()))
			.then(setReferents)
			.catch(() => setMsg('No se pudieron cargar los referentes'))
	}, [token])

	async function login(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const f = new FormData(e.currentTarget)
		try {
			// OAuth2 form: `username` carries the email
			const res = await fetch(`${API}/auth/token`, { method: 'POST', body: new URLSearchParams(f as never) })
			if (!res.ok) return setMsg('Credenciales inválidas')
			const { access_token } = await res.json()
			sessionStorage.setItem(KEY, access_token)
			setMsg('')
			setToken(access_token)
		} catch {
			setMsg('No se pudo conectar')
		}
	}

	/** Create (POST) or update (PATCH); returns an error message for the modal, undefined on success. */
	async function submit(body: GroupBody): Promise<string | undefined> {
		const id = editing?.id
		try {
			const res = await fetch(`${API}/groups${id ? `/${id}` : ''}`, {
				method: id ? 'PATCH' : 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: JSON.stringify(body),
			})
			if (res.status === 401) {
				logout('Sesión vencida')
				return
			}
			if (!res.ok) {
				const { detail } = await res.json().catch(() => ({}))
				return typeof detail === 'string' ? detail : `Error al guardar (${res.status})`
			}
			const saved: Group = await res.json()
			setGroups((gs) => (id ? gs.map((x) => (x.id === id ? saved : x)) : [...gs, saved]))
			setMsg(`Guardado: ${saved.title}`)
			setEditing(undefined)
		} catch {
			return 'No se pudo conectar'
		}
	}

	/** DELETE (204); returns an error message for the modal, undefined on success. */
	async function remove(): Promise<string | undefined> {
		const id = editing?.id
		try {
			const res = await fetch(`${API}/groups/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
			if (res.status === 401) {
				logout('Sesión vencida')
				return
			}
			if (!res.ok) {
				const { detail } = await res.json().catch(() => ({}))
				return typeof detail === 'string' ? detail : `Error al borrar (${res.status})`
			}
			setGroups((gs) => gs.filter((x) => x.id !== id))
			setMsg('Guardado: grupo borrado')
			setEditing(undefined)
		} catch {
			return 'No se pudo conectar'
		}
	}

	const ok = msg.startsWith('Guardado')

	return (
		<main className='mx-auto w-full max-w-6xl px-4 py-10'>
			<div className='mb-6 flex items-center justify-between gap-4'>
				<h1 className='font-[Josefin_Sans] text-3xl font-bold text-white'>Panel</h1>
				{token && (
					<button onClick={() => logout()} className={`${btn} border border-white/20 text-gray-200 hover:bg-white/10`}>
						Salir
					</button>
				)}
			</div>
			{msg && (
				<p
					role='status'
					className={`mb-6 rounded-xl border px-4 py-3 text-sm ${ok ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-red-500/40 bg-red-500/10 text-red-300'}`}
				>
					{msg}
				</p>
			)}
			{!token ? (
				<form onSubmit={login} className={`${card} mx-auto max-w-sm space-y-4`}>
					<label className={label}>
						Email
						<input className={input} name='username' type='email' autoComplete='username' required />
					</label>
					<label className={label}>
						Contraseña
						<input className={input} name='password' type='password' autoComplete='current-password' required />
					</label>
					<button type='submit' className={`${btn} w-full bg-[#00e5ff] text-gray-900 hover:brightness-110`}>
						Ingresar
					</button>
				</form>
			) : (
				<>
					<div role='tablist' className='mb-6 inline-flex rounded-xl border border-white/10 p-1'>
						{(['groups', 'referents'] as const).map((t) => (
							<button
								key={t}
								role='tab'
								aria-selected={tab === t}
								onClick={() => setTab(t)}
								className={`${btn} py-1.5 ${tab === t ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
							>
								{t === 'groups' ? 'Grupos' : 'Referentes'}
							</button>
						))}
					</div>
					{tab === 'referents' ? (
						<ReferentsPanel
							token={token}
							referents={referents}
							setReferents={setReferents}
							notify={setMsg}
							onUnauthorized={() => logout('Sesión vencida')}
						/>
					) : (
						<>
							<button
								onClick={() => setEditing(null)}
								className={`${btn} mb-6 bg-[#00e5ff] text-gray-900 hover:brightness-110`}
							>
								+ Agregar grupo
							</button>
							<div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
								{[...groups]
									.sort((a, b) => a.order - b.order)
									.map((g) => (
										<GroupCard key={g.id} g={g} onEdit={() => setEditing(g)} />
									))}
							</div>
						</>
					)}
				</>
			)}
			{editing !== undefined && (
				<GroupModal
					key={editing?.id ?? 'new'}
					group={editing}
					referents={referents}
					defaultOrder={Math.max(0, ...groups.map((g) => g.order)) + 1}
					onSubmit={submit}
					onDelete={remove}
					onClose={() => setEditing(undefined)}
				/>
			)}
		</main>
	)
}
