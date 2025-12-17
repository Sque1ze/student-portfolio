# Student Portfolio (SPA)

A single-page application created for the final project requirements.

## Stack
- React + TypeScript (Vite)
- UI components: **shadcn-style** (local `src/components/ui/*`)
- Global state: **Zustand**
- Routing: **React Router**
- Theme: **Light/Dark** using `next-themes`

## Routes
- `/` — portfolio home
- `/todo-list` — refactored Todo List (UI lib + global store)
- `/lab1`, `/lab2` — lab pages (refactor optional)

## Component (UI) tree *
```
AppRouter
└─ AppLayout
   ├─ Header (ThemeToggle)
   ├─ Sidebar (Nav)
   └─ Pages
      ├─ Home
      ├─ TodoListPage
      │  └─ TodoView
      │     ├─ Add controls (Input + Button)
      │     ├─ Search (Input)
      │     ├─ Pagination (Buttons + Select)
      │     └─ TodoItemRow (Checkbox + Buttons + Input for edit)
      └─ Lab1 / Lab2
```

## Architectural decisions *
- **Feature-based structure**: Todo logic is isolated inside `src/features/todo/*`.
- **Global store (Zustand)**: All todo data and UI state (pagination, search, loading, error) live in `useTodoStore`.
- **UI isolation**: Todo UI uses only components from `src/components/ui/*` (no raw `<input>`/`<button>` in feature files).

## Why this UI library
- `shadcn/ui`-style components are lightweight, customizable, and work great with Tailwind and dark/light themes.

## Problems encountered & solutions *
- **Todo state was local (`useState`)** → moved into a global Zustand store.
- **Need dark/light theme** → used `next-themes` with Tailwind `darkMode: ['class']`.

## Run locally
```bash
npm i
npm run dev
```

## Deploy (Vercel)
- Import repo to Vercel
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
