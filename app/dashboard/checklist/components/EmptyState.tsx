'use client'

import { ClipboardList, Plus, LayoutGrid } from 'lucide-react'

interface EmptyStateProps {
  onCreateNew: () => void
  onBrowseTemplates: () => void
}

export function EmptyState({ onCreateNew, onBrowseTemplates }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
        <ClipboardList className="h-8 w-8 text-blue-600" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">No checklists yet</h3>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Create your first checklist to start tracking your tasks and progress toward your goals.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create New Checklist
        </button>

        <span className="text-gray-400">or</span>

        <button
          onClick={onBrowseTemplates}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <LayoutGrid className="h-4 w-4" />
          Browse Templates
        </button>
      </div>
    </div>
  )
}
