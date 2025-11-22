# UI Design System - Reusable Instructions for Agents

This document provides comprehensive UI design system instructions for creating beautiful, modern interfaces that match the aesthetic of this project. Use these guidelines when building new features or adapting this UI to other projects.

## 🎨 Design Philosophy

**Core Principles:**
- **Dark-first design**: Deep slate backgrounds (slate-950, slate-900) with high contrast text
- **Gradient accents**: Pink-to-purple gradients for branding and highlights
- **Glassmorphism**: Subtle backdrop blur effects on overlays and modals
- **Minimal borders**: Thin borders (slate-700, slate-800) for subtle separation
- **Smooth transitions**: All interactive elements have transition effects
- **Card-based layout**: Content organized in rounded cards with shadows

## 🎨 Color System

### Primary Colors

```typescript
// Background Colors
bg-slate-950    // Main background (#0f172a)
bg-slate-900    // Card/panel background (#0f172a)
bg-slate-800    // Elevated surfaces (#1e293b)
bg-slate-700    // Borders, dividers (#334155)

// Text Colors
text-white      // Primary text
text-slate-200  // Secondary text (#e2e8f0)
text-slate-400  // Tertiary text (#94a3b8)
text-slate-500  // Muted text (#64748b)
text-slate-600  // Very muted text (#475569)

// Accent Colors
text-pink-400   // Active states, highlights
text-pink-500   // Primary accent (#ec4899)
text-pink-600   // Hover states (#db2777)
bg-pink-500     // Buttons, badges
bg-pink-600     // Button hover states

// Gradient Colors
from-pink-500 to-purple-500    // Primary gradient
from-pink-600 to-purple-600    // Darker gradient
from-purple-600 to-pink-600    // Reversed gradient

// Status Colors
text-green-400  // Success states
bg-green-500    // Success badges
text-yellow-400 // Warning/processing states
```

### Color Usage Patterns

**Backgrounds:**
- Main app background: `bg-slate-950`
- Sidebar/panels: `bg-slate-900`
- Cards/modals: `bg-slate-900` or `bg-slate-900/50` (with opacity)
- Elevated cards: `bg-slate-800`

**Borders:**
- Default: `border-slate-700`
- Hover: `border-slate-600` or `border-pink-500`
- Active: `border-pink-500/50`

**Text Hierarchy:**
- Headings: `text-white`
- Body: `text-slate-200`
- Labels: `text-slate-400`
- Muted: `text-slate-500` or `text-slate-600`

## 📐 Typography

### Font Families
- **Primary**: Geist Sans (via Next.js font system)
- **Monospace**: Geist Mono (for code, technical content)

### Font Sizes & Weights

```css
/* Headings */
text-3xl font-bold        // Page titles (30px)
text-2xl font-bold        // Section titles (24px)
text-xl font-bold         // Subsection titles (20px)
text-lg font-bold         // Card titles (18px)

/* Body Text */
text-base                 // Default body (16px)
text-sm                   // Secondary text (14px)
text-xs                   // Labels, captions (12px)
text-[10px]               // Very small labels (10px)

/* Font Weights */
font-bold                 // Headings, emphasis
font-semibold             // Subheadings
font-medium               // Labels, buttons
font-normal               // Body text
```

### Text Utilities

```css
/* Text Effects */
bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent
// Creates gradient text effect (for branding)

line-clamp-2              // Truncate text to 2 lines with ellipsis
truncate                  // Single line truncation
```

## 🎯 Layout Patterns

### Container Structure

```tsx
// Main App Container
<div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
  <Sidebar />
  <main className="flex-1 flex flex-col overflow-hidden relative">
    <Header />
    <div className="flex-1 overflow-y-auto">
      {/* Content */}
    </div>
  </main>
</div>

// Card Container
<div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
  {/* Card content */}
</div>

// Modal/Overlay
<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl">
    {/* Modal content */}
  </div>
</div>
```

### Grid Layouts

```css
/* Responsive Grid */
grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6
// 1 column mobile, 3 tablet, 4 desktop

grid grid-cols-2 md:grid-cols-4 gap-4
// 2 columns mobile, 4 desktop

grid grid-cols-1 md:grid-cols-2 gap-8
// 2-column layout on desktop
```

### Spacing System

```css
/* Padding */
p-2, p-3, p-4, p-6, p-8    // Standard padding scale
px-4, py-3                 // Directional padding

/* Margin */
mb-2, mb-4, mb-6, mb-8     // Bottom margin
mt-1, mt-2, mt-4           // Top margin
gap-3, gap-4, gap-6        // Grid/flex gap

/* Common Patterns */
p-6                        // Card padding
p-4                        // Button padding
mb-6                       // Section spacing
gap-6                      // Grid spacing
```

## 🎭 Component Patterns

### Buttons

```tsx
// Primary Button (White)
<button className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
  Button Text
</button>

// Primary Button (Gradient)
<button className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl text-white font-bold shadow-lg shadow-pink-900/20 hover:scale-[1.02] transition-all">
  Button Text
</button>

// Secondary Button
<button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium transition-colors">
  Button Text
</button>

// Icon Button
<button className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
  <Icon size={16} /> Label
</button>

// Danger/Delete Button
<button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 font-medium transition-colors">
  Delete
</button>
```

### Cards

```tsx
// Standard Card
<div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-pink-500/50 transition-colors">
  {/* Card content */}
</div>

// Card with Hover Effect
<div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden group hover:border-pink-500 transition-all hover:shadow-lg hover:shadow-pink-900/20">
  {/* Card content */}
</div>

// Card with Gradient Border
<div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl">
  {/* Card content */}
</div>
```

### Navigation

```tsx
// Sidebar Navigation
<nav className="flex-1 px-4 space-y-2">
  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
    active
      ? "bg-pink-500/10 text-pink-400 border border-pink-500/50"
      : "text-slate-400 hover:bg-slate-800 hover:text-white"
  }`}>
    <Icon size={18} />
    <span className="font-medium">Label</span>
  </button>
</nav>
```

### Forms

```tsx
// Input Field
<input
  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none"
  placeholder="Placeholder text"
/>

// Textarea
<textarea
  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white h-24 resize-none focus:ring-2 focus:ring-pink-500 outline-none"
  placeholder="Placeholder text"
/>

// File Upload Area
<div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:bg-slate-800/50 transition-colors cursor-pointer">
  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
  {/* Upload UI */}
</div>
```

### Modals

```tsx
// Modal Overlay
<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl">
    <h2 className="text-xl font-bold text-white mb-4">Modal Title</h2>
    {/* Modal content */}
    <div className="flex gap-3 mt-6">
      <button className="flex-1 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium">
        Cancel
      </button>
      <button className="flex-1 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-500 font-medium">
        Confirm
      </button>
    </div>
  </div>
</div>
```

### Loading States

```tsx
// Loading Spinner
<div className="flex items-center justify-center text-pink-500">
  <Loader2 className="animate-spin" size={32} />
</div>

// Loading with Text
<div className="flex flex-col items-center text-pink-500">
  <Loader2 className="animate-spin mb-2" size={32} />
  <span className="text-xs font-mono animate-pulse">Loading...</span>
</div>

// Skeleton Loader
<div className="bg-slate-800 rounded-lg animate-pulse h-32" />
```

### Status Badges

```tsx
// Success Badge
<span className="px-2 py-1 bg-green-500/90 text-white text-[10px] font-bold rounded uppercase tracking-wider">
  READY
</span>

// Processing Badge
<span className="text-[10px] font-medium text-yellow-400 flex items-center gap-1">
  <Loader2 className="animate-spin" size={10} /> PROCESSING
</span>

// Info Badge
<span className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-400">
  Label
</span>
```

## ✨ Visual Effects

### Gradients

```css
/* Text Gradient */
bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent

/* Background Gradients */
bg-gradient-to-r from-pink-600 to-purple-600
bg-gradient-to-br from-purple-600 to-pink-600
bg-gradient-to-t from-slate-900 to-transparent

/* Radial Gradient (for backgrounds) */
bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.2),transparent_50%)]
```

### Shadows

```css
/* Card Shadows */
shadow-lg shadow-pink-900/20    // Colored shadow with pink tint
shadow-2xl                      // Large shadow for modals
shadow-sm                       // Small shadow

/* Inset Shadow */
shadow-inner                    // Inner shadow effect
```

### Borders & Dividers

```css
/* Borders */
border border-slate-700         // Default border
border border-slate-800         // Subtle border
border-r border-slate-800       // Right border (sidebar)
border-t border-slate-800       // Top border (dividers)

/* Border Radius */
rounded-lg                      // 8px - buttons, inputs
rounded-xl                      // 12px - cards
rounded-2xl                     // 16px - modals, large cards
rounded-full                    // Pills, avatars
```

### Backdrop Effects

```css
/* Glassmorphism */
bg-slate-900/50 backdrop-blur-xl    // Semi-transparent with blur
bg-black/80 backdrop-blur-sm        // Dark overlay with blur
```

### Hover Effects

```css
/* Scale on Hover */
hover:scale-[1.02]             // Subtle scale
hover:scale-105                // More noticeable scale

/* Color Transitions */
hover:bg-slate-700             // Background color change
hover:text-white               // Text color change
hover:border-pink-500          // Border color change

/* Shadow on Hover */
hover:shadow-lg hover:shadow-pink-900/20
```

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
/* Base styles apply to mobile */

md:                         // 768px and up (tablet)
lg:                         // 1024px and up (desktop)
xl:                         // 1280px and up (large desktop)

/* Examples */
hidden md:flex              // Hidden on mobile, visible on tablet+
flex md:hidden              // Visible on mobile, hidden on tablet+
grid-cols-1 md:grid-cols-3  // 1 column mobile, 3 tablet+
```

### Common Responsive Patterns

```tsx
// Responsive Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Items */}
</div>

// Responsive Sidebar
<div className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col h-full">
  {/* Sidebar content */}
</div>

// Responsive Padding
<div className="p-4 md:p-6 lg:p-8">
  {/* Content */}
</div>

// Responsive Text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Title
</h1>
```

## 🎬 Animations & Transitions

### Transition Classes

```css
/* Standard Transitions */
transition-colors            // Color changes
transition-all              // All properties
transition-transform        // Transform only

/* Duration (default is 150ms) */
duration-300                // 300ms
duration-500                // 500ms

/* Easing */
ease-in-out                 // Smooth easing
ease-out                    // Fast start, slow end
```

### Animation Classes

```css
/* Spinning */
animate-spin                // Continuous rotation

/* Pulsing */
animate-pulse               // Fade in/out pulse

/* Fade In */
animate-fade-in             // Custom fade (if defined)

/* Slide */
translate-y-full            // Hidden below
group-hover:translate-y-0   // Reveal on hover
```

## 🎯 Aspect Ratios

```css
/* Common Aspect Ratios */
aspect-square               // 1:1
aspect-video                // 16:9
aspect-[9/16]               // 9:16 (Instagram Reel)
aspect-[4/3]                // 4:3
```

## 🔤 Icon Usage

### Icon Sizes

```tsx
// Standard Sizes
<Icon size={16} />          // Small (buttons, labels)
<Icon size={18} />          // Medium (navigation)
<Icon size={20} />          // Medium-large
<Icon size={24} />          // Large (headings)
<Icon size={32} />          // Extra large (featured)
<Icon size={48} />          // Hero size
```

### Icon Colors

```tsx
// Default
<Icon className="text-slate-400" />

// Active
<Icon className="text-pink-400" />

// Hover
<Icon className="text-slate-400 hover:text-white" />

// Inverted (for colored backgrounds)
<Icon className="text-white" />
```

