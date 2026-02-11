import React, { useEffect, useState } from 'react'
import { useStore } from '@nanostores/react'
import {
  FiCode,
  FiServer,
  FiPenTool,
  FiSettings,
  FiDatabase,
} from 'react-icons/fi'
import {
  selectedCategory,
  setCategory,
  isSidebarCollapsed,
  toggleSidebar,
} from '../../store/resourceStore'
import { resourceService } from '../../services/resourceService'
import type { Category } from '../../types/resource'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Tooltip from 'src/modules/global/components/Tooltip/Tooltip'

const iconMap: Record<string, React.ReactNode> = {
  FiCode: <FiCode className='w-5 h-5' />,
  FiServer: <FiServer className='w-5 h-5' />,
  FiPenTool: <FiPenTool className='w-5 h-5' />,
  FiSettings: <FiSettings className='w-5 h-5' />,
  FiDatabase: <FiDatabase className='w-5 h-5' />,
}

interface SidebarProps {
  forceExpanded?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ forceExpanded = false }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const $selectedCategory = useStore(selectedCategory)
  const isSidebarCollapsedStore = useStore(isSidebarCollapsed)

  const isCollapsed = isSidebarCollapsedStore && !forceExpanded

  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await resourceService.getCategories()
      setCategories(cats)
    }
    fetchCategories()
  }, [])

  return (
    <div
      className={`flex flex-col h-full transition-all duration-300 ${isCollapsed ? 'p-4 gap-6' : 'p-6 gap-8'}`}
    >
      <div
        className={`flex items-center gap-3 px-2 ${isCollapsed ? 'justify-center' : 'justify-between'}`}
      >
        <a
          href='/'
          className={`cursor-pointer flex items-center gap-2 ${isCollapsed ? 'hidden' : 'flex'}`}
        >
          <img
            src='/images/shareit_logo_waves.png'
            alt='ShareIT Logo'
            className='w-10 h-10 object-contain'
          />
          <h2 className='text-xl font-bold tracking-tight text-white'>
            ShareIT
          </h2>
        </a>

        {!forceExpanded && (
          <button
            onClick={toggleSidebar}
            aria-label={
              isCollapsed ? 'Expandir menú lateral' : 'Contraer menú lateral'
            }
            className='p-2 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all'
          >
            {isCollapsed ? (
              <FiChevronRight className='w-5 h-5' />
            ) : (
              <FiChevronLeft className='w-5 h-5' />
            )}
          </button>
        )}
      </div>

      <div>
        {!isCollapsed && (
          <h3 className='text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 px-2'>
            Categorías
          </h3>
        )}
        <nav className='flex flex-col gap-1'>
          {categories.map((cat) => (
            <Tooltip
              key={cat.id}
              content={cat.name}
              position='right'
              active={isCollapsed}
            >
              <button
                onClick={() => setCategory(cat.id)}
                className={`w-full flex items-center rounded-md transition-all duration-200 group ${
                  $selectedCategory === cat.id
                    ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                } ${isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5'}`}
              >
                <div className='flex items-center gap-3'>
                  <span
                    className={`${$selectedCategory === cat.id ? 'text-[var(--primary)]' : 'text-slate-500 group-hover:text-slate-300'}`}
                  >
                    {iconMap[cat.icon]}
                  </span>
                  {!isCollapsed && <span>{cat.name}</span>}
                </div>
                {!isCollapsed && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      $selectedCategory === cat.id
                        ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            </Tooltip>
          ))}
        </nav>
      </div>

      {!isCollapsed && (
        <div className='mt-auto border-t border-slate-800 pt-6 px-2'>
          <div className='flex items-center justify-between text-xs text-slate-500'>
            <span>© {currentYear} ShareIT</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
