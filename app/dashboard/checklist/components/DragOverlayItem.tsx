'use client'

import { GripVertical, Calendar } from 'lucide-react'
import type { NestedChecklistItem, PriorityLevel } from '@/types/checklist'

interface DragOverlayItemProps {
  item: NestedChecklistItem
}

const priorityDots: Record<PriorityLevel, string> = {
  low: 'bg-gray-300',
  medium: 'bg-blue-500',
  high: 'bg-orange-500',
  critical: 'bg-red-500',
}

export function DragOverlayItem({ item }: DragOverlayItemProps) {
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { text: 'Overdue', color: 'text-red-500' }
    if (diffDays === 0) return { text: 'Today', color: 'text-orange-500' }
    if (diffDays === 1) return { text: 'Tomorrow', color: 'text-yellow-600' }
    if (diffDays <= 7) return { text: `${diffDays}d`, color: 'text-blue-500' }

    return {
      text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      color: 'text-gray-500',
    }
  }

  return (
    <div className="flex items-center gap-2 py-3 px-2 bg-white rounded-xl shadow-xl ring-2 ring-blue-500 cursor-grabbing">
      {/* Spacer for expand button area */}
      <div className="w-5" />

      {/* Drag Handle */}
      <div className="p-1 -ml-1 text-gray-500">
        <GripVertical className="h-4 w-4" />
      </div>

      {/* Checkbox visual */}
      <div className="flex-shrink-0">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            item.is_completed
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300'
          }`}
        >
          {item.is_completed && (
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span
          className={`text-sm ${
            item.is_completed
              ? 'text-gray-400 line-through'
              : 'text-gray-900'
          }`}
        >
          {item.title}
        </span>
      </div>

      {/* Priority indicator */}
      {item.priority !== 'low' && !item.is_completed && (
        <div
          className={`w-2.5 h-2.5 rounded-full ${priorityDots[item.priority]} flex-shrink-0`}
        />
      )}

      {/* Due date chip */}
      {item.due_date && !item.is_completed && (
        <span
          className={`text-xs font-medium flex items-center gap-1 flex-shrink-0 ${formatDueDate(item.due_date).color}`}
        >
          <Calendar className="h-3 w-3" />
          {formatDueDate(item.due_date).text}
        </span>
      )}
    </div>
  )
}
