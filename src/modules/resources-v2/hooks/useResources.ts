import { useState, useEffect, useMemo } from 'react'
import { useStore } from '@nanostores/react'
import { resourceService } from '../services/resourceService'
import {
  searchQuery,
  selectedCategory,
  activeFilters,
  sortBy,
} from '../store/resourceStore'
import type { Resource } from '../types/resource'

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  const $searchQuery = useStore(searchQuery)
  const $selectedCategory = useStore(selectedCategory)
  const $activeFilters = useStore(activeFilters)
  const $sortBy = useStore(sortBy)

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true)
      try {
        const data = await resourceService.getAllResources()
        setResources(data)
      } catch (error) {
        console.error('Error fetching resources:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [])

  const filteredResources = useMemo(() => {
    return resources
      .filter((resource) => {
        const matchesSearch =
          resource.title.toLowerCase().includes($searchQuery.toLowerCase()) ||
          resource.description
            .toLowerCase()
            .includes($searchQuery.toLowerCase()) ||
          resource.tags.some((tag) =>
            tag.toLowerCase().includes($searchQuery.toLowerCase()),
          )

        const matchesCategory =
          $selectedCategory === '' || resource.category === $selectedCategory

        const matchesFilters =
          $activeFilters.length === 0 ||
          $activeFilters.includes(resource.status)

        return matchesSearch && matchesCategory && matchesFilters
      })
      .sort((a, b) => {
        if ($sortBy === 'popular') {
          return (b.stats?.likes || 0) - (a.stats?.likes || 0)
        }
        if ($sortBy === 'trending') {
          return (b.stats?.views || 0) - (a.stats?.views || 0)
        }
        // newest is default (returning 1 - 1 as dummy since we don't have date yet, but can use id)
        return b.id.localeCompare(a.id)
      })
  }, [resources, $searchQuery, $selectedCategory, $activeFilters, $sortBy])

  return {
    resources: filteredResources,
    loading,
    totalCount: filteredResources.length,
  }
}
