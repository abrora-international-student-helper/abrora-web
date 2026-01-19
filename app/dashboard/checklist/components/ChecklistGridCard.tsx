'use client'

import { motion } from 'framer-motion'
import {
  Plane,
  Building2,
  GraduationCap,
  RefreshCw,
  Briefcase,
  Building,
  MapPin,
  Award,
  ListTodo,
} from 'lucide-react'
import type { UserChecklist, ChecklistCategory, ChecklistProgress } from '@/types/checklist'
import { colorClasses } from '@/types/checklist'

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

interface ChecklistGridCardProps {
  checklist: UserChecklist
  isSelected: boolean
  progress: ChecklistProgress
  onSelect: () => void
}

export function ChecklistGridCard({
  checklist,
  isSelected,
  progress,
  onSelect,
}: ChecklistGridCardProps) {
  const colors = colorClasses[checklist.color] || colorClasses.blue
  const IconComponent = categoryIconMap[checklist.category] || ListTodo

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full p-4 rounded-2xl bg-white text-left transition-all duration-200 ${
        isSelected
          ? 'ring-2 ring-blue-500 shadow-lg'
          : 'shadow-sm hover:shadow-md border border-gray-100'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Large colored circle with icon */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center`}
        >
          <IconComponent className="h-6 w-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 truncate text-sm">
            {checklist.title}
          </h3>

          {/* Progress text */}
          <p className="text-xs text-gray-500 mt-0.5">
            {progress.completed}/{progress.total} completed
          </p>
        </div>

        {/* Count badge */}
        <div
          className={`flex-shrink-0 min-w-[28px] h-7 px-2 rounded-full ${colors.light} ${colors.text} flex items-center justify-center text-sm font-semibold`}
        >
          {progress.total - progress.completed}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full rounded-full ${colors.progress}`}
        />
      </div>

      {/* Completion indicator */}
      {progress.percentage === 100 && progress.total > 0 && (
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      )}
    </motion.button>
  )
}
