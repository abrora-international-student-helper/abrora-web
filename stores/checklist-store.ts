import { create } from 'zustand'
import type {
  UserChecklist,
  ChecklistItem,
  ChecklistTemplate,
  ChecklistFilter,
  ChecklistProgress,
  Priority,
  TemplateCategory,
} from '@/types/checklist'

interface ChecklistState {
  // Data
  checklists: UserChecklist[]
  templates: ChecklistTemplate[]

  // UI State
  isLoading: boolean
  error: string | null
  filter: ChecklistFilter
  expandedIds: Set<string>

  // Dialogs
  isCreateDialogOpen: boolean
  isTemplateGalleryOpen: boolean
  isItemEditorOpen: boolean
  editingItem: { checklistId: string; item: ChecklistItem | null } | null
  editingChecklist: UserChecklist | null

  // Actions - Data
  setChecklists: (checklists: UserChecklist[]) => void
  addChecklist: (checklist: UserChecklist) => void
  updateChecklist: (id: string, updates: Partial<UserChecklist>) => void
  deleteChecklist: (id: string) => void

  // Actions - Items
  toggleItem: (checklistId: string, itemId: string) => void
  addItem: (checklistId: string, item: ChecklistItem) => void
  updateItem: (checklistId: string, itemId: string, updates: Partial<ChecklistItem>) => void
  deleteItem: (checklistId: string, itemId: string) => void
  reorderItems: (checklistId: string, items: ChecklistItem[]) => void

  // Actions - Templates
  setTemplates: (templates: ChecklistTemplate[]) => void

  // Actions - UI
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilter: (filter: Partial<ChecklistFilter>) => void
  toggleExpanded: (id: string) => void
  expandAll: () => void
  collapseAll: () => void

  // Actions - Dialogs
  openCreateDialog: () => void
  closeCreateDialog: () => void
  openTemplateGallery: () => void
  closeTemplateGallery: () => void
  openItemEditor: (checklistId: string, item?: ChecklistItem) => void
  closeItemEditor: () => void
  setEditingChecklist: (checklist: UserChecklist | null) => void

  // Computed
  getFilteredChecklists: () => UserChecklist[]
  getOverallProgress: () => ChecklistProgress
  getChecklistProgress: (checklistId: string) => ChecklistProgress
}

const defaultFilter: ChecklistFilter = {
  status: 'all',
  priority: 'all',
  search: '',
  category: 'all',
}

