'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  Plus,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Edit2,
  X,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Mock reminders data
const mockReminders = [
  {
    id: '1',
    title: 'I-20 Renewal',
    description: 'Submit I-20 renewal request to international office',
    date: '2024-02-15',
    time: '10:00 AM',
    category: 'immigration',
    priority: 'high',
    completed: false,
  },
  {
    id: '2',
    title: 'Travel Signature',
    description: 'Get travel signature before spring break trip',
    date: '2024-03-01',
    time: '09:00 AM',
    category: 'immigration',
    priority: 'medium',
    completed: false,
  },
  {
    id: '3',
    title: 'OPT Application Deadline',
    description: 'Submit OPT application 90 days before graduation',
    date: '2024-04-01',
    time: '11:59 PM',
    category: 'work',
    priority: 'high',
    completed: false,
  },
  {
    id: '4',
    title: 'Visa Interview',
    description: 'Prepare documents for visa renewal interview',
    date: '2024-01-20',
    time: '02:00 PM',
    category: 'immigration',
    priority: 'high',
    completed: true,
  },
  {
    id: '5',
    title: 'Health Insurance Renewal',
    description: 'Renew student health insurance for spring semester',
    date: '2024-01-25',
    time: '05:00 PM',
    category: 'general',
    priority: 'medium',
    completed: true,
  },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'immigration', label: 'Immigration' },
  { id: 'work', label: 'Work' },
  { id: 'academic', label: 'Academic' },
  { id: 'general', label: 'General' },
]

export default function RemindersPage() {
  const [reminders, setReminders] = useState(mockReminders)
  const [activeCategory, setActiveCategory] = useState('all')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    category: 'general',
    priority: 'medium',
  })

  const toggleComplete = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    )
  }

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id))
  }

  const addReminder = () => {
    if (!newReminder.title || !newReminder.date) return

    const reminder = {
      id: Date.now().toString(),
      ...newReminder,
      completed: false,
    }
    setReminders((prev) => [...prev, reminder])
    setNewReminder({
      title: '',
      description: '',
      date: '',
      time: '',
      category: 'general',
      priority: 'medium',
    })
    setShowAddDialog(false)
  }

  const filteredReminders = reminders.filter(
    (r) => activeCategory === 'all' || r.category === activeCategory
  )

  const upcomingReminders = filteredReminders
    .filter((r) => !r.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const completedReminders = filteredReminders.filter((r) => r.completed)

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-green-100 text-green-700 border-green-200',
  }

  const categoryColors = {
    immigration: 'bg-blue-500',
    work: 'bg-purple-500',
    academic: 'bg-green-500',
    general: 'bg-gray-500',
  }

  const getDaysUntil = (date: string) => {
    const today = new Date()
    const target = new Date(date)
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    if (diff < 0) return 'Overdue'
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Tomorrow'
    return `${diff} days`
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Reminders</h1>
          <p className="text-gray-500 mt-1">Never miss an important deadline</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              Add Reminder
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Reminder</DialogTitle>
              <DialogDescription>
                Set up a new reminder for important dates
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newReminder.title}
                  onChange={(e) =>
                    setNewReminder((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., I-20 Renewal"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newReminder.description}
                  onChange={(e) =>
                    setNewReminder((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add details..."
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={newReminder.date}
                    onChange={(e) =>
                      setNewReminder((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) =>
                      setNewReminder((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={newReminder.category}
                    onChange={(e) =>
                      setNewReminder((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="immigration">Immigration</option>
                    <option value="work">Work</option>
                    <option value="academic">Academic</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Priority</label>
                  <select
                    value={newReminder.priority}
                    onChange={(e) =>
                      setNewReminder((prev) => ({ ...prev, priority: e.target.value }))
                    }
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowAddDialog(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={addReminder}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Reminder
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Reminders */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Upcoming ({upcomingReminders.length})
          </h2>
          <AnimatePresence>
            {upcomingReminders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No upcoming reminders</p>
                </CardContent>
              </Card>
            ) : (
              upcomingReminders.map((reminder) => (
                <motion.div
                  key={reminder.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex gap-4">
                        <button
                          onClick={() => toggleComplete(reminder.id)}
                          className="mt-1 w-5 h-5 rounded-full border-2 border-gray-300 hover:border-blue-500 flex-shrink-0 transition-colors"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {reminder.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {reminder.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  priorityColors[
                                    reminder.priority as keyof typeof priorityColors
                                  ]
                                }
                              >
                                {reminder.priority}
                              </Badge>
                              <button
                                onClick={() => deleteReminder(reminder.id)}
                                className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              {new Date(reminder.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </div>
                            {reminder.time && (
                              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                {reminder.time}
                              </div>
                            )}
                            <Badge
                              variant="secondary"
                              className={`${
                                getDaysUntil(reminder.date) === 'Overdue'
                                  ? 'bg-red-100 text-red-700'
                                  : getDaysUntil(reminder.date) === 'Today'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {getDaysUntil(reminder.date)}
                            </Badge>
                            <div
                              className={`w-2 h-2 rounded-full ${
                                categoryColors[
                                  reminder.category as keyof typeof categoryColors
                                ]
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>

          {/* Completed */}
          {completedReminders.length > 0 && (
            <>
              <h2 className="text-lg font-semibold text-gray-900 mt-8">
                Completed ({completedReminders.length})
              </h2>
              {completedReminders.map((reminder) => (
                <Card key={reminder.id} className="opacity-60">
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <button
                        onClick={() => toggleComplete(reminder.id)}
                        className="mt-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                      >
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      </button>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-500 line-through">
                          {reminder.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {reminder.description}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteReminder(reminder.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium text-red-700">High Priority</span>
                </div>
                <span className="text-lg font-bold text-red-700">
                  {reminders.filter((r) => r.priority === 'high' && !r.completed).length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-medium text-orange-700">Due This Week</span>
                </div>
                <span className="text-lg font-bold text-orange-700">
                  {
                    reminders.filter((r) => {
                      const days = Math.ceil(
                        (new Date(r.date).getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                      return days >= 0 && days <= 7 && !r.completed
                    }).length
                  }
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-700">Completed</span>
                </div>
                <span className="text-lg font-bold text-green-700">
                  {reminders.filter((r) => r.completed).length}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <CardContent className="p-6">
              <Bell className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Stay on Track</h3>
              <p className="text-sm text-gray-600">
                Set reminders at least 2 weeks before important immigration deadlines to
                give yourself enough preparation time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
