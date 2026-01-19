'use client'

import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Plus, LayoutGrid } from 'lucide-react'
import { useChecklists } from '@/hooks/useChecklists'
import { useChecklistStore } from '@/stores/checklist-store'
import { ChecklistSummaryCards } from './components/ChecklistSummaryCards'
import { ChecklistGrid } from './components/ChecklistGrid'
import { ChecklistItemsList } from './components/ChecklistItemsList'
import { EmptyState } from './components/EmptyState'
import { CreateChecklistDialog } from './components/CreateChecklistDialog'
import { TemplateGallery } from './components/TemplateGallery'
import { ItemEditor } from './components/ItemEditor'
import type { CreateChecklistInput, CreateItemInput, UpdateItemInput } from '@/types/checklist'

export default function ChecklistPage() {
  const {
    filteredChecklists,
    isLoading,
    error,
    getChecklistProgress,

    // Actions
    createChecklist,
    updateChecklist,
    deleteChecklist,
    toggleItem,
    createItem,
    updateItem,
    deleteItem,
    reorderItems,
    addFromTemplate,

    // Dialog Actions
    openCreateDialog,
    closeCreateDialog,
    openTemplateGallery,
    closeTemplateGallery,
    openItemEditor,
    closeItemEditor,
    setEditingChecklist,

    // Dialog State
    isCreateDialogOpen,
    isTemplateGalleryOpen,
    isItemEditorOpen,
    editingItem,
    editingChecklist,
  } = useChecklists()

  const selectedChecklistId = useChecklistStore((state) => state.selectedChecklistId)
  const setSelectedChecklist = useChecklistStore((state) => state.setSelectedChecklist)
  const getSummaryStats = useChecklistStore((state) => state.getSummaryStats)
  const getSelectedChecklist = useChecklistStore((state) => state.getSelectedChecklist)

  const summaryStats = getSummaryStats()
  const selectedChecklist = getSelectedChecklist()

  // Auto-select first checklist if none selected
  useEffect(() => {
    if (!selectedChecklistId && filteredChecklists.length > 0) {
      setSelectedChecklist(filteredChecklists[0].id)
    }
  }, [filteredChecklists, selectedChecklistId, setSelectedChecklist])

  const handleSaveChecklist = async (data: CreateChecklistInput) => {
    if (editingChecklist) {
      await updateChecklist(editingChecklist.id, data)
    } else {
      await createChecklist(data)
    }
  }

  const handleSaveItem = async (data: CreateItemInput | UpdateItemInput) => {
    if (!editingItem) return

    if (editingItem.item) {
      await updateItem(editingItem.checklistId, editingItem.item.id, data as UpdateItemInput)
    } else {
      await createItem(data as CreateItemInput)
    }
  }

  const handleEditChecklist = (checklist: typeof editingChecklist) => {
    setEditingChecklist(checklist)
    openCreateDialog()
  }

  const handleSelectChecklist = (id: string) => {
    setSelectedChecklist(id === selectedChecklistId ? null : id)
  }

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />
        </div>
        {/* Summary cards skeleton */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="text-center py-16">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">My Checklists</h1>
          <p className="text-gray-500 mt-1 text-sm">Track your journey from home to campus</p>
        </div>

        {filteredChecklists.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={openTemplateGallery}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Templates</span>
            </button>
            <button
              onClick={openCreateDialog}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New List</span>
            </button>
          </div>
        )}
      </div>

      {filteredChecklists.length === 0 ? (
        <EmptyState
          onCreateNew={openCreateDialog}
          onBrowseTemplates={openTemplateGallery}
        />
      ) : (
        <div className="space-y-6">
          {/* Summary Cards */}
          <ChecklistSummaryCards stats={summaryStats} />

          {/* Checklist Grid */}
          <ChecklistGrid
            checklists={filteredChecklists}
            selectedId={selectedChecklistId}
            getProgress={getChecklistProgress}
            onSelect={handleSelectChecklist}
          />

          {/* Selected Checklist Items */}
          <AnimatePresence mode="wait">
            {selectedChecklist && (
              <ChecklistItemsList
                key={selectedChecklist.id}
                checklist={selectedChecklist}
                progress={getChecklistProgress(selectedChecklist.id)}
                onToggleItem={(itemId) => toggleItem(selectedChecklist.id, itemId)}
                onEditItem={(item) => openItemEditor(selectedChecklist.id, item)}
                onDeleteItem={(itemId) => deleteItem(selectedChecklist.id, itemId)}
                onAddItem={(parentId) => openItemEditor(selectedChecklist.id, undefined, parentId)}
                onEditChecklist={() => handleEditChecklist(selectedChecklist)}
                onDeleteChecklist={() => {
                  deleteChecklist(selectedChecklist.id)
                  setSelectedChecklist(null)
                }}
                onReorderItems={(items) => reorderItems(selectedChecklist.id, items)}
                onClose={() => setSelectedChecklist(null)}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Dialogs */}
      <CreateChecklistDialog
        open={isCreateDialogOpen}
        checklist={editingChecklist}
        onClose={() => {
          closeCreateDialog()
          setEditingChecklist(null)
        }}
        onSave={handleSaveChecklist}
      />

      <TemplateGallery
        open={isTemplateGalleryOpen}
        onClose={closeTemplateGallery}
        onAddTemplate={addFromTemplate}
      />

      {editingItem && (
        <ItemEditor
          open={isItemEditorOpen}
          checklistId={editingItem.checklistId}
          item={editingItem.item}
          parentId={editingItem.parentId}
          onClose={closeItemEditor}
          onSave={handleSaveItem}
        />
      )}
    </div>
  )
}
