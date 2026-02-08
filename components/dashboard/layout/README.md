# Dashboard Layout Components

A collection of reusable, composable layout components for building consistent and scalable dashboard interfaces.

## Components

### DashboardContentLayout

Main layout wrapper that provides consistent spacing, max-width constraints, and padding.

**Props:**

- `maxWidth` - Maximum width constraint ('sm' to '7xl', 'full')
- `withSpacing` - Enable vertical spacing between children
- `spacingSize` - Spacing size ('sm', 'md', 'lg', 'xl')
- `paddingSize` - Container padding ('none', 'sm', 'md', 'lg')
- `centered` - Center content horizontally
- `className` - Additional CSS classes

**Example:**

```tsx
<DashboardContentLayout maxWidth="5xl" paddingSize="lg">
  <h1>Dashboard Content</h1>
</DashboardContentLayout>
```

### DashboardSection

Section wrapper for grouping related content with an optional header and action.

**Props:**

- `title` - Section title
- `headerAction` - Header action element (buttons, links, etc.)
- `headerSpacing` - Spacing between header and content
- `className` - Additional CSS classes

**Example:**

```tsx
<DashboardSection title="Recent Activity" headerAction={<Button variant="link">View All</Button>}>
  <ActivityList />
</DashboardSection>
```

### DashboardGrid

Responsive grid layout that automatically adjusts columns based on available space.

**Props:**

- `minItemWidth` - Minimum width for grid items (default: 250px)
- `gap` - Gap size between items ('sm', 'md', 'lg')
- `className` - Additional CSS classes

**Example:**

```tsx
<DashboardGrid minItemWidth={300} gap="lg">
  <StoryCard />
  <StoryCard />
  <StoryCard />
</DashboardGrid>
```

### DashboardEmptyState

Empty state component for sections with no data.

**Props:**

- `icon` - Optional icon element
- `title` - Empty state title (required)
- `description` - Optional description text
- `action` - Optional action element (e.g., "Create" button)
- `className` - Additional CSS classes

**Example:**

```tsx
<DashboardEmptyState
  icon={<BookIcon />}
  title="No stories yet"
  description="Start creating your first story"
  action={<CreateStoryButton />}
/>
```

## Usage Patterns

### Complete Dashboard Page

```tsx
import {
  DashboardContentLayout,
  DashboardSection,
  DashboardGrid,
  DashboardEmptyState,
} from '@/components/dashboard/layout';

export function DashboardPage() {
  return (
    <DashboardContentLayout maxWidth="7xl" paddingSize="lg">
      <DashboardSection title="Your Stories" headerAction={<CreateStoryButton />}>
        {stories.length > 0 ? (
          <DashboardGrid minItemWidth={280} gap="md">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </DashboardGrid>
        ) : (
          <DashboardEmptyState
            title="No stories yet"
            description="Create your first story to get started"
            action={<CreateStoryButton />}
          />
        )}
      </DashboardSection>
    </DashboardContentLayout>
  );
}
```

### Nested Sections

```tsx
<DashboardContentLayout>
  <DashboardSection title="Overview">
    <StatsCards />
  </DashboardSection>

  <DashboardSection title="Recent Activity">
    <ActivityList />
  </DashboardSection>

  <DashboardSection title="Your Stories">
    <DashboardGrid>
      <StoryCard />
      <StoryCard />
    </DashboardGrid>
  </DashboardSection>
</DashboardContentLayout>
```

## Design Principles

1. **Single Responsibility** - Each component has one clear purpose
2. **Composability** - Components work together but remain independent
3. **Flexibility** - Extensive customization through props and className
4. **Consistency** - Shared constants ensure uniform spacing and sizing
5. **Responsiveness** - Built-in responsive behavior for all screen sizes

## File Structure

```
components/dashboard/layout/
├── constants.ts                    # Shared constants and types
├── dashboard-content-layout.tsx    # Main layout wrapper
├── dashboard-section.tsx           # Section wrapper
├── dashboard-grid.tsx              # Responsive grid
├── dashboard-empty-state.tsx       # Empty state display
├── index.ts                        # Centralized exports
└── README.md                       # This file
```

## Migration Guide

If you're migrating from the old `dashboard-content-layout.tsx` file:

**Before:**

```tsx
import {
  DashboardContentLayout,
  DashboardSection,
} from '@/components/dashboard/dashboard-content-layout';
```

**After:**

```tsx
import { DashboardContentLayout, DashboardSection } from '@/components/dashboard/layout';
```

All component APIs remain the same, so no other changes are required.
