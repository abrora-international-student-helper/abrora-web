import { create } from 'zustand'
import type {
  UserChecklist,
  ChecklistItem,
  ChecklistTemplate,
  ChecklistFilter,
  ChecklistProgress,
  PriorityLevel,
  ChecklistCategory,
  ChecklistStatus,
} from '@/types/checklist'

interface SummaryStats {
  allCount: number
  todayCount: number
  completedCount: number
  highPriorityCount: number
}

interface ChecklistState {
  // Data
  checklists: UserChecklist[]
  templates: ChecklistTemplate[]

  // UI State
  isLoading: boolean
  error: string | null
  filter: ChecklistFilter
  expandedIds: Set<string>
  selectedChecklistId: string | null

  // Dialogs
  isCreateDialogOpen: boolean
  isTemplateGalleryOpen: boolean
  isItemEditorOpen: boolean
  editingItem: { checklistId: string; item: ChecklistItem | null; parentId: string | null } | null
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
  setSelectedChecklist: (id: string | null) => void

  // Actions - Dialogs
  openCreateDialog: () => void
  closeCreateDialog: () => void
  openTemplateGallery: () => void
  closeTemplateGallery: () => void
  openItemEditor: (checklistId: string, item?: ChecklistItem, parentId?: string) => void
  closeItemEditor: () => void
  setEditingChecklist: (checklist: UserChecklist | null) => void

  // Computed
  getFilteredChecklists: () => UserChecklist[]
  getOverallProgress: () => ChecklistProgress
  getChecklistProgress: (checklistId: string) => ChecklistProgress
  getSelectedChecklist: () => UserChecklist | null
  getSummaryStats: () => SummaryStats
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
  selectedChecklistId: null,

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
        selectedChecklistId: state.selectedChecklistId === id ? null : state.selectedChecklistId,
      }
    }),

  // Item actions
  toggleItem: (checklistId, itemId) =>
    set((state) => {
      const checklist = state.checklists.find((c) => c.id === checklistId)
      if (!checklist) return state

      const item = checklist.items.find((i) => i.id === itemId)
      if (!item) return state

      const newCompletedState = !item.is_completed
      const completedAt = newCompletedState ? new Date().toISOString() : null

      // Helper to get all descendant IDs recursively
      const getAllDescendantIds = (parentId: string): string[] => {
        const children = checklist.items.filter((i) => i.parent_id === parentId)
        const descendantIds: string[] = []
        children.forEach((child) => {
          descendantIds.push(child.id)
          descendantIds.push(...getAllDescendantIds(child.id))
        })
        return descendantIds
      }

      // If marking as completed, also mark all children
      const idsToToggle = newCompletedState
        ? [itemId, ...getAllDescendantIds(itemId)]
        : [itemId]

      return {
        checklists: state.checklists.map((c) =>
          c.id === checklistId
            ? {
                ...c,
                items: c.items.map((i) =>
                  idsToToggle.includes(i.id)
                    ? {
                        ...i,
                        is_completed: newCompletedState,
                        completed_at: completedAt,
                      }
                    : i
                ),
              }
            : c
        ),
      }
    }),

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

  setSelectedChecklist: (id) => set({ selectedChecklistId: id }),

  // Dialog actions
  openCreateDialog: () => set({ isCreateDialogOpen: true }),
  closeCreateDialog: () =>
    set({ isCreateDialogOpen: false, editingChecklist: null }),

  openTemplateGallery: () => set({ isTemplateGalleryOpen: true }),
  closeTemplateGallery: () => set({ isTemplateGalleryOpen: false }),

  openItemEditor: (checklistId, item, parentId) =>
    set({
      isItemEditorOpen: true,
      editingItem: { checklistId, item: item || null, parentId: parentId || null },
    }),

  closeItemEditor: () => set({ isItemEditorOpen: false, editingItem: null }),

  setEditingChecklist: (checklist) => set({ editingChecklist: checklist }),

  // Computed values
  getFilteredChecklists: () => {
    const { checklists, filter } = get()

    return checklists.filter((checklist) => {
      // Status filter
      if (filter.status !== 'all') {
        const allCompleted = checklist.items.every((i) => i.is_completed)
        const hasIncomplete = checklist.items.some((i) => !i.is_completed)

        if (filter.status === 'completed' && !allCompleted) return false
        if (filter.status === 'not_started' && !hasIncomplete) return false
        if (filter.status === 'in_progress') {
          const someCompleted = checklist.items.some((i) => i.is_completed)
          if (!someCompleted || allCompleted) return false
        }
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
          (item) => item.priority === filter.priority && !item.is_completed
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
      (sum, c) => sum + c.items.filter((i) => i.is_completed).length,
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
    const completed = checklist.items.filter((i) => i.is_completed).length

    return {
      total,
      completed,
      percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
    }
  },

  getSelectedChecklist: () => {
    const { checklists, selectedChecklistId } = get()
    if (!selectedChecklistId) return null
    return checklists.find((c) => c.id === selectedChecklistId) || null
  },

  getSummaryStats: () => {
    const { checklists } = get()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    let allCount = 0
    let todayCount = 0
    let completedCount = 0
    let highPriorityCount = 0

    checklists.forEach((checklist) => {
      checklist.items.forEach((item) => {
        allCount++

        if (item.is_completed) {
          completedCount++
        } else {
          // Check if due today
          if (item.due_date) {
            const dueDate = new Date(item.due_date)
            dueDate.setHours(0, 0, 0, 0)
            if (dueDate.getTime() === today.getTime()) {
              todayCount++
            }
          }

          // Check if high priority
          if (item.priority === 'high' || item.priority === 'critical') {
            highPriorityCount++
          }
        }
      })
    })

    return { allCount, todayCount, completedCount, highPriorityCount }
  },
}))
