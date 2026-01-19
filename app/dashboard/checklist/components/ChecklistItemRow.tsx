'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  GripVertical,
  MoreHorizontal,
  Pencil,
  Trash2,
  Calendar,
  ChevronRight,
  Plus,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ChecklistItem as ChecklistItemType, PriorityLevel, NestedChecklistItem } from '@/types/checklist'

interface ChecklistItemRowProps {
  item: NestedChecklistItem
  onToggle: (itemId: string) => void
  onEdit: (item: ChecklistItemType) => void
  onDelete: (itemId: string) => void
  onAddSubItem: (parentId: string) => void
  isDragging?: boolean
  depth?: number
}

const priorityDots: Record<PriorityLevel, string> = {
  low: 'bg-gray-300',
  medium: 'bg-blue-500',
  high: 'bg-orange-500',
  critical: 'bg-red-500',
}

export function ChecklistItemRow({
  item,
  onToggle,
  onEdit,
  onDelete,
  onAddSubItem,
  isDragging = false,
  depth = 0,
}: ChecklistItemRowProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasSubItems = item.subItems && item.subItems.length > 0

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

    if (diffDays < 0) return { text: 'Overdue', color: 'text-red-500' }
    if (diffDays === 0) return { text: 'Today', color: 'text-orange-500' }
    if (diffDays === 1) return { text: 'Tomorrow', color: 'text-yellow-600' }
    if (diffDays <= 7) return { text: `${diffDays}d`, color: 'text-blue-500' }

    return {
      text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      color: 'text-gray-500',
    }
  }

  // Calculate sub-item completion
  const completedSubItems = item.subItems?.filter(sub => sub.is_completed).length || 0
  const totalSubItems = item.subItems?.length || 0

  return (
    <div>
      <motion.div
        ref={setNodeRef}
        style={style}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: isDragging ? 0.5 : 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className={`group flex items-center gap-2 py-3 px-2 -mx-2 rounded-xl transition-colors ${
          isDragging ? 'bg-blue-50 shadow-lg ring-2 ring-blue-500' : 'hover:bg-gray-50'
        }`}
        style={{ ...style, paddingLeft: `${depth * 24 + 8}px` }}
      >
        {/* Expand/Collapse for items with sub-items */}
        {hasSubItems ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          </button>
        ) : (
          <div className="w-5" /> // Spacer for alignment
        )}

        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="p-1 -ml-1 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity touch-none"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* iOS-style circular checkbox */}
        <button
          onClick={() => onToggle(item.id)}
          className="flex-shrink-0 focus:outline-none"
        >
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              item.is_completed
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {item.is_completed && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-3.5 h-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </motion.svg>
            )}
          </div>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm transition-all duration-200 ${
                item.is_completed
                  ? 'text-gray-400 line-through'
                  : 'text-gray-900'
              }`}
            >
              {item.title}
            </span>

            {/* Sub-item count badge */}
            {hasSubItems && (
              <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                {completedSubItems}/{totalSubItems}
              </span>
            )}
          </div>

          {item.description && !item.is_completed && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {item.description}
            </p>
          )}
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

        {/* Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 rounded-lg hover:bg-gray-100">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAddSubItem(item.id)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Sub-task
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(item)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(item.id)} className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      {/* Sub-items */}
      <AnimatePresence>
        {hasSubItems && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-l-2 border-gray-100 ml-5">
              {item.subItems.map((subItem) => (
                <ChecklistItemRow
                  key={subItem.id}
                  item={{ ...subItem, subItems: [] }}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onAddSubItem={onAddSubItem}
                  depth={depth + 1}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
