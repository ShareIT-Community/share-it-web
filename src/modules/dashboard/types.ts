export interface Group {
	id: number
	title: string
	order: number
	description: string
	image_url: string | null
	icon: string | null
}

export type GroupBody = Omit<Group, 'id'>
