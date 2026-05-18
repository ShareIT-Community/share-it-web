import React, { lazy, Suspense, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaWhatsapp } from 'react-icons/fa6'

const EntryForm = lazy(() =>
  import('../../../home/components/EntryForm/EntryForm').then((m) => ({
    default: m.EntryForm,
  })),
)

interface JoinFormWrapperProps {
  renderTrigger: (openForm: () => void) => React.ReactNode
}

const JoinFormWrapper: React.FC<JoinFormWrapperProps> = ({ renderTrigger }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (isFormOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isFormOpen])

  const openForm = () => setIsFormOpen(true)
  const closeForm = () => setIsFormOpen(false)

  return (
    <>
      {renderTrigger(openForm)}

      {isFormOpen && typeof window !== 'undefined'
        ? createPortal(
            <section
              className='left-0 top-0 backdrop-blur-3xl flex justify-center items-center rounded fixed h-[100dvh] w-[100vw] z-[999] shadow'
              role='dialog'
              aria-modal='true'
              aria-labelledby='entry-form-title'
            >
              <div className='bg-white-5 rounded-lg shadow-lg'>
                <Suspense fallback={null}>
                  <EntryForm onClose={closeForm} />
                </Suspense>
              </div>
            </section>,
            document.body,
          )
        : null}
    </>
  )
}

export const JoinButton: React.FC = () => {
  return (
    <JoinFormWrapper
      renderTrigger={(openForm) => (
        <button
          type='button'
          onClick={openForm}
          className='flex items-center justify-center gap-2 w-full md:w-auto min-h-[44px] px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:opacity-90 transition-all cursor-pointer'
        >
          <span>Únete</span>

       <FaWhatsapp className='w-5 h-5' />
        </button>
      )}
    />
  )
}

export const JoinLinkButton: React.FC = () => {
  return (
    <a
      href='https://discord.gg/bqRttzC4YB'
      target='_blank'
      rel='noopener noreferrer'
      className='text-[#ff6900] hover:text-[#ff8533] transition-colors font-bold ml-1 bg-none border-none cursor-pointer inline-block'
    >
      ¡Únete para no perderte ninguno!
    </a>
  )
}
