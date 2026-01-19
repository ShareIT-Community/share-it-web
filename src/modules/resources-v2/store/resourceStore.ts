import { atom } from 'nanostores'
import type { ResourceStatus } from '../types/resource'

export const searchQuery = atom('')
export const selectedCategory = atom('front-end')
export const activeFilters = atom<ResourceStatus[]>([])
export const sortBy = atom<'newest' | 'popular' | 'trending'>('newest')
export const isMobileMenuOpen = atom(false)

export const setQuery = (query: string) => searchQuery.set(query)
export const setCategory = (category: string) => {
  selectedCategory.set(category)
  isMobileMenuOpen.set(false)
}
export const toggleFilter = (filter: ResourceStatus) => {
  const current = activeFilters.get()
  if (current.includes(filter)) {
    activeFilters.set(current.filter((f) => f !== filter))
  } else {
    activeFilters.set([...current, filter])
  }
}
export const setSortBy = (sort: 'newest' | 'popular' | 'trending') =>
  sortBy.set(sort)
export const toggleMobileMenu = () =>
  isMobileMenuOpen.set(!isMobileMenuOpen.get())
