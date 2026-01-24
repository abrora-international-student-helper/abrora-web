'use client'

import { useMemo, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  MeasuringStrategy,
  pointerWithin,
  rectIntersection,
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
import { ChecklistItemRow, type DropPosition } from './ChecklistItemRow'
import { DragOverlayItem } from './DragOverlayItem'
import type { UserChecklist, ChecklistItem as ChecklistItemType, ChecklistCategory, ChecklistProgress, NestedChecklistItem } from '@/types/checklist'
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
  const [activeId, setActiveId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const [dropPosition, setDropPosition] = useState<DropPosition>(null)
  const colors = colorClasses[checklist.color] || colorClasses.blue
  const IconComponent = categoryIconMap[checklist.category] || ListTodo

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
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

  // Find the active item for the drag overlay
  const activeItem = useMemo(() => {
    if (!activeId) return null
    const findItem = (items: NestedChecklistItem[]): NestedChecklistItem | null => {
      for (const item of items) {
        if (item.id === activeId) return item
        if (item.subItems.length > 0) {
          const found = findItem(item.subItems)
          if (found) return found
        }
      }
      return null
    }
    return findItem(nestedItems)
  }, [activeId, nestedItems])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { over, active, activatorEvent } = event

    if (!over || over.id === active.id) {
      setOverId(null)
      setDropPosition(null)
      return
    }

    setOverId(over.id as string)

    // Calculate drop position based on cursor position within the target element
    if (over.rect) {
      const overRect = over.rect
      const pointerY = (activatorEvent as PointerEvent)?.clientY ?? 0
      const offsetY = event.delta?.y ?? 0
      const currentY = pointerY + offsetY

      const itemHeight = overRect.height
      const topThird = overRect.top + itemHeight * 0.25
      const bottomThird = overRect.top + itemHeight * 0.75

      // Also check horizontal position for nesting
      const pointerX = (activatorEvent as PointerEvent)?.clientX ?? 0
      const offsetX = event.delta?.x ?? 0
      const currentX = pointerX + offsetX
      const nestThreshold = overRect.left + 80 // Indent threshold for nesting

      if (currentX > nestThreshold && currentY > topThird && currentY < bottomThird) {
        // Middle zone + indented = nest
        setDropPosition('nest')
      } else if (currentY < topThird + (itemHeight * 0.25)) {
        // Top quarter = before
        setDropPosition('before')
      } else {
        // Bottom = after
        setDropPosition('after')
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const currentDropPosition = dropPosition
    const targetId = overId

    setActiveId(null)
    setOverId(null)
    setDropPosition(null)

    if (!over || active.id === over.id) return

    const draggedItem = checklist.items.find((item) => item.id === active.id)
    const targetItem = checklist.items.find((item) => item.id === over.id)

    if (!draggedItem || !targetItem) return

    // Prevent nesting an item under itself or its descendants
    const isDescendant = (parentId: string | null, childId: string): boolean => {
      if (!parentId) return false
      if (parentId === childId) return true
      const parent = checklist.items.find(i => i.id === parentId)
      return parent ? isDescendant(parent.parent_id, childId) : false
    }

    if (currentDropPosition === 'nest' && targetId) {
      // Nesting mode: make the dragged item a child of the target item
      // Don't allow nesting under own descendants
      if (isDescendant(targetItem.id, draggedItem.id)) return

      const newItems = checklist.items.map((item) => {
        if (item.id === draggedItem.id) {
          return { ...item, parent_id: targetItem.id }
        }
        return item
      })
      onReorderItems(newItems)
    } else {
      // Reorder mode: move items - before or after target
      const oldIndex = checklist.items.findIndex((item) => item.id === active.id)
      let newIndex = checklist.items.findIndex((item) => item.id === over.id)

      // Adjust index based on drop position
      if (currentDropPosition === 'after' && newIndex > oldIndex) {
        // No adjustment needed
      } else if (currentDropPosition === 'before' && newIndex < oldIndex) {
        // No adjustment needed
      } else if (currentDropPosition === 'after') {
        newIndex = newIndex + 1
      }

      // If moving to a different parent level, update parent_id
      const newParentId = targetItem.parent_id

      let newItems = checklist.items.map((item) => {
        if (item.id === draggedItem.id) {
          return { ...item, parent_id: newParentId }
        }
        return item
      })

      // Then reorder
      const updatedOldIndex = newItems.findIndex((item) => item.id === active.id)
      const updatedNewIndex = Math.min(newIndex, newItems.length - 1)
      newItems = arrayMove(newItems, updatedOldIndex, updatedNewIndex)

      onReorderItems(newItems)
    }
  }

  const handleDragCancel = () => {
    setActiveId(null)
    setOverId(null)
    setDropPosition(null)
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
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            measuring={{
              droppable: {
                strategy: MeasuringStrategy.Always,
              },
            }}
          >
            <SortableContext
              items={itemIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-1">
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
                      isDragging={activeId === item.id}
                      dropPosition={overId === item.id ? dropPosition : null}
                      globalDropPosition={dropPosition}
                      overId={overId}
                      activeId={activeId}
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
                          isDragging={activeId === item.id}
                          dropPosition={overId === item.id ? dropPosition : null}
                          globalDropPosition={dropPosition}
                          overId={overId}
                          activeId={activeId}
                        />
                      ))}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </SortableContext>

            {/* Drag Overlay - the floating item that follows cursor */}
            <DragOverlay dropAnimation={{
              duration: 200,
              easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
            }}>
              {activeItem ? <DragOverlayItem item={activeItem} /> : null}
            </DragOverlay>
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
