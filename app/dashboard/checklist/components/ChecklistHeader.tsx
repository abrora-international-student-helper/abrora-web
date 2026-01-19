'use client'

import { Plus, LayoutGrid } from 'lucide-react'

interface ChecklistHeaderProps {
  onCreateNew: () => void
  onBrowseTemplates: () => void
}

export function ChecklistHeader({ onCreateNew, onBrowseTemplates }: ChecklistHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Arrival Checklist</h1>
        <p className="text-gray-500 mt-1">Track your journey from home to campus</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onBrowseTemplates}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <LayoutGrid className="h-4 w-4" />
          <span className="hidden sm:inline">Browse Templates</span>
          <span className="sm:hidden">Templates</span>
        </button>

        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Checklist</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>
    </div>
  )
}
