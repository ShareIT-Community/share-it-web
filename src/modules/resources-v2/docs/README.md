# Resources v2 Module Documentation

**NOTE**: To view the module, follow this path:

http://localhost:4321/resources-v2

## Architecture

### Module Structure

```
src/modules/resources-v2/
├── layouts/
│   └── ResourceLayout.astro     # Main layout with state-aware sidebar
├── components/
│   ├── ResourceContent.astro    # Content wrapper & orchestration
│   ├── ResourceLayout/
│   │   ├── ResourceHeader.tsx   # Page header with title
│   │   ├── Sidebar.tsx          # Collapsible category navigation
│   │   └── MobileMenu.tsx       # Mobile navigation
│   └── ResourceContent/
│       ├── SearchBar.tsx        # Search functionality
│       ├── StatusFilters.tsx    # relocated status filters
│       ├── ResourceGrid.tsx     # Resource grid with skeletons
│       ├── ResourceCard.tsx     # Individual resource card
│       └── ResourceCardSkeleton.tsx # Loading placeholder
├── store/
│   └── resourceStore.ts         # State management (Nanostores)
├── services/
│   └── resourceService.ts       # API service layer (mock)
├── hooks/
│   └── useResources.ts          # Data fetching & filtering hook
└── docs/
    └── README.md                # This documentation
```

### Global Components Used

- `src/modules/global/components/Tooltip/Tooltip.tsx`: Custom Portal-based tooltip for layout independence.

## Technology Stack

- **Framework**: Astro 5.14.5
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.11
- **State Management**: Nanostores 1.1.0
- **Icons**: React Icons 5.5.0

## Features

### 🔍 Search & Discovery

- Real-time search with debounced input.
- Category-based filtering.
- **Relocated Status Filters**: "Free", "Open Source", and "Paid" filters are now integrated into the main content flow for better UX.
- "Clear Filters" functionality in empty states.

### 📱 Responsive Design

- **Collapsible Sidebar**: Desktop sidebar can be toggled to a "mini" version to maximize content space.
- **Portal-based Tooltips**: Category names appear as tooltips when the sidebar is collapsed, preventing layout clipping.
- **Mobile-First Layout**: Mobile header moved to the top; sidebar transforms into a full-screen drawer.
- Adaptive grid layout (1-3 columns).

### 🎨 Modern UI

- **Skeleton Screens**: Professional loading placeholders that match the card layout.
- **State via Data Attributes**: Sidebar state managed via `data-sidebar-collapsed` for performant CSS transitions.
- Smooth animations and hover states.

### ⚡ Performance

- Optimized images with `lazy` loading and `async` decoding.
- Lightweight state management with Nanostores.
- CSS-driven layout transitions.

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

### Store Structure (Nanostores)

```typescript
export const searchQuery = atom('')
export const selectedCategory = atom('front-end')
export const activeFilters = atom<ResourceStatus[]>([])
export const isSidebarCollapsed = atom(false)
export const isMobileMenuOpen = atom(false)
```

### Store Actions

- `setQuery(query)`: Updates search string.
- `setCategory(id)`: Changes active category.
- `toggleSidebar()`: Toggles expanded/collapsed state on desktop.
- `resetFilters()`: Resets all active searches and filters to default.

## Components

### ResourceLayout.astro

Manages the global module layout. Uses a `data-sidebar-collapsed` attribute on a container to drive CSS layout shifts (widths/margins) without frequent DOM class manipulation.

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

Orchestrates the display of `ResourceCard` or `ResourceCardSkeleton` based on the loading state. Includes an empty state with a "Limpiar filtros" action.

### Sidebar.tsx

Navigational component that supports a `forceExpanded` prop for mobile use. Features integrate `Tooltip` components to provide context in collapsed mode.

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

### StatusFilters.tsx

Horizontal filter bar located in the main content area. Provides quick access to status-based filtering (Free/Paid/etc) using a "pill" UI.

### Tooltip.tsx (Global)

A robust tooltip implementation using **React Portals**. It renders at the `document.body` level to avoid being clipped by parent containers with `overflow: hidden` or `overflow: auto`.

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

_Last updated: February 11, 2026_
_Version: 2.1.0_
