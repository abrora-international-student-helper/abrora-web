// Checklist Types - matching Supabase database schema

export type Priority = 'low' | 'medium' | 'high' | 'critical'
export type ChecklistStatus = 'active' | 'completed' | 'archived'
export type TemplateCategory = 'pre-arrival' | 'first-week' | 'first-month' | 'documents' | 'housing' | 'finance' | 'academics' | 'custom'
export type ChecklistColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow' | 'pink' | 'teal'

// Database schema types
export interface ChecklistItem {
  id: string
  checklist_id: string
  title: string
  description?: string | null
  priority: Priority
  due_date?: string | null
  completed: boolean
  completed_at?: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export interface UserChecklist {
  id: string
  user_id: string
  title: string
  description?: string | null
  category: TemplateCategory
  color: ChecklistColor
  icon?: string | null
  status: ChecklistStatus
  template_id?: string | null
  sort_order: number
  created_at: string
  updated_at: string
  items: ChecklistItem[]
}

export interface ChecklistTemplate {
  id: string
  title: string
  description?: string | null
  category: TemplateCategory
  color: ChecklistColor
  icon?: string | null
  difficulty: 'easy' | 'medium' | 'hard'
  estimated_time?: string | null
  usage_count: number
  rating: number
  is_featured: boolean
  created_at: string
  items: TemplateItem[]
}

export interface TemplateItem {
  id: string
  template_id: string
  title: string
  description?: string | null
  priority: Priority
  sort_order: number
}

// Input types for creating/updating
export interface CreateChecklistInput {
  title: string
  description?: string
  category: TemplateCategory
  color: ChecklistColor
  icon?: string
}

export interface UpdateChecklistInput {
  title?: string
  description?: string
  category?: TemplateCategory
  color?: ChecklistColor
  icon?: string
  status?: ChecklistStatus
}

export interface CreateItemInput {
  checklist_id: string
  title: string
  description?: string
  priority: Priority
  due_date?: string
}

export interface UpdateItemInput {
  title?: string
  description?: string
  priority?: Priority
  due_date?: string | null
  completed?: boolean
}

// Filter types
export interface ChecklistFilter {
  status: 'all' | 'active' | 'completed'
  priority: Priority | 'all'
  search: string
  category: TemplateCategory | 'all'
}

// Progress types
export interface ChecklistProgress {
  total: number
  completed: number
  percentage: number
}

// Color mapping for UI
export const colorClasses: Record<ChecklistColor, {
  bg: string
  text: string
  border: string
  progress: string
  light: string
}> = {
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    border: 'border-blue-200',
    progress: 'bg-blue-500',
    light: 'bg-blue-50',
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-600',
    border: 'border-green-200',
    progress: 'bg-green-500',
    light: 'bg-green-50',
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-200',
    progress: 'bg-purple-500',
    light: 'bg-purple-50',
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-600',
    border: 'border-orange-200',
    progress: 'bg-orange-500',
    light: 'bg-orange-50',
  },
  red: {
    bg: 'bg-red-500',
    text: 'text-red-600',
    border: 'border-red-200',
    progress: 'bg-red-500',
    light: 'bg-red-50',
  },
  yellow: {
    bg: 'bg-yellow-500',
    text: 'text-yellow-600',
    border: 'border-yellow-200',
    progress: 'bg-yellow-500',
    light: 'bg-yellow-50',
  },
  pink: {
    bg: 'bg-pink-500',
    text: 'text-pink-600',
    border: 'border-pink-200',
    progress: 'bg-pink-500',
    light: 'bg-pink-50',
  },
  teal: {
    bg: 'bg-teal-500',
    text: 'text-teal-600',
    border: 'border-teal-200',
    progress: 'bg-teal-500',
    light: 'bg-teal-50',
  },
}

// Priority badge colors
export const priorityColors: Record<Priority, {
  bg: string
  text: string
  border: string
}> = {
  low: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-200',
  },
  medium: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  high: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    border: 'border-orange-200',
  },
  critical: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    border: 'border-red-200',
  },
}

// Category icons mapping
export const categoryIcons: Record<TemplateCategory, string> = {
  'pre-arrival': 'Plane',
  'first-week': 'Building2',
  'first-month': 'GraduationCap',
  'documents': 'FileText',
  'housing': 'Home',
  'finance': 'DollarSign',
  'academics': 'BookOpen',
  'custom': 'ListTodo',
}
