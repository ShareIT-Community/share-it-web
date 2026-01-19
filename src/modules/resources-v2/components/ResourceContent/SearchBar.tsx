import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '@nanostores/react'
import { FiSearch, FiCommand } from 'react-icons/fi'
import { searchQuery, setQuery } from '../../store/resourceStore'

const SearchBar: React.FC = () => {
  const $searchQuery = useStore(searchQuery)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    // Detect OS for keyboard shortcut display
    setIsMac(
      typeof navigator !== 'undefined' &&
        navigator.platform.toUpperCase().indexOf('MAC') >= 0,
    )

    const handleKeyDown = (e: KeyboardEvent) => {
      // Support both Cmd (Mac) and Ctrl (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className='relative w-full max-w-2xl group'>
      <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
        <FiSearch className='h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors' />
      </div>
      <input
        ref={inputRef}
        type='text'
        value={$searchQuery}
        onChange={(e) => setQuery(e.target.value)}
        className='block w-full pl-11 pr-20 py-3 bg-slate-800/40 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 focus:border-[var(--primary)] transition-all duration-200'
        placeholder='Buscar recursos, herramientas o librerías...'
      />
      <div className='absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none'>
        <div className='flex items-center gap-1 px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-medium text-slate-400'>
          {isMac ? (
            <>
              <FiCommand className='w-3 h-3' />
              <span>K</span>
            </>
          ) : (
            <span>Ctrl + K</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchBar
