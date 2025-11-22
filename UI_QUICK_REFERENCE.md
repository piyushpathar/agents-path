# UI Quick Reference - Agent Cheat Sheet

Quick reference for implementing this UI design system in other projects.

## 🎨 Color Palette

```css
/* Backgrounds */
bg-slate-950    /* Main (#0f172a) */
bg-slate-900    /* Cards (#0f172a) */
bg-slate-800    /* Elevated (#1e293b) */

/* Text */
text-white      /* Primary */
text-slate-200  /* Secondary */
text-slate-400  /* Tertiary */
text-slate-500  /* Muted */

/* Accents */
text-pink-400   /* Active */
bg-pink-500     /* Buttons */
bg-pink-600     /* Hover */

/* Gradients */
from-pink-500 to-purple-500
from-pink-600 to-purple-600
```

## 🧩 Component Templates

### Button (Primary)
```tsx
<button className="px-6 py-3 bg-white text-slate-900 rounded-lg font-bold hover:scale-105 transition-transform">
  Button
</button>
```

### Button (Gradient)
```tsx
<button className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl text-white font-bold hover:scale-[1.02] transition-all">
  Button
</button>
```

### Card
```tsx
<div className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-pink-500/50 transition-colors">
  Content
</div>
```

### Input
```tsx
<input className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none" />
```

### Modal
```tsx
<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl max-w-md w-full">
    Content
  </div>
</div>
```

### Navigation Item
```tsx
<button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
  active ? "bg-pink-500/10 text-pink-400 border border-pink-500/50" 
         : "text-slate-400 hover:bg-slate-800 hover:text-white"
}`}>
  <Icon size={18} />
  <span>Label</span>
</button>
```

## 📐 Layout Patterns

### Main Container
```tsx
<div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
  <Sidebar />
  <main className="flex-1 flex flex-col overflow-hidden">
    <Header />
    <div className="flex-1 overflow-y-auto p-6">
      Content
    </div>
  </main>
</div>
```

### Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Hero Section
```tsx
<div className="bg-gradient-to-r from-pink-900/50 to-slate-900 border border-pink-500/30 rounded-2xl p-8 mb-8">
  <h2 className="text-3xl font-bold text-white mb-2">Title</h2>
  <p className="text-pink-200">Description</p>
</div>
```

## ✨ Effects

```css
/* Gradient Text */
bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent

/* Glassmorphism */
bg-slate-900/50 backdrop-blur-xl

/* Hover Scale */
hover:scale-[1.02] transition-all

/* Colored Shadow */
shadow-lg shadow-pink-900/20
```

## 📏 Spacing

```
p-4, p-6, p-8     /* Padding */
gap-4, gap-6      /* Gaps */
mb-4, mb-6, mb-8  /* Margins */
```

## 🎯 Common Classes

```css
rounded-xl        /* Cards */
rounded-2xl       /* Modals */
border-slate-700  /* Borders */
transition-all    /* Smooth transitions */
hover:border-pink-500/50  /* Hover borders */
```

## 🚀 Copy-Paste Ready

**Full Page Template:**
```tsx
<div className="min-h-screen bg-slate-950 text-slate-200">
  <div className="max-w-6xl mx-auto p-6">
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Title</h1>
      <p className="text-slate-400 mb-6">Description</p>
      <button className="px-6 py-3 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-500 transition-colors">
        Action
      </button>
    </div>
  </div>
</div>
```

---

**See `UI_DESIGN_SYSTEM.md` for complete documentation.**

