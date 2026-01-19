# Resources v2 Module Documentation

## Overview

The Resources v2 module is a modern, feature-rich resource directory built with Astro, React, and TypeScript. It provides an intuitive interface for browsing, searching, and filtering development resources across multiple categories.

## Architecture

### Module Structure

```
src/modules/resources-v2/
├── layouts/
│   └── ResourceLayout.astro     # Main layout with sidebar
├── components/
│   ├── ResourceContent.astro    # Content wrapper
│   └── ResourceContent/
│       ├── SearchBar.tsx         # Search functionality
│       ├── ResourceGrid.tsx     # Resource grid display
│       ├── Sidebar.tsx          # Category navigation
│       ├── ResourceCard.tsx     # Individual resource card
│       └── MobileMenu.tsx        # Mobile navigation
├── store/
│   └── resourceStore.ts         # State management
├── services/
│   └── resourceService.ts       # API service layer
├── hooks/
│   └── useResources.ts           # Custom React hooks
├── types/
│   └── resource.d.ts            # TypeScript definitions
└── docs/
    └── README.md                # This documentation
```

## Technology Stack

- **Framework**: Astro 5.16.11
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.18
- **State Management**: Nanostores 1.1.0
- **Icons**: React Icons 5.5.0

## Features

### 🔍 Search & Discovery

- Real-time search with debounced input
- Category-based filtering
- Status filtering (Free/Open Source/Paid)
- Sort options (newest/popular/trending)

### 📱 Responsive Design

- Desktop: Fixed sidebar navigation
- Mobile: Hamburger menu with slide-out navigation
- Adaptive grid layout
- Touch-friendly interactions

### 🎨 Modern UI

- Smooth animations and transitions
- Hover states and micro-interactions
- Custom scrollbar styling
- Loading states and skeletons

### ⚡ Performance

- Client-side navigation with Astro transitions
- Optimized component rendering
- Efficient state management
- Lazy loading capabilities

## Data Models

### Resource Interface

```typescript
interface Resource {
  id: string
  title: string
  description: string
  thumbnail: string
  icon?: string
  status: ResourceStatus
  label: ResourceLabel
  tags: string[]
  url: string
  category: string
  contributor: Contributor
  stats?: {
    likes?: number
    views?: number
  }
}
```

### Category Interface

```typescript
interface Category {
  id: string
  name: string
  icon: string
  count: number
}
```

### Filter State Interface

```typescript
interface FilterState {
  searchQuery: string
  selectedCategory: string
  activeFilters: ResourceStatus[]
  sortBy: 'newest' | 'popular' | 'trending'
}
```

## State Management

### Store Structure

The module uses Nanostores for lightweight, reactive state management:

```typescript
// Search and filter state
export const searchQuery = atom('')
export const selectedCategory = atom('front-end')
export const activeFilters = atom<ResourceStatus[]>([])
export const sortBy = atom<'newest' | 'popular' | 'trending'>('newest')

// UI state
export const isMobileMenuOpen = atom(false)
```

### Store Actions

```typescript
export const setQuery = (query: string) => searchQuery.set(query)
export const setCategory = (category: string) => selectedCategory.set(category)
export const toggleFilter = (filter: ResourceStatus) => {
  /* toggle logic */
}
export const setSortBy = (sort: 'newest' | 'popular' | 'trending') =>
  sortBy.set(sort)
export const toggleMobileMenu = () =>
  isMobileMenuOpen.set(!isMobileMenuOpen.get())
```

## Components

### ResourceLayout.astro

The main layout component that provides:

- HTML structure with meta tags
- Sidebar navigation (desktop)
- Mobile header with hamburger menu
- Global styles and fonts

**Props:**

- `title: string` - Page title for SEO

### ResourceContent.astro

Content wrapper that orchestrates:

- Header section with title and description
- Search bar integration
- Resource grid display
- "Suggest resource" CTA button

### SearchBar.tsx

Search functionality component featuring:

- Debounced search input (300ms delay)
- Clear search button
- Loading state indicator
- Responsive design

**Features:**

- Real-time search filtering
- Keyboard navigation support
- Mobile-optimized layout

### ResourceGrid.tsx

Main grid display component handling:

- Resource card rendering
- Empty state display
- Loading skeletons
- Responsive grid layout

**Features:**

- Adaptive columns (1-3 based on screen size)
- Smooth transitions
- Accessibility attributes

### Sidebar.tsx

Desktop navigation sidebar providing:

- Category list with resource counts
- Status filter checkboxes
- Sort options
- Active state indicators

**Features:**

- Fixed positioning on desktop
- Custom scrollbar styling
- Hover and active states
- Icon integration

### ResourceCard.tsx

Individual resource card component with:

- Thumbnail image
- Resource metadata
- Status badges
- Contributor information
- External link handling

**Features:**

- Hover animations
- Click-to-visit functionality
- Responsive image handling
- Accessibility labels

### MobileMenu.tsx

Mobile navigation component featuring:

- Slide-out menu animation
- Category navigation
- Filter options
- Close button and overlay

**Features:**

- Touch-friendly interactions
- Smooth animations
- Backdrop overlay
- Escape key support

## Services

### resourceService.ts

API service layer that currently provides:

- Mock data for 10 sample resources
- Category data with counts
- Simulated API delays (500ms/300ms)
- Promise-based async operations

**Methods:**

```typescript
async getAllResources(): Promise<Resource[]>
async getCategories(): Promise<Category[]>
```

**Future Integration:**

- Replace mock data with real API calls
- Add pagination support
- Implement caching strategies
- Error handling and retry logic

## Hooks

### useResources.ts

Custom React hooks providing:

- `useResources()` - Resource data fetching and filtering
- `useCategories()` - Category data management
- `useFilters()` - Filter state management

**Features:**

- Automatic data refetching
- Loading state management
- Error handling
- Optimistic updates

## Performance Optimization

### Code Splitting

- Component-level lazy loading
- Route-based code splitting
- Dynamic imports for heavy dependencies

### Rendering Optimization

- React.memo for expensive components
- Debounced search input
- Virtual scrolling (future enhancement)
- Image optimization

---

_Last updated: January 19, 2026_
_Version: 2.0.0_
