import clsx from 'clsx'

const ResouceHeader = () => {
  return (
    <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-bold text-white tracking-tight sm:text-3xl'>
          Recursos de ShareIT
        </h2>
        <p className='text-slate-400 text-lg max-w-2xl'>
          Colección de herramientas y recursos para el desarrollo web, diseño,
          DevOps y más.
        </p>
      </div>

      <div>
        <div
          className={clsx(
            'flex items-center text-lg active:scale-95 h-12 justify-center cursor-pointer rounded-md w-full sm:w-auto font-semibold transition-all duration-200 border border-[#5865F2] bg-primary hover:bg-[#ffffff1a]',
          )}
        >
          <a
            href='#'
            rel='noopener noreferrer'
            target='_blank'
            className='flex items-center gap-2 w-full justify-center cursor-pointer lg:px-10 h-full text-white'
          >
            Sugerir recurso
          </a>
        </div>
      </div>
    </div>
  )
}

export default ResouceHeader