## 📋 Common Patterns

### Empty States

```tsx
<div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
  <Icon size={48} className="mb-4 opacity-20" />
  <p>No items yet</p>
</div>
```

### Error States

```tsx
<div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-400">
  <p className="font-medium">Error message</p>
</div>
```

### Success States

```tsx
<div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 text-green-400">
  <p className="font-medium">Success message</p>
</div>
```

### Progress Indicators

```tsx
// Progress Bar
<div className="w-full bg-slate-800 rounded-full h-2">
  <div className="bg-pink-500 h-2 rounded-full" style={{ width: '60%' }} />
</div>

// Progress with Percentage
<div className="flex items-center gap-3 bg-slate-900 p-3 rounded-lg border border-slate-800">
  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
  <span className="text-sm font-medium text-slate-300">
    Est. Time: <span className="text-white font-bold">~45s</span>
  </span>
</div>
```

## 🎨 Component Composition Examples

### Hero Section

```tsx
<div className="bg-gradient-to-r from-pink-900/50 to-slate-900 border border-pink-500/30 rounded-2xl p-8 mb-8 flex items-center justify-between relative overflow-hidden">
  <div className="relative z-10">
    <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
    <p className="text-pink-200">Description text</p>
  </div>
  <button className="px-6 py-3 bg-white text-pink-900 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-white/10 relative z-10">
    Action
  </button>
  <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-pink-600/20 to-transparent" />
</div>
```

### Data Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {items.map((item) => (
    <div key={item.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden group hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-900/20">
      {/* Item content */}
    </div>
  ))}
</div>
```

### Form Layout

```tsx
<form className="space-y-4">
  <div>
    <label className="block text-sm text-slate-400 mb-1">Label</label>
    <input
      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none"
      placeholder="Placeholder"
    />
  </div>
  <div className="flex gap-3 mt-6">
    <button
      type="button"
      className="flex-1 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="flex-1 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-500 font-medium"
    >
      Submit
    </button>
  </div>
</form>
```

## 🚀 Quick Reference

### Color Palette Quick Access

```typescript
// Backgrounds
bg-slate-950    // Main background
bg-slate-900    // Cards, panels
bg-slate-800    // Elevated surfaces

// Text
text-white      // Primary
text-slate-200  // Secondary
text-slate-400  // Tertiary

// Accents
text-pink-400   // Active
bg-pink-500     // Buttons
from-pink-500 to-purple-500  // Gradients
```

### Spacing Scale

```
2 = 0.5rem (8px)
3 = 0.75rem (12px)
4 = 1rem (16px)
6 = 1.5rem (24px)
8 = 2rem (32px)
```

### Border Radius Scale

```
lg = 0.5rem (8px)
xl = 0.75rem (12px)
2xl = 1rem (16px)
full = 9999px (pills)
```

## 📝 Implementation Checklist

When creating new components, ensure:

- [ ] Uses slate color palette for backgrounds
- [ ] Includes hover states with transitions
- [ ] Has proper spacing (p-4, p-6, gap-6)
- [ ] Uses rounded corners (rounded-xl, rounded-2xl)
- [ ] Includes border styling (border-slate-700)
- [ ] Has responsive breakpoints (md:, lg:)
- [ ] Uses pink/purple gradients for accents
- [ ] Includes loading/empty states
- [ ] Has proper text hierarchy
- [ ] Includes smooth transitions

## 🎯 Design Tokens Reference

All design tokens are centralized in:
- `src/common/theme/colors.ts` - Color palette
- `src/common/theme/borderRadius.ts` - Border radius values
- `src/common/theme/boxShadows.ts` - Shadow definitions
- `src/common/theme/linearGradient.ts` - Gradient definitions

**Always import from these files rather than hardcoding values.**

---

**Note**: This design system is optimized for dark mode. For light mode adaptations, invert the color scheme (slate-50 for backgrounds, slate-900 for text, etc.).

