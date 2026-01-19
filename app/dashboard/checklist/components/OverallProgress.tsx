'use client'

import { motion } from 'framer-motion'
import { Trophy, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { ChecklistProgress } from '@/types/checklist'

interface OverallProgressProps {
  progress: ChecklistProgress
}

export function OverallProgress({ progress }: OverallProgressProps) {
  const isComplete = progress.percentage === 100

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 overflow-hidden relative">
      {isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-2 left-4">
            <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
          </div>
          <div className="absolute top-6 right-8">
            <Sparkles className="h-3 w-3 text-yellow-200 animate-pulse delay-100" />
          </div>
          <div className="absolute bottom-4 left-12">
            <Sparkles className="h-3 w-3 text-yellow-200 animate-pulse delay-200" />
          </div>
        </motion.div>
      )}

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Overall Progress</h3>
            <p className="text-blue-100 text-sm">
              {progress.completed} of {progress.total} tasks completed
            </p>
          </div>
          <div className="text-right">
            <motion.p
              key={progress.percentage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold"
            >
              {progress.percentage}%
            </motion.p>
          </div>
        </div>

        <div className="w-full bg-white/20 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress.percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white h-3 rounded-full"
          />
        </div>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-4 text-yellow-200"
          >
            <Trophy className="h-5 w-5" />
            <span className="font-medium">Congratulations! All tasks completed!</span>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
