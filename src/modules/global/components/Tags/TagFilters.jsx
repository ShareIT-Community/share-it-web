import { useState, useEffect } from 'react';

export default function TagFilters({ tags }) {
  const [activeTag, setActiveTag] = useState('all');

  useEffect(() => {
    filterByTag('all');
  }, []);

  const filterByTag = (tagId) => {
    setActiveTag(tagId);
    
    const contentItems = document.querySelectorAll('.content-item');
    
    contentItems.forEach(item => {
      const dataTags = item.getAttribute('data-tags');
      if (tagId === 'all') {
        item.style.display = 'block';
      } else if (dataTags) {
        const itemTags = dataTags.split(' ');
        if (itemTags.includes(tagId)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      }
    });
  };

  return (
    <div className='flex flex-wrap gap-2 justify-center'>
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
          activeTag === 'all'
            ? 'text-white'
            : 'bg-gray-700 text-gray-300 hover:text-white'
        }`}
        style={activeTag === 'all' ? { backgroundColor: 'var(--primary)' } : { hover: { backgroundColor: 'var(--secondary)' } }}
        onClick={() => filterByTag('all')}
      >
        Todos
      </button>
      {tags.map(tag => (
        <button
          key={tag.id}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            activeTag === tag.id
              ? 'text-white'
              : 'bg-gray-700 text-gray-300 hover:text-white'
          }`}
          style={activeTag === tag.id ? { backgroundColor: 'var(--primary)' } : { hover: { backgroundColor: 'var(--secondary)' } }}
          onClick={() => filterByTag(tag.id)}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
} 