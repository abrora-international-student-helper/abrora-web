// Checklist Types - matching Supabase database schema

// Enum types matching database
export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical'
export type ChecklistCategory = 'pre_arrival' | 'first_week' | 'first_month' | 'ongoing' | 'opt' | 'cpt' | 'travel' | 'graduation' | 'custom'
export type ChecklistStatus = 'not_started' | 'in_progress' | 'completed' | 'archived'
export type TemplateDifficulty = 'easy' | 'medium' | 'complex'
export type ChecklistColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow' | 'pink' | 'teal'

// Database schema types
export interface ChecklistItem {
  id: string
  user_id: string
  checklist_id: string | null
  category: ChecklistCategory
  title: string
  description: string | null
  is_completed: boolean
  completed_at: string | null
  help_url: string | null
  help_text: string | null
  sort_order: number
  is_custom: boolean
  priority: PriorityLevel
  due_date: string | null
  parent_id: string | null
  source_template_item_id: string | null
  tags: string[] | null
  notes: string | null
  attachments: string[] | null
  created_at: string
  updated_at: string
}

export interface UserChecklist {
  id: string
  user_id: string
  title: string
  description: string | null
  category: ChecklistCategory
  icon: string
  color: string
  status: ChecklistStatus
  source_template_id: string | null
  is_pinned: boolean
  due_date: string | null
  completed_at: string | null
  sort_order: number
  created_at: string
  updated_at: string
  items: ChecklistItem[]
}

export interface ChecklistTemplate {
  id: string
  slug: string
  title: string
  description: string | null
  category: ChecklistCategory
  icon: string
  color: string
  difficulty: TemplateDifficulty
  estimated_time: string | null
  is_official: boolean
  is_active: boolean
  is_featured: boolean
  created_by: string | null
  usage_count: number
  rating_sum: number
  rating_count: number
  affected_visa_types: string[] | null
  tags: string[] | null
  sort_order: number
  created_at: string
  updated_at: string
  items: TemplateItem[]
}

export interface TemplateItem {
  id: string
  template_id: string
  title: string
  description: string | null
  help_url: string | null
  help_text: string | null
  is_required: boolean
  estimated_minutes: number | null
  sort_order: number
  parent_id: string | null
  tags: string[] | null
  created_at: string
}

// Input types for creating/updating
export interface CreateChecklistInput {
  title: string
  description?: string
  category: ChecklistCategory
  color?: string
  icon?: string
}

export interface UpdateChecklistInput {
  title?: string
  description?: string
  category?: ChecklistCategory
  color?: string
  icon?: string
  status?: ChecklistStatus
  is_pinned?: boolean
  due_date?: string | null
}

export interface CreateItemInput {
  checklist_id: string
  category: ChecklistCategory
  title: string
  description?: string
  priority?: PriorityLevel
  due_date?: string
  help_url?: string
  help_text?: string
  parent_id?: string
}

export interface UpdateItemInput {
  title?: string
  description?: string
  priority?: PriorityLevel
  due_date?: string | null
  is_completed?: boolean
  notes?: string
}

// Filter types
export interface ChecklistFilter {
  status: 'all' | ChecklistStatus
  priority: PriorityLevel | 'all'
  search: string
  category: ChecklistCategory | 'all'
}

// Progress types
export interface ChecklistProgress {
  total: number
  completed: number
  percentage: number
}

// Nested item type for UI rendering (supports unlimited depth)
export interface NestedChecklistItem extends ChecklistItem {
  subItems: NestedChecklistItem[]
  depth: number
}

// Helper function to organize flat items into nested structure (unlimited depth)
export function organizeItemsHierarchy(items: ChecklistItem[]): NestedChecklistItem[] {
  const itemMap = new Map<string, NestedChecklistItem>()
  const rootItems: NestedChecklistItem[] = []

  // First pass: create map with empty subItems arrays
  items.forEach(item => {
    itemMap.set(item.id, { ...item, subItems: [], depth: 0 })
  })

  // Second pass: organize into hierarchy
  items.forEach(item => {
    const nestedItem = itemMap.get(item.id)!
    if (item.parent_id && itemMap.has(item.parent_id)) {
      const parent = itemMap.get(item.parent_id)!
      nestedItem.depth = parent.depth + 1
      parent.subItems.push(nestedItem)
    } else {
      nestedItem.depth = 0
      rootItems.push(nestedItem)
    }
  })

  // Recursive function to sort sub-items and calculate depths
  const sortAndSetDepths = (items: NestedChecklistItem[], depth: number = 0) => {
    items.sort((a, b) => a.sort_order - b.sort_order)
    items.forEach(item => {
      item.depth = depth
      if (item.subItems.length > 0) {
        sortAndSetDepths(item.subItems, depth + 1)
      }
    })
  }

  sortAndSetDepths(rootItems, 0)

  return rootItems
}

// Get all nested items count (including all descendants)
export function getNestedItemsCount(item: NestedChecklistItem): { total: number; completed: number } {
  let total = 1
  let completed = item.is_completed ? 1 : 0

  item.subItems.forEach(subItem => {
    const subCounts = getNestedItemsCount(subItem)
    total += subCounts.total
    completed += subCounts.completed
  })

  return { total, completed }
}

// Color mapping for UI
export const colorClasses: Record<string, {
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
export const priorityColors: Record<PriorityLevel, {
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

// Category display labels
export const categoryLabels: Record<ChecklistCategory, string> = {
  'pre_arrival': 'Pre-Arrival',
  'first_week': 'First Week',
  'first_month': 'First Month',
  'ongoing': 'Ongoing',
  'opt': 'OPT',
  'cpt': 'CPT',
  'travel': 'Travel',
  'graduation': 'Graduation',
  'custom': 'Custom',
}

// Category icons mapping
export const categoryIcons: Record<ChecklistCategory, string> = {
  'pre_arrival': 'Plane',
  'first_week': 'Building2',
  'first_month': 'GraduationCap',
  'ongoing': 'RefreshCw',
  'opt': 'Briefcase',
  'cpt': 'Building',
  'travel': 'MapPin',
  'graduation': 'Award',
  'custom': 'ListTodo',
}
