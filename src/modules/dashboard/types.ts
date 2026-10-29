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

export interface Group {
	id: number
	title: string
	order: number
	description: string
	image_url: string | null
	icon: string | null
	referents: Referent[]
}

export type GroupBody = Omit<Group, 'id' | 'referents'> & { referent_ids: number[] }

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
