'use client'

import { motion } from 'framer-motion'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  CheckCircle2,
  Circle,
  GripVertical,
  MoreHorizontal,
  Pencil,
  Trash2,
  Calendar,
  Sparkles,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ChecklistItem as ChecklistItemType, PriorityLevel } from '@/types/checklist'
import { priorityColors } from '@/types/checklist'

interface ChecklistItemProps {
  item: ChecklistItemType
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
  isDragging?: boolean
}

export function ChecklistItem({
  item,
  onToggle,
  onEdit,
  onDelete,
  isDragging = false,
}: ChecklistItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { text: 'Overdue', color: 'text-red-600 bg-red-50' }
    if (diffDays === 0) return { text: 'Today', color: 'text-orange-600 bg-orange-50' }
    if (diffDays === 1) return { text: 'Tomorrow', color: 'text-yellow-600 bg-yellow-50' }
    if (diffDays <= 7) return { text: `${diffDays} days`, color: 'text-blue-600 bg-blue-50' }

    return {
      text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      color: 'text-gray-600 bg-gray-50',
    }
  }

  const priorityLabels: Record<PriorityLevel, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`group flex items-center gap-2 p-3 rounded-xl transition-all ${
        item.is_completed
          ? 'bg-green-50 hover:bg-green-100'
          : 'bg-gray-50 hover:bg-gray-100'
      } ${isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''}`}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="p-1 -ml-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity touch-none"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {/* Checkbox */}
      <button
        onClick={onToggle}
        className="flex-shrink-0 focus:outline-none"
      >
        {item.is_completed ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <Circle className="h-5 w-5 text-gray-300 hover:text-gray-400" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm ${
              item.is_completed ? 'text-green-700 line-through' : 'text-gray-700'
            }`}
          >
            {item.title}
          </span>

          {/* Priority Badge */}
          {item.priority !== 'low' && !item.is_completed && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[item.priority].bg} ${priorityColors[item.priority].text}`}
            >
              {priorityLabels[item.priority]}
            </span>
          )}

          {/* Due Date Badge */}
          {item.due_date && !item.is_completed && (
            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${formatDueDate(item.due_date).color}`}>
              <Calendar className="h-3 w-3" />
              {formatDueDate(item.due_date).text}
            </span>
          )}
        </div>

        {item.description && (
          <p className={`text-xs mt-1 ${item.is_completed ? 'text-green-600' : 'text-gray-500'}`}>
            {item.description}
          </p>
        )}
      </div>

      {/* Completed sparkle */}
      {item.is_completed && (
        <Sparkles className="h-4 w-4 text-green-400 flex-shrink-0" />
      )}

      {/* Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}
