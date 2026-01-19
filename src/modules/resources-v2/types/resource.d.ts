export type ResourceStatus = 'Free' | 'Open Source' | 'Paid'
export type ResourceLabel = 'new' | 'popular' | 'trending' | null

export interface Contributor {
  name: string
  avatar: string
}

export interface Resource {
  id: string
  title: string
  description: string
  thumbnail: string
  icon?: string
  status: ResourceStatus
  label: ResourceLabel
  tags: string[]
  url: string
  category: string
  contributor: Contributor
  stats?: {
    likes?: number
    views?: number
  }
}

export interface Category {
  id: string
  name: string
  icon: string
  count: number
}

export interface FilterState {
  searchQuery: string
  selectedCategory: string
  activeFilters: ResourceStatus[]
  sortBy: 'newest' | 'popular' | 'trending'
}
