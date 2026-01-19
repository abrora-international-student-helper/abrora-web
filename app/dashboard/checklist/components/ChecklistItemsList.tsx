'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
  Plane,
  Building2,
  GraduationCap,
  RefreshCw,
  Briefcase,
  Building,
  MapPin,
  Award,
  ListTodo,
  X,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChecklistItemRow } from './ChecklistItemRow'
import type { UserChecklist, ChecklistItem as ChecklistItemType, ChecklistCategory, ChecklistProgress } from '@/types/checklist'
import { colorClasses, organizeItemsHierarchy } from '@/types/checklist'

const categoryIconMap: Record<ChecklistCategory, React.ComponentType<{ className?: string }>> = {
  'pre_arrival': Plane,
  'first_week': Building2,
  'first_month': GraduationCap,
  'ongoing': RefreshCw,
  'opt': Briefcase,
  'cpt': Building,
  'travel': MapPin,
  'graduation': Award,
  'custom': ListTodo,
}

interface ChecklistItemsListProps {
  checklist: UserChecklist
  progress: ChecklistProgress
  onToggleItem: (itemId: string) => void
  onEditItem: (item: ChecklistItemType) => void
  onDeleteItem: (itemId: string) => void
  onAddItem: (parentId?: string) => void
  onEditChecklist: () => void
  onDeleteChecklist: () => void
  onReorderItems: (items: ChecklistItemType[]) => void
  onClose: () => void
}

export function ChecklistItemsList({
  checklist,
  progress,
  onToggleItem,
  onEditItem,
  onDeleteItem,
  onAddItem,
  onEditChecklist,
  onDeleteChecklist,
  onReorderItems,
  onClose,
}: ChecklistItemsListProps) {
  const colors = colorClasses[checklist.color] || colorClasses.blue
  const IconComponent = categoryIconMap[checklist.category] || ListTodo

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Organize items into hierarchy
  const nestedItems = useMemo(() => organizeItemsHierarchy(checklist.items), [checklist.items])

  // Get all item IDs for drag and drop (flat list)
  const itemIds = useMemo(() => checklist.items.map((item) => item.id), [checklist.items])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = checklist.items.findIndex((item) => item.id === active.id)
      const newIndex = checklist.items.findIndex((item) => item.id === over.id)

      const newItems = arrayMove(checklist.items, oldIndex, newIndex)
      onReorderItems(newItems)
    }
  }

  // Separate root-level items by completion status
  const incompleteItems = nestedItems.filter((item) => !item.is_completed && !item.parent_id)
  const completedItems = nestedItems.filter((item) => item.is_completed && !item.parent_id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}
            >
              <IconComponent className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{checklist.title}</h2>
              <p className="text-xs text-gray-500">
                {progress.completed} of {progress.total} completed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEditChecklist}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit List
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDeleteChecklist} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="p-4">
        {checklist.items.length === 0 ? (
          <div className="text-center py-12">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${colors.light} flex items-center justify-center`}>
              <IconComponent className={`h-8 w-8 ${colors.text}`} />
            </div>
            <p className="text-gray-500 text-sm mb-4">No items in this list yet</p>
            <button
              onClick={() => onAddItem()}
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white ${colors.bg} rounded-xl hover:opacity-90 transition-opacity`}
            >
              <Plus className="h-4 w-4" />
              Add First Item
            </button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={itemIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-0">
                <AnimatePresence mode="popLayout">
                  {/* Incomplete items first */}
                  {incompleteItems.map((item) => (
                    <ChecklistItemRow
                      key={item.id}
                      item={item}
                      onToggle={onToggleItem}
                      onEdit={onEditItem}
                      onDelete={onDeleteItem}
                      onAddSubItem={(parentId) => onAddItem(parentId)}
                    />
                  ))}
                </AnimatePresence>

                {/* Completed section */}
                {completedItems.length > 0 && (
                  <>
                    {incompleteItems.length > 0 && (
                      <div className="py-3 mt-2">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Completed ({completedItems.length})
                        </span>
                      </div>
                    )}
                    <AnimatePresence mode="popLayout">
                      {completedItems.map((item) => (
                        <ChecklistItemRow
                          key={item.id}
                          item={item}
                          onToggle={onToggleItem}
                          onEdit={onEditItem}
                          onDelete={onDeleteItem}
                          onAddSubItem={(parentId) => onAddItem(parentId)}
                        />
                      ))}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Add Item Button */}
      {checklist.items.length > 0 && (
        <div className="px-4 pb-4">
          <button
            onClick={() => onAddItem()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>
      )}
    </motion.div>
  )
}