export const useChecklistStore = create<ChecklistState>((set, get) => ({
  // Initial state
  checklists: [],
  templates: [],
  isLoading: false,
  error: null,
  filter: defaultFilter,
  expandedIds: new Set<string>(),

  // Dialog state
  isCreateDialogOpen: false,
  isTemplateGalleryOpen: false,
  isItemEditorOpen: false,
  editingItem: null,
  editingChecklist: null,

  // Data actions
  setChecklists: (checklists) => set({ checklists }),

  addChecklist: (checklist) =>
    set((state) => ({
      checklists: [...state.checklists, checklist],
      expandedIds: new Set([...state.expandedIds, checklist.id]),
    })),

  updateChecklist: (id, updates) =>
    set((state) => ({
      checklists: state.checklists.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),

  deleteChecklist: (id) =>
    set((state) => {
      const newExpandedIds = new Set(state.expandedIds)
      newExpandedIds.delete(id)
      return {
        checklists: state.checklists.filter((c) => c.id !== id),
        expandedIds: newExpandedIds,
      }
    }),

  // Item actions
  toggleItem: (checklistId, itemId) =>
    set((state) => ({
      checklists: state.checklists.map((checklist) =>
        checklist.id === checklistId
          ? {
              ...checklist,
              items: checklist.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      completed: !item.completed,
                      completed_at: !item.completed
                        ? new Date().toISOString()
                        : null,
                    }
                  : item
              ),
            }
          : checklist
      ),
    })),

  addItem: (checklistId, item) =>
    set((state) => ({
      checklists: state.checklists.map((checklist) =>
        checklist.id === checklistId
          ? { ...checklist, items: [...checklist.items, item] }
          : checklist
      ),
    })),

  updateItem: (checklistId, itemId, updates) =>
    set((state) => ({
      checklists: state.checklists.map((checklist) =>
        checklist.id === checklistId
          ? {
              ...checklist,
              items: checklist.items.map((item) =>
                item.id === itemId ? { ...item, ...updates } : item
              ),
            }
          : checklist
      ),
    })),

  deleteItem: (checklistId, itemId) =>
    set((state) => ({
      checklists: state.checklists.map((checklist) =>
        checklist.id === checklistId
          ? {
              ...checklist,
              items: checklist.items.filter((item) => item.id !== itemId),
            }
          : checklist
      ),
    })),

  reorderItems: (checklistId, items) =>
    set((state) => ({
      checklists: state.checklists.map((checklist) =>
        checklist.id === checklistId ? { ...checklist, items } : checklist
      ),
    })),

  // Template actions
  setTemplates: (templates) => set({ templates }),

  // UI actions
  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setFilter: (filterUpdates) =>
    set((state) => ({
      filter: { ...state.filter, ...filterUpdates },
    })),

  toggleExpanded: (id) =>
    set((state) => {
      const newExpandedIds = new Set(state.expandedIds)
      if (newExpandedIds.has(id)) {
        newExpandedIds.delete(id)
      } else {
        newExpandedIds.add(id)
      }
      return { expandedIds: newExpandedIds }
    }),

  expandAll: () =>
    set((state) => ({
      expandedIds: new Set(state.checklists.map((c) => c.id)),
    })),

  collapseAll: () => set({ expandedIds: new Set() }),

  // Dialog actions
  openCreateDialog: () => set({ isCreateDialogOpen: true }),
  closeCreateDialog: () =>
    set({ isCreateDialogOpen: false, editingChecklist: null }),

  openTemplateGallery: () => set({ isTemplateGalleryOpen: true }),
  closeTemplateGallery: () => set({ isTemplateGalleryOpen: false }),

  openItemEditor: (checklistId, item) =>
    set({
      isItemEditorOpen: true,
      editingItem: { checklistId, item: item || null },
    }),

  closeItemEditor: () => set({ isItemEditorOpen: false, editingItem: null }),

  setEditingChecklist: (checklist) => set({ editingChecklist: checklist }),

  // Computed values
  getFilteredChecklists: () => {
    const { checklists, filter } = get()

    return checklists.filter((checklist) => {
      // Status filter
      if (filter.status !== 'all') {
        const allCompleted = checklist.items.every((i) => i.completed)
        const hasIncomplete = checklist.items.some((i) => !i.completed)

        if (filter.status === 'completed' && !allCompleted) return false
        if (filter.status === 'active' && !hasIncomplete) return false
      }

      // Category filter
      if (filter.category !== 'all' && checklist.category !== filter.category) {
        return false
      }

      // Search filter
      if (filter.search) {
        const searchLower = filter.search.toLowerCase()
        const matchesTitle = checklist.title.toLowerCase().includes(searchLower)
        const matchesItems = checklist.items.some((item) =>
          item.title.toLowerCase().includes(searchLower)
        )
        if (!matchesTitle && !matchesItems) return false
      }

      // Priority filter - checks if any item matches
      if (filter.priority !== 'all') {
        const hasMatchingPriority = checklist.items.some(
          (item) => item.priority === filter.priority && !item.completed
        )
        if (!hasMatchingPriority) return false
      }

      return true
    })
  },

  getOverallProgress: () => {
    const { checklists } = get()

    const total = checklists.reduce((sum, c) => sum + c.items.length, 0)
    const completed = checklists.reduce(
      (sum, c) => sum + c.items.filter((i) => i.completed).length,
      0
    )

    return {
      total,
      completed,
      percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
    }
  },

  getChecklistProgress: (checklistId) => {
    const checklist = get().checklists.find((c) => c.id === checklistId)

    if (!checklist) {
      return { total: 0, completed: 0, percentage: 0 }
    }

    const total = checklist.items.length
    const completed = checklist.items.filter((i) => i.completed).length

    return {
      total,
      completed,
      percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
    }
  },
}))
