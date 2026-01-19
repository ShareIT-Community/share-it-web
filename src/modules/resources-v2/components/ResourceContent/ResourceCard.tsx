import React from 'react'
import { FiExternalLink, FiStar, FiActivity, FiZap } from 'react-icons/fi'
import type { Resource } from '../../types/resource'

interface Props {
  resource: Resource
}

const ResourceCard: React.FC<Props> = ({ resource }) => {
  const getLabelIcon = () => {
    switch (resource.label) {
      case 'new':
        return <FiZap className='w-3 h-3 text-yellow-500' />
      case 'popular':
        return <FiStar className='w-3 h-3 text-amber-500' />
      case 'trending':
        return <FiActivity className='w-3 h-3 text-emerald-500' />
      default:
        return null
    }
  }

  const getStatusColor = () => {
    switch (resource.status) {
      case 'Free':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'Open Source':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
      case 'Paid':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }
  }

  return (
    <div className='group relative bg-slate-800/40 border border-slate-800/50 rounded-3xl overflow-hidden hover:border-[var(--primary)]/40 transition-all duration-300 flex flex-col h-full shadow-2xl shadow-black/20'>
      {/* Thumbnail Area */}
      <div className='relative aspect-[16/10] overflow-hidden'>
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60' />

        {/* Status Badge */}
        <div
          className={`absolute top-4 right-4 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getStatusColor()}`}
        >
          {resource.status}
        </div>

        {/* Label Ribbon/Badge */}
        {resource.label && (
          <div className='absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-200'>
            {getLabelIcon()}
            <span>{resource.label}</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className='p-6 flex flex-col flex-1 gap-4'>
        <div className='flex justify-between items-start'>
          <div className='flex flex-col gap-1'>
            <h3 className='text-xl font-bold text-white group-hover:text-[var(--primary)] transition-colors uppercase tracking-tight'>
              {resource.title}
            </h3>
            <p className='text-sm text-slate-400 line-clamp-2 leading-relaxed'>
              {resource.description}
            </p>
          </div>
          {resource.icon && (
            <div className='shrink-0 w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center'>
              <img
                src={resource.icon}
                alt=''
                className='w-5 h-5 object-contain'
              />
            </div>
          )}
        </div>

        {/* Tech Stack Pills */}
        <div className='flex flex-wrap gap-2'>
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className='px-2.5 py-1 bg-slate-800/40 border border-slate-700/50 rounded-lg text-[10px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors'
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className='mt-auto pt-6 border-t border-slate-800/50 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <img
                src={resource.contributor.avatar}
                alt={resource.contributor.name}
                className='w-8 h-8 rounded-full border-2 border-slate-800 shadow-lg'
              />
              <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full' />
            </div>
            <span className='text-xs font-medium text-slate-500'>
              Shared by{' '}
              <span className='text-slate-300'>
                {resource.contributor.name}
              </span>
            </span>
          </div>

          <a
            href={resource.url}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--secondary)] transition-colors group/link'
          >
            Visit Site
            <FiExternalLink className='w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ResourceCard
