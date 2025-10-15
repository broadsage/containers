# Reusable UI Components

This directory contains shared, reusable UI components that follow best practices and maintain consistency across the application.

## Components

### Badge Component

A reusable badge component for displaying image type indicators (Official, Community, Verified).

**Location:** `./Badge.tsx`

**Usage:**
```tsx
import { Badge } from './ui/Badge';

// Basic usage
<Badge type="official" />

// With custom size
<Badge type="verified" size="lg" />

// Available types
<Badge type="official" />   // Blue badge
<Badge type="community" />  // Green badge
<Badge type="verified" />   // Purple badge
```

**Props:**
- `type`: 'official' | 'community' | 'verified' (required)
- `size`: 'sm' | 'md' | 'lg' (optional, default: 'md')
- `className`: string (optional)

**Sizes:**
- `sm`: Small (12px icon, text-xs)
- `md`: Medium (16px icon, text-sm) - default
- `lg`: Large (20px icon, text-base)

---

### FilterButton Component

A reusable button component for category and badge filters.

**Location:** `./FilterButton.tsx`

**Usage:**
```tsx
import { FilterButton } from './ui/FilterButton';
import { Layers } from 'lucide-react';

// Default variant (black/white theme)
<FilterButton
  id="featured"
  name="Featured"
  icon={Layers}
  isSelected={selectedCategory === 'featured'}
  onClick={() => handleCategoryChange('featured')}
  variant="default"
/>

// Colored variant (custom colors)
<FilterButton
  id="official"
  name="Official"
  icon={Shield}
  isSelected={selectedBadge === 'official'}
  onClick={() => handleBadgeChange('official')}
  variant="colored"
  color="text-blue-600"
  bg="bg-blue-50"
  border="border-blue-200"
/>
```

**Props:**
- `id`: string (required)
- `name`: string (required)
- `icon`: LucideIcon | null (optional)
- `isSelected`: boolean (required)
- `onClick`: () => void (required)
- `variant`: 'default' | 'colored' (optional, default: 'default')
- `color`: string (optional, for colored variant)
- `bg`: string (optional, for colored variant)
- `border`: string (optional, for colored variant)

---

## Constants

### Filter Configurations

**Location:** `../../constants/filters.ts`

Pre-configured badge filter definitions.

**Usage:**
```tsx
import { BADGE_FILTERS } from '../constants/filters';

// Render all badge filters
{BADGE_FILTERS.map((badge) => (
  <FilterButton
    key={badge.id}
    id={badge.id}
    name={badge.name}
    icon={badge.icon}
    isSelected={selectedBadge === badge.id}
    onClick={() => handleBadgeChange(badge.id)}
    variant="colored"
    color={badge.color}
    bg={badge.bg}
    border={badge.border}
  />
))}
```

---

## Best Practices

1. **Import from index**: Use `import { Badge, FilterButton } from './ui'` when possible
2. **Consistent sizing**: Use predefined sizes (sm, md, lg) instead of custom styles
3. **Type safety**: Always use TypeScript types provided by components
4. **Accessibility**: All components include proper ARIA attributes
5. **Theme consistency**: Colors follow the design system defined in badgeConfig

---

## Adding New Components

When adding new reusable components to this directory:

1. Create the component file with proper TypeScript types
2. Export it from `index.ts`
3. Document it in this README
4. Ensure it follows Tailwind CSS conventions
5. Include examples in the documentation
