import React from 'react'
import { useStore } from '@nanostores/react'
import { FiFilter, FiLoader } from 'react-icons/fi'
import { useResources } from '../../hooks/useResources'
import { sortBy, setSortBy, resetFilters } from '../../store/resourceStore'
import ResourceCard from './ResourceCard'
import ResourceCardSkeleton from './ResourceCardSkeleton'

const ResourceGrid: React.FC = () => {
  const { resources, loading, totalCount } = useResources()
  const $sortBy = useStore(sortBy)

  if (loading) {
    return (
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-6'>
          <div className='flex flex-col gap-2'>
            <div className='h-4 w-32 bg-slate-800 rounded animate-pulse' />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
          {/* NOTE: this is a simulation of the resources  */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ResourceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-6'>
        <div className='flex flex-col gap-1'>
          <p className='text-slate-400 text-sm'>
            Mostrando{' '}
            <span className='text-primary font-bold'>{totalCount}</span>{' '}
            herramientas.
          </p>
        </div>

        {/* NOTE: will be implemented in the future  
        <div className='flex items-center p-1 bg-[#1e293b] border border-slate-800 rounded-2xl'>
          {(['newest', 'popular', 'trending'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-200 ${
                $sortBy === option
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        */}
      </div>
      {/* Grid Content */}
      {resources.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800 rounded-md bg-slate-900/20'>
          <div className='w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4'>
            <FiFilter className='w-8 h-8 text-slate-500' />
          </div>
          <h3 className='text-xl font-bold text-white mb-2'>
            No se encontraron resultados
          </h3>
          <p className='text-slate-500 max-w-xs text-center mb-8'>
            Intenta ajustando tu búsqueda o filtros para encontrar lo que
            buscas.
          </p>
          <button
            onClick={resetFilters}
            className='px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-md transition-all border border-slate-700'
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  )
}

export default ResourceGrid
