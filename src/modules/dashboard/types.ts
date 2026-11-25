export interface Link {
	label: string
	url: string
}

export interface Referent {
	id: number
	name: string
	role: string
	description: string
	image_url: string | null
	links: Link[]
}

export type ReferentBody = Omit<Referent, 'id'>

export interface Admin {
	id: number
	name: string
	about: string
	role: string
	order: number
	description: string
	image_url: string | null
	links: Link[]
}

export type AdminBody = Omit<Admin, 'id' | 'order'>

export interface Group {
	id: number
	title: string
	order: number
	description: string
	image_url: string | null
	icon: string | null
	referents: Referent[]
}

export type GroupBody = Omit<Group, 'id' | 'referents' | 'order'> & { referent_ids: number[] }

export interface EventItem {
	id: number
	title: string
	description: string
	type: 'meetup' | 'workshop'
	start_at: string
	end_at: string
	location: string | null
	speaker: string | null
	site: string | null
	media: string | null
	repository: string | null
}

export type EventBody = Omit<EventItem, 'id'>

export interface Tag {
	id: number
	name: string
	slug: string
}

export interface Resource {
	id: number
	title: string
	description: string
	url: string
	created_at: string
	tags: Tag[]
}

/** `tags` are free-text names: the API reuses a matching tag or creates it. */
export type ResourceBody = Pick<Resource, 'title' | 'description' | 'url'> & { tags: string[] }
