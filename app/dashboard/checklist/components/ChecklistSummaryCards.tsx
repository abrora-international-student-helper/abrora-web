'use client'

import { motion } from 'framer-motion'
import { ListTodo, CalendarDays, CheckCircle2, AlertTriangle } from 'lucide-react'

interface SummaryStats {
  allCount: number
  todayCount: number
  completedCount: number
  highPriorityCount: number
}

interface ChecklistSummaryCardsProps {
  stats: SummaryStats
}

const summaryItems = [
  {
    key: 'all',
    label: 'All',
    icon: ListTodo,
    bgColor: 'bg-gray-900',
    getValue: (stats: SummaryStats) => stats.allCount,
  },
  {
    key: 'today',
    label: 'Today',
    icon: CalendarDays,
    bgColor: 'bg-blue-500',
    getValue: (stats: SummaryStats) => stats.todayCount,
  },
  {
    key: 'done',
    label: 'Done',
    icon: CheckCircle2,
    bgColor: 'bg-green-500',
    getValue: (stats: SummaryStats) => stats.completedCount,
  },
  {
    key: 'high',
    label: 'Priority',
    icon: AlertTriangle,
    bgColor: 'bg-orange-500',
    getValue: (stats: SummaryStats) => stats.highPriorityCount,
  },
]

export function ChecklistSummaryCards({ stats }: ChecklistSummaryCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {summaryItems.map((item, index) => {
        const Icon = item.icon
        const value = item.getValue(stats)

        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100"
          >
            <div className="flex flex-col items-start gap-1.5">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${item.bgColor} flex items-center justify-center`}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                {value}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {item.label}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
