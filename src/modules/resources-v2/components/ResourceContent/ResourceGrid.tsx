import React from 'react'
import { useStore } from '@nanostores/react'
import { FiFilter, FiLoader } from 'react-icons/fi'
import { useResources } from '../../hooks/useResources'
import { sortBy, setSortBy } from '../../store/resourceStore'
import ResourceCard from './ResourceCard'

const ResourceGrid: React.FC = () => {
  const { resources, loading, totalCount } = useResources()
  const $sortBy = useStore(sortBy)

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center py-20 gap-4'>
        <FiLoader className='w-10 h-10 text-blue-500 animate-spin' />
        <p className='text-slate-500 font-medium'>Cargando recursos...</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-8'>
      {/* Grid Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-6'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-3xl font-black text-white tracking-tight'>
            Recursos
          </h1>
          <p className='text-slate-500 text-sm'>
            Mostrando{' '}
            <span className='text-slate-300 font-bold'>{totalCount}</span>{' '}
            herramientas y librerías curadas
          </p>
        </div>

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
      </div>

      {/* Grid Content */}
      {resources.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800 rounded-[2.5rem] bg-slate-900/20'>
          <div className='w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4'>
            <FiFilter className='w-8 h-8 text-slate-500' />
          </div>
          <h3 className='text-xl font-bold text-white mb-2'>
            No se encontraron resultados
          </h3>
          <p className='text-slate-500 max-w-xs text-center'>
            Intenta ajustando tu búsqueda o filtros para encontrar lo que
            buscas.
          </p>
        </div>
      )}
    </div>
  )
}

export default ResourceGrid
