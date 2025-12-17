import { create } from 'zustand'
import type { TodoItem } from './todo.types'

const API_BASE = 'https://dummyjson.com'

type TodoState = {
  items: TodoItem[]
  isLoading: boolean
  error: string | null

  currentPage: number
  limitPerPage: number
  totalTodos: number
  searchTerm: string

  // derived helpers
  visibleItems: () => TodoItem[]
  canPrev: () => boolean
  canNext: () => boolean

  fetchPage: () => Promise<void>
  setLimit: (limit: number) => void
  goToNextPage: () => void
  goToPrevPage: () => void
  setSearchTerm: (term: string) => void

  addTodo: (text: string) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
  toggleTodo: (id: number, completed: boolean) => Promise<void>
  editTodoTitle: (id: number, text: string) => Promise<void>
}

function normalize(raw: any): TodoItem {
  return {
    id: Number(raw.id),
    text: String(raw.todo ?? raw.text ?? ''),
    completed: Boolean(raw.completed),
  }
}

export const useTodoStore = create<TodoState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  currentPage: 1,
  limitPerPage: 10,
  totalTodos: 0,
  searchTerm: '',

  visibleItems: () => {
    const term = get().searchTerm.trim().toLowerCase()
    if (!term) return get().items
    return get().items.filter((t) => t.text.toLowerCase().includes(term))
  },

  canPrev: () => get().currentPage > 1,
  canNext: () => get().currentPage * get().limitPerPage < get().totalTodos,

  fetchPage: async () => {
    const { currentPage, limitPerPage } = get()
    const skip = (currentPage - 1) * limitPerPage

    set({ isLoading: true, error: null })
    try {
      const res = await fetch(`${API_BASE}/todos?limit=${limitPerPage}&skip=${skip}`)
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
      const data = await res.json()
      const normalized: TodoItem[] = (data.todos || []).map(normalize)
      set({
        items: normalized,
        totalTodos: typeof data.total === 'number' ? data.total : normalized.length,
      })
    } catch (e: any) {
      set({ error: e?.message ?? String(e) })
    } finally {
      set({ isLoading: false })
    }
  },

  setLimit: (limit) => {
    set({ limitPerPage: limit, currentPage: 1 })
    void get().fetchPage()
  },

  goToNextPage: () => {
    const { currentPage, limitPerPage, totalTodos } = get()
    const maxPage = Math.max(1, Math.ceil(totalTodos / limitPerPage))
    set({ currentPage: Math.min(maxPage, currentPage + 1) })
    void get().fetchPage()
  },

  goToPrevPage: () => {
    const { currentPage } = get()
    set({ currentPage: Math.max(1, currentPage - 1) })
    void get().fetchPage()
  },

  setSearchTerm: (term) => set({ searchTerm: term }),

  addTodo: async (text) => {
    const t = text.trim()
    if (!t) return
    set({ isLoading: true, error: null })
    try {
      const payload = { todo: t, completed: false, userId: 1 }
      const res = await fetch(`${API_BASE}/todos/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Add failed: ${res.status}`)
      const data = await res.json()
      const newItem: TodoItem = normalize(data)

      // prepend locally to current page
      set((s) => ({ items: [newItem, ...s.items], totalTodos: s.totalTodos + 1 }))
    } catch (e: any) {
      set({ error: e?.message ?? String(e) })
    } finally {
      set({ isLoading: false })
    }
  },

  deleteTodo: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const res = await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`)
      set((s) => ({
        items: s.items.filter((t) => t.id !== id),
        totalTodos: Math.max(0, s.totalTodos - 1),
      }))
    } catch (e: any) {
      set({ error: e?.message ?? String(e) })
    } finally {
      set({ isLoading: false })
    }
  },

  toggleTodo: async (id, completed) => {
    const prev = get().items
    set((s) => ({
      items: s.items.map((t) => (t.id === id ? { ...t, completed } : t)),
      error: null,
    }))

    try {
      const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      })
      if (!res.ok) throw new Error(`Update failed: ${res.status}`)
      const data = await res.json()
      const updated = normalize({ ...data, id, completed })
      set((s) => ({ items: s.items.map((t) => (t.id === id ? { ...t, ...updated } : t)) }))
    } catch (e: any) {
      set({ items: prev, error: e?.message ?? String(e) })
    }
  },

  editTodoTitle: async (id, text) => {
    const t = text.trim()
    if (!t) {
      set({ error: 'Title is empty' })
      return
    }
    set({ isLoading: true, error: null })
    try {
      const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: t }),
      })
      if (!res.ok) throw new Error(`Edit failed: ${res.status}`)
      const data = await res.json()
      const updated = normalize({ ...data, id, todo: t })
      set((s) => ({ items: s.items.map((x) => (x.id === id ? { ...x, ...updated } : x)) }))
    } catch (e: any) {
      set({ error: e?.message ?? String(e) })
    } finally {
      set({ isLoading: false })
    }
  },
}))
