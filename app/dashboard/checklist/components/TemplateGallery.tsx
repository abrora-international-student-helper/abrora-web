'use client'

import { Search, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { TemplateCard } from './TemplateCard'
import { useTemplates } from '@/hooks/useTemplates'
import type { ChecklistCategory } from '@/types/checklist'
import { categoryLabels } from '@/types/checklist'

interface TemplateGalleryProps {
  open: boolean
  onClose: () => void
  onAddTemplate: (templateId: string) => void
}

export function TemplateGallery({ open, onClose, onAddTemplate }: TemplateGalleryProps) {
  const {
    filteredTemplates,
    featuredTemplates,
    categories,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useTemplates()

  const handleAddTemplate = (templateId: string) => {
    onAddTemplate(templateId)
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle>Template Gallery</SheetTitle>
          <SheetDescription>
            Choose a template to quickly add a pre-made checklist
          </SheetDescription>
        </SheetHeader>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-32" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-2">Failed to load templates</p>
            <p className="text-gray-500 text-sm">Please try again later</p>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No templates found</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Featured Section */}
            {selectedCategory === 'all' && !searchQuery && featuredTemplates.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Featured</h3>
                <div className="space-y-3">
                  {featuredTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onAdd={handleAddTemplate}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Templates */}
            <div>
              {selectedCategory === 'all' && !searchQuery && featuredTemplates.length > 0 && (
                <h3 className="text-sm font-semibold text-gray-900 mb-3">All Templates</h3>
              )}
              <div className="space-y-3">
                {filteredTemplates
                  .filter((t) => !t.is_featured || searchQuery || selectedCategory !== 'all')
                  .map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onAdd={handleAddTemplate}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
