import { whatsappGroupIcons } from 'src/modules/community/constants/whatsappGroupIcons'
import type { GroupReferent } from 'src/modules/community/interfaces/group-referent.interface'
import {
	whatsappGroups,
	type WhatsappGroup,
} from 'src/modules/global/constants/channels.const'

export const API_URL: string =
	import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'

interface ApiReferent {
	id: number
	name: string
	role: string
	description: string
	image_url: string | null
	links: { label: string; url: string }[]
}

const toReferent = (r: ApiReferent): GroupReferent => ({
	id: String(r.id),
	nombre: r.name,
	rol: r.role,
	descripcion: r.description.split(/\n\n+/),
	image: r.image_url ?? '',
	redes: r.links,
})

interface ApiGroup {
	title: string
	order: number
	description: string
	image_url: string | null
	color: string | null
	icon: string | null
	referents: ApiReferent[]
}

/** Groups from the API mapped to the local shape; falls back to constants on any failure. */
export async function fetchGroups(): Promise<WhatsappGroup[]> {
	try {
		const res = await fetch(`${API_URL}/groups`, {
			signal: AbortSignal.timeout(3000),
		})
		if (!res.ok) return whatsappGroups
		const data = (await res.json()) as ApiGroup[]
		if (data.length === 0) return whatsappGroups
		return data.map((g) => ({
			title: g.title,
			order: g.order,
			description: g.description.split(/\n\n+/),
			icon:
				whatsappGroupIcons[g.icon as keyof typeof whatsappGroupIcons] ??
				whatsappGroupIcons.data,
			image: g.image_url ?? '',
			color: g.color ?? undefined,
			referents: g.referents.map(toReferent),
		}))
	} catch {
		return whatsappGroups
	}
}
