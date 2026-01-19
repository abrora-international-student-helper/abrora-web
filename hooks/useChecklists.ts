'use client'

import { useEffect, useCallback } from 'react'
import { useChecklistStore } from '@/stores/checklist-store'
import {
  fetchUserChecklists,
  createChecklist,
  updateChecklist as updateChecklistApi,
  deleteChecklist as deleteChecklistApi,
  createItem,
  updateItem as updateItemApi,
  deleteItem as deleteItemApi,
  toggleItem as toggleItemApi,
  reorderItems as reorderItemsApi,
  copyTemplateToUser,
} from '@/lib/supabase/queries/checklist'
import type {
  CreateChecklistInput,
  UpdateChecklistInput,
  CreateItemInput,
  UpdateItemInput,
  ChecklistItem,
} from '@/types/checklist'

// Mock user ID - in production, get from auth context
const MOCK_USER_ID = '00000000-0000-0000-0000-000000000001'

export function useChecklists() {
  const store = useChecklistStore()

  // Fetch checklists on mount
  useEffect(() => {
    const loadChecklists = async () => {
      store.setLoading(true)
      store.setError(null)

      try {
        const checklists = await fetchUserChecklists(MOCK_USER_ID)
        store.setChecklists(checklists)

        // Auto-expand the first checklist
        if (checklists.length > 0 && store.expandedIds.size === 0) {
          store.toggleExpanded(checklists[0].id)
        }
      } catch (error) {
        console.error('Failed to load checklists:', error)
        store.setError('Failed to load checklists. Please try again.')
      } finally {
        store.setLoading(false)
      }
    }

    loadChecklists()
  }, [])

  // Create checklist with optimistic update
  const handleCreateChecklist = useCallback(
    async (input: CreateChecklistInput) => {
      try {
        const checklist = await createChecklist(MOCK_USER_ID, input)
        store.addChecklist(checklist)
        store.closeCreateDialog()
        return checklist
      } catch (error) {
        console.error('Failed to create checklist:', error)
        store.setError('Failed to create checklist. Please try again.')
        throw error
      }
    },
    []
  )

  // Update checklist with optimistic update
  const handleUpdateChecklist = useCallback(
    async (id: string, input: UpdateChecklistInput) => {
      // Store previous state for rollback
      const previousChecklist = store.checklists.find((c) => c.id === id)

      // Optimistic update
      store.updateChecklist(id, input)

      try {
        await updateChecklistApi(id, input)
        store.closeCreateDialog()
      } catch (error) {
        // Rollback on error
        if (previousChecklist) {
          store.updateChecklist(id, previousChecklist)
        }
        console.error('Failed to update checklist:', error)
        store.setError('Failed to update checklist. Please try again.')
        throw error
      }
    },
    [store.checklists]
  )

  // Delete checklist with optimistic update
  const handleDeleteChecklist = useCallback(
    async (id: string) => {
      // Store for rollback
      const previousChecklists = [...store.checklists]

      // Optimistic update
      store.deleteChecklist(id)

      try {
        await deleteChecklistApi(id)
      } catch (error) {
        // Rollback on error
        store.setChecklists(previousChecklists)
        console.error('Failed to delete checklist:', error)
        store.setError('Failed to delete checklist. Please try again.')
        throw error
      }
    },
    [store.checklists]
  )

  // Toggle item with optimistic update
  const handleToggleItem = useCallback(
    async (checklistId: string, itemId: string) => {
      const checklist = store.checklists.find((c) => c.id === checklistId)
      const item = checklist?.items.find((i) => i.id === itemId)

      if (!item) return

      // Optimistic update
      store.toggleItem(checklistId, itemId)

      try {
        await toggleItemApi(itemId, !item.completed)
      } catch (error) {
        // Rollback on error
        store.toggleItem(checklistId, itemId)
        console.error('Failed to toggle item:', error)
        store.setError('Failed to update item. Please try again.')
        throw error
      }
    },
    [store.checklists]
  )

  // Create item with optimistic update
  const handleCreateItem = useCallback(
    async (input: CreateItemInput) => {
      try {
        const item = await createItem(input)
        store.addItem(input.checklist_id, item)
        store.closeItemEditor()
        return item
      } catch (error) {
        console.error('Failed to create item:', error)
        store.setError('Failed to create item. Please try again.')
        throw error
      }
    },
    []
  )

  // Update item with optimistic update
  const handleUpdateItem = useCallback(
    async (checklistId: string, itemId: string, input: UpdateItemInput) => {
      const checklist = store.checklists.find((c) => c.id === checklistId)
      const previousItem = checklist?.items.find((i) => i.id === itemId)

      if (!previousItem) return

      // Optimistic update
      store.updateItem(checklistId, itemId, input)

      try {
        await updateItemApi(itemId, input)
        store.closeItemEditor()
      } catch (error) {
        // Rollback on error
        store.updateItem(checklistId, itemId, previousItem)
        console.error('Failed to update item:', error)
        store.setError('Failed to update item. Please try again.')
        throw error
      }
    },
    [store.checklists]
  )

  // Delete item with optimistic update
  const handleDeleteItem = useCallback(
    async (checklistId: string, itemId: string) => {
      const checklist = store.checklists.find((c) => c.id === checklistId)
      const previousItems = checklist?.items || []

      // Optimistic update
      store.deleteItem(checklistId, itemId)

      try {
        await deleteItemApi(itemId)
      } catch (error) {
        // Rollback on error
        store.reorderItems(checklistId, previousItems)
        console.error('Failed to delete item:', error)
        store.setError('Failed to delete item. Please try again.')
        throw error
      }
    },
    [store.checklists]
  )

  // Reorder items with optimistic update
  const handleReorderItems = useCallback(
    async (checklistId: string, items: ChecklistItem[]) => {
      const checklist = store.checklists.find((c) => c.id === checklistId)
      const previousItems = checklist?.items || []

      // Update sort_order in items
      const updatedItems = items.map((item, index) => ({
        ...item,
        sort_order: index,
      }))

      // Optimistic update
      store.reorderItems(checklistId, updatedItems)

      try {
        await reorderItemsApi(
          updatedItems.map((item) => ({ id: item.id, sort_order: item.sort_order }))
        )
      } catch (error) {
        // Rollback on error
        store.reorderItems(checklistId, previousItems)
        console.error('Failed to reorder items:', error)
        store.setError('Failed to reorder items. Please try again.')
        throw error
      }
    },
    [store.checklists]
  )

  // Add checklist from template
  const handleAddFromTemplate = useCallback(
    async (templateId: string) => {
      try {
        const checklist = await copyTemplateToUser(MOCK_USER_ID, templateId)
        store.addChecklist(checklist)
        store.closeTemplateGallery()
        return checklist
      } catch (error) {
        console.error('Failed to add from template:', error)
        store.setError('Failed to add checklist from template. Please try again.')
        throw error
      }
    },
    []
  )

  return {
    // State
    checklists: store.checklists,
    isLoading: store.isLoading,
    error: store.error,
    filter: store.filter,
    expandedIds: store.expandedIds,

    // Computed
    filteredChecklists: store.getFilteredChecklists(),
    overallProgress: store.getOverallProgress(),
    getChecklistProgress: store.getChecklistProgress,

    // Actions
    createChecklist: handleCreateChecklist,
    updateChecklist: handleUpdateChecklist,
    deleteChecklist: handleDeleteChecklist,
    toggleItem: handleToggleItem,
    createItem: handleCreateItem,
    updateItem: handleUpdateItem,
    deleteItem: handleDeleteItem,
    reorderItems: handleReorderItems,
    addFromTemplate: handleAddFromTemplate,

    // UI Actions
    setFilter: store.setFilter,
    toggleExpanded: store.toggleExpanded,
    expandAll: store.expandAll,
    collapseAll: store.collapseAll,

    // Dialog Actions
    openCreateDialog: store.openCreateDialog,
    closeCreateDialog: store.closeCreateDialog,
    openTemplateGallery: store.openTemplateGallery,
    closeTemplateGallery: store.closeTemplateGallery,
    openItemEditor: store.openItemEditor,
    closeItemEditor: store.closeItemEditor,
    setEditingChecklist: store.setEditingChecklist,

    // Dialog State
    isCreateDialogOpen: store.isCreateDialogOpen,
    isTemplateGalleryOpen: store.isTemplateGalleryOpen,
    isItemEditorOpen: store.isItemEditorOpen,
    editingItem: store.editingItem,
    editingChecklist: store.editingChecklist,
  }
}
