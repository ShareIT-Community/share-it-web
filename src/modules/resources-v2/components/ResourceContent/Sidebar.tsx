import React, { useEffect, useState } from 'react'
import { useStore } from '@nanostores/react'
import {
  FiCode,
  FiServer,
  FiPenTool,
  FiSettings,
  FiDatabase,
  FiCheck,
} from 'react-icons/fi'
import {
  selectedCategory,
  activeFilters,
  setCategory,
  toggleFilter,
} from '../../store/resourceStore'
import { resourceService } from '../../services/resourceService'
import type { Category, ResourceStatus } from '../../types/resource'

const iconMap: Record<string, React.ReactNode> = {
  FiCode: <FiCode className='w-5 h-5' />,
  FiServer: <FiServer className='w-5 h-5' />,
  FiPenTool: <FiPenTool className='w-5 h-5' />,
  FiSettings: <FiSettings className='w-5 h-5' />,
  FiDatabase: <FiDatabase className='w-5 h-5' />,
}

const Sidebar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const $selectedCategory = useStore(selectedCategory)
  const $activeFilters = useStore(activeFilters)

  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await resourceService.getCategories()
      setCategories(cats)
    }
    fetchCategories()
  }, [])

  const filters: ResourceStatus[] = ['Free', 'Open Source', 'Paid']

  return (
    <div className='flex flex-col p-6 gap-8'>
      <div className='flex items-center gap-3 px-2'>
        <a href='/' className='cursor-pointer flex items-center gap-2'>
          <img
            src='/images/shareit_logo_waves.png'
            alt='ShareIT Logo'
            className='w-10 h-10 object-contain'
          />
          <h2 className='text-xl font-bold tracking-tight text-white'>
            ShareIT
          </h2>
        </a>
      </div>

      <div>
        <h3 className='text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2'>
          Categorías
        </h3>
        <nav className='flex flex-col gap-1'>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                $selectedCategory === cat.id
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <div className='flex items-center gap-3'>
                <span
                  className={`${$selectedCategory === cat.id ? 'text-[var(--primary)]' : 'text-slate-500 group-hover:text-slate-300'}`}
                >
                  {iconMap[cat.icon]}
                </span>
                <span>{cat.name}</span>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  $selectedCategory === cat.id
                    ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div>
        <h3 className='text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2'>
          Filtros
        </h3>
        <div className='flex flex-col gap-3 px-2'>
          {filters.map((filter) => (
            <label
              key={filter}
              className='flex items-center gap-3 cursor-pointer group'
            >
              <div className='relative flex items-center'>
                <input
                  type='checkbox'
                  className='peer sr-only'
                  checked={$activeFilters.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                />
                <div
                  className={`w-5 h-5 border-2 rounded-md transition-all duration-200 ${
                    $activeFilters.includes(filter)
                      ? 'bg-[var(--primary)] border-[var(--primary)]'
                      : 'border-slate-700 group-hover:border-slate-500'
                  }`}
                >
                  {$activeFilters.includes(filter) && (
                    <FiCheck className='w-4 h-4 text-white absolute inset-0 m-auto' />
                  )}
                </div>
              </div>
              <span
                className={`text-sm transition-colors duration-200 ${
                  $activeFilters.includes(filter)
                    ? 'text-slate-200'
                    : 'text-slate-400 group-hover:text-slate-300'
                }`}
              >
                {filter}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className='mt-auto border-t border-slate-800 pt-6 px-2'>
        <div className='flex items-center justify-between text-xs text-slate-500'>
          <span>© {currentYear} ShareIT</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
