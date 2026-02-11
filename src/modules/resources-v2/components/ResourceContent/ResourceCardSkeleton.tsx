import React from 'react'

const ResourceCardSkeleton: React.FC = () => {
  return (
    <div className='bg-slate-800/40 border border-slate-800/50 rounded-md overflow-hidden flex flex-col h-full animate-pulse'>
      {/* Thumbnail Skeleton */}
      <div className='aspect-[16/10] bg-slate-800/60' />

      <div className='p-6 flex flex-col flex-1 gap-6'>
        <div className='flex flex-col gap-3'>
          {/* Title and Badge Skeleton */}
          <div className='flex justify-between items-start'>
            <div className='h-6 w-3/4 bg-slate-800 rounded-md' />
            <div className='h-8 w-8 bg-slate-800 rounded-lg' />
          </div>
          {/* Description Skeleton */}
          <div className='space-y-2'>
            <div className='h-4 w-full bg-slate-800 rounded-md' />
            <div className='h-4 w-2/3 bg-slate-800 rounded-md' />
          </div>
        </div>

        {/* Tags Skeleton */}
        <div className='flex flex-wrap gap-2'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='h-6 w-16 bg-slate-800 rounded-lg' />
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className='mt-auto pt-6 border-t border-slate-800/50 flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <div className='h-8 w-8 bg-slate-800 rounded-full' />
            <div className='h-3 w-32 bg-slate-800 rounded-md' />
          </div>
          <div className='h-5 w-24 bg-slate-800 rounded-md' />
        </div>
      </div>
    </div>
  )
}

export default ResourceCardSkeleton
