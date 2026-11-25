import { getCollection } from 'astro:content'
import { getTagNamesByEntries } from '@helpers/tag.helper'
import { API_URL } from 'src/modules/community/services/groups.service'

export interface PublicResource {
	title: string
	description: string
	url: string
	date: Date
	tags: string[]
}

interface ApiResource {
	title: string
	description: string
	url: string
	created_at: string
	tags: { name: string }[]
}

// The API may return naive UTC datetimes; without an offset `new Date()` would read them as local time.
const utc = (iso: string) => (/(Z|[+-]\d\d:\d\d)$/.test(iso) ? iso : `${iso}Z`)

/** The YAML collection, used only when the API fails; admins curate resources in the dashboard. */
async function yamlResources(): Promise<PublicResource[]> {
	const entries = await getCollection('resources')
	const tagNames = await getTagNamesByEntries(entries)
	return entries.map((e) => ({ ...e.data, tags: tagNames.get(e.id) ?? [] }))
}

/** Newest first. An empty API list is real (the admin removed them all), so only errors fall back. */
export async function fetchResources(): Promise<PublicResource[]> {
	let resources: PublicResource[]
	try {
		// shortcut: one page of 100 (the API max); paginate when the community passes 100 resources.
		const res = await fetch(`${API_URL}/resources?per_page=100`, {
			signal: AbortSignal.timeout(3000),
		})
		if (!res.ok) throw new Error(String(res.status))
		const { items } = (await res.json()) as { items: ApiResource[] }
		resources = items.map((r) => ({
			title: r.title,
			description: r.description,
			url: r.url,
			date: new Date(utc(r.created_at)),
			tags: r.tags.map((t) => t.name),
		}))
	} catch {
		resources = await yamlResources()
	}
	return resources.sort((a, b) => b.date.getTime() - a.date.getTime())
}
