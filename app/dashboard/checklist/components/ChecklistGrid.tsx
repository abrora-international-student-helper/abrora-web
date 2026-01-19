'use client'

import { motion } from 'framer-motion'
import { ChecklistGridCard } from './ChecklistGridCard'
import type { UserChecklist, ChecklistProgress } from '@/types/checklist'

interface ChecklistGridProps {
  checklists: UserChecklist[]
  selectedId: string | null
  getProgress: (id: string) => ChecklistProgress
  onSelect: (id: string) => void
}

export function ChecklistGrid({
  checklists,
  selectedId,
  getProgress,
  onSelect,
}: ChecklistGridProps) {
  if (checklists.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
        My Lists
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
      >
        {checklists.map((checklist, index) => (
          <motion.div
            key={checklist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ChecklistGridCard
              checklist={checklist}
              isSelected={selectedId === checklist.id}
              progress={getProgress(checklist.id)}
              onSelect={() => onSelect(checklist.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
