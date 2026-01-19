'use client'

import { useState, useEffect } from 'react'
import {
  Plane,
  Building2,
  GraduationCap,
  FileText,
  Home,
  DollarSign,
  BookOpen,
  ListTodo,
  RefreshCw,
  Briefcase,
  Building,
  MapPin,
  Award,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import type { UserChecklist, CreateChecklistInput, ChecklistCategory, ChecklistColor } from '@/types/checklist'

const categoryOptions: { value: ChecklistCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'pre_arrival', label: 'Pre-Arrival', icon: Plane },
  { value: 'first_week', label: 'First Week', icon: Building2 },
  { value: 'first_month', label: 'First Month', icon: GraduationCap },
  { value: 'ongoing', label: 'Ongoing', icon: RefreshCw },
  { value: 'opt', label: 'OPT', icon: Briefcase },
  { value: 'cpt', label: 'CPT', icon: Building },
  { value: 'travel', label: 'Travel', icon: MapPin },
  { value: 'graduation', label: 'Graduation', icon: Award },
  { value: 'custom', label: 'Custom', icon: ListTodo },
]

const colorOptions: { value: ChecklistColor; bg: string; ring: string }[] = [
  { value: 'blue', bg: 'bg-blue-500', ring: 'ring-blue-500' },
  { value: 'green', bg: 'bg-green-500', ring: 'ring-green-500' },
  { value: 'purple', bg: 'bg-purple-500', ring: 'ring-purple-500' },
  { value: 'orange', bg: 'bg-orange-500', ring: 'ring-orange-500' },
  { value: 'red', bg: 'bg-red-500', ring: 'ring-red-500' },
  { value: 'yellow', bg: 'bg-yellow-500', ring: 'ring-yellow-500' },
  { value: 'pink', bg: 'bg-pink-500', ring: 'ring-pink-500' },
  { value: 'teal', bg: 'bg-teal-500', ring: 'ring-teal-500' },
]

interface CreateChecklistDialogProps {
  open: boolean
  checklist: UserChecklist | null
  onClose: () => void
  onSave: (data: CreateChecklistInput) => void
}

export function CreateChecklistDialog({
  open,
  checklist,
  onClose,
  onSave,
}: CreateChecklistDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<ChecklistCategory>('custom')
  const [color, setColor] = useState<ChecklistColor>('blue')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditing = !!checklist

  // Reset form when dialog opens/closes or checklist changes
  useEffect(() => {
    if (open) {
      if (checklist) {
        setTitle(checklist.title)
        setDescription(checklist.description || '')
        setCategory(checklist.category)
        setColor((checklist.color as ChecklistColor) || 'blue')
      } else {
        setTitle('')
        setDescription('')
        setCategory('custom')
        setColor('blue')
      }
    }
  }, [open, checklist])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    setIsSubmitting(true)

    try {
      await onSave({
        title: title.trim(),
        description: description.trim() || undefined,
        category,
        color,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Checklist' : 'Create New Checklist'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the details of your checklist.'
              : 'Create a custom checklist to track your tasks.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., My Custom Checklist"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="grid grid-cols-3 gap-2">
              {categoryOptions.map((option) => {
                const Icon = option.icon
                const isSelected = category === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setCategory(option.value)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className={`text-xs ${isSelected ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                      {option.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setColor(option.value)}
                  className={`w-8 h-8 rounded-full ${option.bg} transition-all ${
                    color === option.value ? `ring-2 ${option.ring} ring-offset-2` : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create Checklist'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
