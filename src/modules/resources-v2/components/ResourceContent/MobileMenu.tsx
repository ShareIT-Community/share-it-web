import React from 'react'
import { useStore } from '@nanostores/react'
import { FiX, FiMenu } from 'react-icons/fi'
import { isMobileMenuOpen, toggleMobileMenu } from '../../store/resourceStore'
import Sidebar from './Sidebar'

const MobileMenu: React.FC = () => {
  const $isMobileMenuOpen = useStore(isMobileMenuOpen)

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className='md:hidden p-2 text-slate-400 hover:text-white transition-colors'
      >
        <FiMenu className='w-6 h-6' />
      </button>

      {/* Backdrop */}
      {/* Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${$isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          className='absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm'
          onClick={toggleMobileMenu}
        />

        <div
          className={`absolute inset-y-0 left-0 w-80 bg-[#0f172a] shadow-2xl transition-transform duration-300 transform ${$isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className='flex flex-col h-full'>
            <div className='flex items-center justify-between p-6 border-b border-slate-800'>
              <span className='font-bold text-xl text-white'>ResourceHub</span>
              <button
                onClick={toggleMobileMenu}
                className='p-2 text-slate-400 hover:text-white'
              >
                <FiX className='w-6 h-6' />
              </button>
            </div>
            <div className='flex-1 overflow-y-auto custom-scrollbar'>
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
