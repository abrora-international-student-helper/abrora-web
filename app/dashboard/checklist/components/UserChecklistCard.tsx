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
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
  Plane,
  Building2,
  GraduationCap,
  FileText,
  Home,
  DollarSign,
  BookOpen,
  ListTodo,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChecklistItem } from './ChecklistItem'
import type { UserChecklist, ChecklistItem as ChecklistItemType, TemplateCategory, ChecklistProgress } from '@/types/checklist'
import { colorClasses } from '@/types/checklist'

const categoryIconMap: Record<TemplateCategory, React.ComponentType<{ className?: string }>> = {
  'pre-arrival': Plane,
  'first-week': Building2,
  'first-month': GraduationCap,
  'documents': FileText,
  'housing': Home,
  'finance': DollarSign,
  'academics': BookOpen,
  'custom': ListTodo,
}

interface UserChecklistCardProps {
  checklist: UserChecklist
  isExpanded: boolean
  progress: ChecklistProgress
  onToggleExpand: () => void
  onToggleItem: (itemId: string) => void
  onEditItem: (item: ChecklistItemType) => void
  onDeleteItem: (itemId: string) => void
  onAddItem: () => void
  onEditChecklist: () => void
  onDeleteChecklist: () => void
  onReorderItems: (items: ChecklistItemType[]) => void
}

export function UserChecklistCard({
  checklist,
  isExpanded,
  progress,
  onToggleExpand,
  onToggleItem,
  onEditItem,
  onDeleteItem,
  onAddItem,
  onEditChecklist,
  onDeleteChecklist,
  onReorderItems,
}: UserChecklistCardProps) {
  const colors = colorClasses[checklist.color]
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

  return (
    <Card className="overflow-hidden">
      <button onClick={onToggleExpand} className="w-full text-left">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${colors.light}`}>
                <IconComponent className={`h-5 w-5 ${colors.text}`} />
              </div>
              <div>
                <CardTitle className="text-lg">{checklist.title}</CardTitle>
                {checklist.description && (
                  <CardDescription>{checklist.description}</CardDescription>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{progress.percentage}%</p>
                <p className="text-xs text-gray-500">
                  {progress.completed}/{progress.total}
                </p>
              </div>
              <div className="w-24 hidden sm:block">
                <Progress value={progress.percentage} className="h-2" />
              </div>

              {/* Actions dropdown - stop propagation to prevent toggle */}
              <div onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onAddItem}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onEditChecklist}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit Checklist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDeleteChecklist} variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </CardHeader>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="pt-0 pb-4">
              <div className="border-t border-gray-100 pt-4">
                {checklist.items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm mb-4">No items in this checklist yet</p>
                    <button
                      onClick={onAddItem}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
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
                      <div className="space-y-2">
                        {checklist.items.map((item) => (
                          <ChecklistItem
                            key={item.id}
                            item={item}
                            onToggle={() => onToggleItem(item.id)}
                            onEdit={() => onEditItem(item)}
                            onDelete={() => onDeleteItem(item.id)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}

                {checklist.items.length > 0 && (
                  <button
                    onClick={onAddItem}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add Item
                  </button>
                )}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
