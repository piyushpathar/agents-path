# 🛠️ Agent Development Guidelines

## 1. Project Structure

- **Folder organization (canonical)**

  - `src/app/` → App Router pages (SSR by default), layouts, errors.
  - `src/common/components/` → Global reusable components.
  - `src/common/ui/` → Global shared UI primitives.
  - `src/common/constants/` → Static texts, placeholders, layout sizes.
  - `src/common/enums/` → State values, roles, categories.
  - `src/common/interfaces/` → TypeScript interfaces.
  - `src/common/fetchers/` → API/data fetching helpers.
  - `src/common/server-actions/` → Server Actions (mutations, form handlers, sensitive ops).
  - `src/common/theme/` → Design tokens (`theme.css`, `colors.ts`, `borderRadius.ts`, `boxShadows.ts`, `linearGradient.ts`, `fonts/`).
  - `src/common/lib/` → Shared libs (Accordion, Toaster, Shimmer, RHF inputs, etc.).
  - `src/custom-hooks/` → Custom hooks.
  - `src/main/` → Feature domains (e.g., `properties/`, `sellers/`, `users/`, etc.).
  - `src/routes/` → Route maps, permissions, API route helpers.

- **Rules**
  - All **pages are server-rendered by default**.
  - Client-side interaction must be in `"use client"` components only.
  - **Server Actions live in `src/common/server-actions/`**. Do not define actions inside pages/components. Feature-scoped API handlers may live under `src/main/<feature>/api/` when needed.
  - No inline hardcoding → import from `src/common/constants/` or `src/common/enums/`.
  - Pages only **compose UI** → no business logic inside.

---

## 2. Styling & Theming

- **Tailwind CSS** for utilities.
- **Extended theming system (in `src/common/theme/`):**
  - `theme.css` → typography utilities, spacing tokens, responsive helpers.
  - `colors.ts` → central color tokens (**no hex codes** in components).
  - `borderRadius.ts` → border-radius tokens.
  - `boxShadows.ts` → shadow tokens.
  - `linearGradient.ts` → gradient tokens.
  - `fonts/` → font configuration.

✅ Typography, colors, spacing, radius, and shadows must be **consistent across all components**.

---

## 3. Code Quality

- **Strict TypeScript** — `any` is forbidden.
- Interfaces → only in `src/common/interfaces/`.
- **use optional chaining (`?.`) in code you provide where it necessary do not overuse it.**
- Components must be **small, atomic, and reusable**.
- Business logic → `src/custom-hooks/` and domain services under `src/main/`.
- Data fetching helpers → `src/common/fetchers/`.
- Mutations / sensitive actions → `src/common/server-actions/`.
- **Server-first mindset**:
  - Pages = SSR by default.
  - Client code = `"use client"` only when required.
- **Production-ready, optimized, and minimal comments**.

---

## 4. Constants & Enums

- `src/common/constants/` → static texts, placeholders, labels, layouts.
- `src/common/enums/` → statuses, roles, categories.
- ❌ Zero hardcoding in UI, hooks, services, or actions.

---

## 5. Pages & Components

- `page.tsx` = **server-rendered composition only**.
- Client interactivity = `"use client"` components.
- Business logic → `src/custom-hooks/` and domain modules in `src/main/`.
- Data fetching → `src/common/fetchers/` or domain services in `src/main/`.
- Server actions → `src/common/server-actions/`.
- Components → minimal, reusable, and typed.
- Global/shared UI → `src/common/ui/` and `src/common/components/`. Domain-specific UI can live under `src/main/<feature>/`.

---

## 6. UI/UX Standards

- Typography → only from `src/common/theme/theme.css`.
- Hooks → only from `src/custom-hooks/`.
- Colors → only from `src/common/theme/colors.ts`.
- Border radius → only from `src/common/theme/borderRadius.ts`.
- Shadows → only from `src/common/theme/boxShadows.ts`.
- Gradients → only from `src/common/theme/linearGradient.ts`.

### UI Design System

**📚 Complete UI Documentation:**
- **`UI_DESIGN_SYSTEM.md`** → Comprehensive design system guide with all patterns, components, colors, and examples
- **`UI_QUICK_REFERENCE.md`** → Quick cheat sheet for common UI patterns

**Key UI Principles:**
- Dark-first design with slate-950/900 backgrounds
- Pink-to-purple gradient accents for branding
- Glassmorphism effects (backdrop-blur) on modals
- Smooth transitions on all interactive elements
- Card-based layouts with rounded corners (rounded-xl, rounded-2xl)
- Consistent spacing scale (p-4, p-6, gap-6)
- Responsive breakpoints (md:, lg:)

**When creating UI components:**
1. Reference `UI_DESIGN_SYSTEM.md` for complete patterns
2. Use `UI_QUICK_REFERENCE.md` for quick copy-paste templates
3. Always use theme tokens from `src/common/theme/`
4. Follow the color palette (slate backgrounds, pink/purple accents)
5. Include hover states and transitions
6. Make components responsive (mobile-first)

---

⚡ **Server-rendered. Minimal. Modular. Typesafe. Themed. Always production-ready.**  
❌ No `any`. No inline hacks. No extra comments. No hardcoding.
