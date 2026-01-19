'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Circle,
  Plane,
  Building2,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

// Checklist data based on MVP plan
const checklistCategories = [
  {
    id: 'pre-arrival',
    title: 'Pre-Arrival',
    icon: Plane,
    description: 'Complete before leaving your home country',
    color: 'blue',
    items: [
      { id: 'i20', text: 'Get I-20 and visa stamp', completed: true },
      { id: 'housing', text: 'Book housing/accommodation', completed: true },
      { id: 'pickup', text: 'Arrange airport pickup', completed: false },
      { id: 'insurance', text: 'Get travel insurance', completed: true },
      { id: 'docs', text: 'Carry required documents (passport, I-20, visa, I-94)', completed: false },
      { id: 'cash', text: 'Carry some US dollars cash', completed: false },
      { id: 'noc', text: 'Get NOC (No Objection Certificate)', completed: true },
      { id: 'medical', text: 'Complete medical requirements (MMR, TB test)', completed: false },
      { id: 'police', text: 'Get police clearance report', completed: true },
    ],
  },
  {
    id: 'first-week',
    title: 'First Week in USA',
    icon: Building2,
    description: 'Essential tasks for your first week',
    color: 'green',
    items: [
      { id: 'orientation', text: 'Attend international student orientation', completed: false },
      { id: 'student-id', text: 'Get student ID card', completed: false },
      { id: 'ssn', text: 'Apply for SSN (if eligible)', completed: false },
      { id: 'bank', text: 'Open a bank account', completed: false },
      { id: 'phone', text: 'Get a phone plan (SIM card)', completed: false },
      { id: 'email', text: 'Set up campus email', completed: false },
      { id: 'sevis', text: 'Complete SEVIS check-in', completed: false },
      { id: 'address', text: 'Report address to international office', completed: false },
    ],
  },
  {
    id: 'first-month',
    title: 'First Month',
    icon: GraduationCap,
    description: 'Get settled and explore',
    color: 'purple',
    items: [
      { id: 'resources', text: 'Explore campus resources (library, gym, etc.)', completed: false },
      { id: 'clubs', text: 'Join student organizations', completed: false },
      { id: 'work-rules', text: 'Understand work authorization rules', completed: false },
      { id: 'health-ins', text: 'Set up health insurance', completed: false },
      { id: 'class-reg', text: 'Complete class registration', completed: false },
      { id: 'advisor', text: 'Meet with academic advisor', completed: false },
      { id: 'transport', text: 'Figure out transportation options', completed: false },
      { id: 'grocery', text: 'Find nearby grocery stores', completed: false },
    ],
  },
]

export default function ChecklistPage() {
  const [categories, setCategories] = useState(checklistCategories)
  const [expandedCategory, setExpandedCategory] = useState<string | null>('pre-arrival')

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
            }
          : cat
      )
    )
  }

  const getCategoryProgress = (category: typeof checklistCategories[0]) => {
    const completed = category.items.filter((item) => item.completed).length
    return Math.round((completed / category.items.length) * 100)
  }

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0)
  const completedItems = categories.reduce(
    (sum, cat) => sum + cat.items.filter((item) => item.completed).length,
    0
  )
  const overallProgress = Math.round((completedItems / totalItems) * 100)

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      progress: 'bg-blue-500',
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200',
      progress: 'bg-green-500',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      progress: 'bg-purple-500',
    },
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Arrival Checklist</h1>
        <p className="text-gray-500 mt-1">Track your journey from home to campus</p>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Overall Progress</h3>
              <p className="text-blue-100 text-sm">
                {completedItems} of {totalItems} tasks completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">{overallProgress}%</p>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white h-3 rounded-full"
            />
          </div>
          {overallProgress === 100 && (
            <div className="flex items-center gap-2 mt-4 text-yellow-200">
              <Trophy className="h-5 w-5" />
              <span className="font-medium">Congratulations! All tasks completed!</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Cards */}
      <div className="space-y-4">
        {categories.map((category) => {
          const colors = colorClasses[category.color as keyof typeof colorClasses]
          const progress = getCategoryProgress(category)
          const isExpanded = expandedCategory === category.id

          return (
            <Card key={category.id} className="overflow-hidden">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                className="w-full text-left"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${colors.bg}`}>
                        <category.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">{progress}%</p>
                        <p className="text-xs text-gray-500">
                          {category.items.filter((i) => i.completed).length}/{category.items.length}
                        </p>
                      </div>
                      <div className="w-24 hidden sm:block">
                        <Progress value={progress} className="h-2" />
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
                      <div className="border-t border-gray-100 pt-4 space-y-2">
                        {category.items.map((item) => (
                          <motion.button
                            key={item.id}
                            onClick={() => toggleItem(category.id, item.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                              item.completed
                                ? 'bg-green-50 hover:bg-green-100'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                            whileTap={{ scale: 0.98 }}
                          >
                            {item.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-300 flex-shrink-0" />
                            )}
                            <span
                              className={`text-left ${
                                item.completed
                                  ? 'text-green-700 line-through'
                                  : 'text-gray-700'
                              }`}
                            >
                              {item.text}
                            </span>
                            {item.completed && (
                              <Sparkles className="h-4 w-4 text-green-400 ml-auto" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          )
        })}
      </div>

      {/* Tips Card */}
      <Card className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="p-3 bg-amber-100 rounded-xl h-fit">
              <Sparkles className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Pro Tip</h3>
              <p className="text-sm text-gray-600">
                Complete your SEVIS check-in within 30 days of arriving in the US.
                Report any address changes to your international office within 10 days.
                These are legal requirements for maintaining your F-1 status.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
