'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane,
  Building2,
  GraduationCap,
  ListTodo,
  Star,
  Users,
  ChevronDown,
  ChevronUp,
  Plus,
  RefreshCw,
  Briefcase,
  Building,
  MapPin,
  Award,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ChecklistTemplate, ChecklistCategory, TemplateDifficulty } from '@/types/checklist'
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

const difficultyColors: Record<TemplateDifficulty, string> = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  complex: 'bg-red-100 text-red-700',
}

interface TemplateCardProps {
  template: ChecklistTemplate
  onAdd: (templateId: string) => void
}

export function TemplateCard({ template, onAdd }: TemplateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const colors = colorClasses[template.color] || colorClasses.blue
  const IconComponent = categoryIconMap[template.category] || ListTodo

  // Calculate average rating
  const avgRating = template.rating_count > 0
    ? (template.rating_sum / template.rating_count).toFixed(1)
    : '0'

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-lg ${colors.light} flex-shrink-0`}>
            <IconComponent className={`h-5 w-5 ${colors.text}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 truncate">{template.title}</h3>
              {template.is_featured && (
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Featured
                </Badge>
              )}
            </div>

            {template.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{template.description}</p>
            )}

            {/* Meta info */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[template.difficulty]}`}>
                {template.difficulty.charAt(0).toUpperCase() + template.difficulty.slice(1)}
              </span>

              <span className="text-xs text-gray-500 flex items-center gap-1">
                <ListTodo className="h-3 w-3" />
                {template.items.length} items
              </span>

              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Users className="h-3 w-3" />
                {template.usage_count} uses
              </span>

              {template.rating_count > 0 && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {avgRating}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Preview */}
      <AnimatePresence>
        {isExpanded && template.items.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-100"
          >
            <div className="p-4 bg-gray-50">
              <p className="text-xs font-medium text-gray-500 uppercase mb-2">Preview</p>
              <ul className="space-y-1">
                {template.items.slice(0, 5).map((item) => (
                  <li key={item.id} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </li>
                ))}
                {template.items.length > 5 && (
                  <li className="text-xs text-gray-400 pl-6">
                    +{template.items.length - 5} more items
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="p-4 pt-0 flex items-center gap-2">
        {template.items.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide preview
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Preview items
              </>
            )}
          </button>
        )}

        <button
          onClick={() => onAdd(template.id)}
          className="ml-auto flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>
    </div>
  )
}
