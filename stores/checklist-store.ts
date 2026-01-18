// TODO: Checklist progress state management
// - Checklist items
// - Completion tracking
// - Custom task addition

import { create } from 'zustand'

interface ChecklistItem {
  id: string
  title: string
  description?: string
  category: 'pre-arrival' | 'first-week' | 'first-month'
  completed: boolean
  isCustom?: boolean
}

interface ChecklistState {
  items: ChecklistItem[]
  toggleItem: (id: string) => void
  addCustomItem: (item: Omit<ChecklistItem, 'id' | 'completed' | 'isCustom'>) => void
  removeItem: (id: string) => void
  setItems: (items: ChecklistItem[]) => void
  getProgress: (category: string) => number
}

export const useChecklistStore = create<ChecklistState>((set, get) => ({
  items: [],
  toggleItem: (id) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    )
  })),
  addCustomItem: (item) => set((state) => ({
    items: [...state.items, { ...item, id: crypto.randomUUID(), completed: false, isCustom: true }]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  setItems: (items) => set({ items }),
  getProgress: (category) => {
    const items = get().items.filter(item => item.category === category)
    if (items.length === 0) return 0
    return (items.filter(item => item.completed).length / items.length) * 100
  },
}))
