import React from 'react'
import { useStore } from '@nanostores/react'
import { activeFilters, toggleFilter } from '../../store/resourceStore'
import type { ResourceStatus } from '../../types/resource'
import { FiCheck } from 'react-icons/fi'

const StatusFilters: React.FC = () => {
  const $activeFilters = useStore(activeFilters)
  const filters: ResourceStatus[] = ['Free', 'Open Source', 'Paid']

  return (
    <div className='flex flex-wrap items-center gap-3'>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => toggleFilter(filter)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
            $activeFilters.includes(filter)
              ? 'bg-primary/10 border-primary text-primary shadow-sm shadow-primary/10'
              : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <div
            className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
              $activeFilters.includes(filter)
                ? 'bg-primary text-white scale-100'
                : 'bg-slate-700 text-transparent scale-90'
            }`}
          >
            <FiCheck className='w-3 h-3' />
          </div>
          {filter}
        </button>
      ))}
    </div>
  )
}

export default StatusFilters
