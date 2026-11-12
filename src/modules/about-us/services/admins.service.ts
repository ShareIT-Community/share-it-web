import { z } from 'zod'
import { admins as legacyAdmins } from 'src/modules/about-us/constants/about-us.const'
import { API_URL } from 'src/modules/community/services/groups.service'

export interface Admin {
	name: string
	about: string
	role: string
	description: string[]
	image_url: string | null
	links: { kind: SocialKey; url: string; label: string }[]
}

type SocialKey = 'linkedin' | 'github' | 'twitter' | 'instagram' | 'website'

const apiAdminsSchema = z.array(z.object({
	name: z.string(),
	about: z.string(),
	role: z.string(),
	description: z.string(),
	image_url: z.string().nullable(),
	links: z.array(z.object({ label: z.string(), url: z.string() })),
}))

const DOMAINS: [RegExp, SocialKey][] = [
	[/(^|\.)linkedin\.com$/, 'linkedin'],
	[/(^|\.)github\.com$/, 'github'],
	[/(^|\.)(x|twitter)\.com$/, 'twitter'],
	[/(^|\.)instagram\.com$/, 'instagram'],
]

/** Picks the icon from the link's domain; anything else is a website. */
export function socialKey(url: string): SocialKey {
	let host = ''
	try {
		host = new URL(url).hostname
	} catch {
		return 'website'
	}
	return DOMAINS.find(([re]) => re.test(host))?.[1] ?? 'website'
}

const fallbackAdmins: Admin[] = legacyAdmins.map((admin) => ({
	name: admin.name,
	about: admin.about,
	role: admin.role,
	description: admin.description ?? [],
	image_url: admin.avatar,
	links: (['linkedin', 'github', 'twitter', 'instagram', 'website'] as const).flatMap((kind) =>
		admin[kind] ? [{ kind, url: admin[kind]!, label: '' }] : [],
	),
}))

/** Admins in their dashboard order, with legacy data if the API is unavailable. */
export async function fetchAdmins(): Promise<Admin[]> {
	try {
		const res = await fetch(`${API_URL}/admins`, { signal: AbortSignal.timeout(3000) })
		if (!res.ok) return fallbackAdmins
		const data = apiAdminsSchema.parse(await res.json())
		return data.map((a) => ({
			name: a.name,
			about: a.about,
			role: a.role,
			description: a.description.split(/\n\n+/),
			image_url: a.image_url,
			links: a.links.map((link) => ({
				kind: socialKey(link.url),
				url: link.url,
				label: link.label,
			})),
		}))
	} catch {
		return fallbackAdmins
	}
}
