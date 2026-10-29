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
