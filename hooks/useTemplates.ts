'use client'

import { useEffect, useState, useMemo } from 'react'
import { useChecklistStore } from '@/stores/checklist-store'
import { fetchTemplates } from '@/lib/supabase/queries/checklist'
import type { ChecklistTemplate, TemplateCategory } from '@/types/checklist'

export function useTemplates() {
  const store = useChecklistStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all')

  // Fetch templates on mount
  useEffect(() => {
    const loadTemplates = async () => {
      // Don't reload if already loaded
      if (store.templates.length > 0) return

      setIsLoading(true)
      setError(null)

      try {
        const templates = await fetchTemplates()
        store.setTemplates(templates)
      } catch (err) {
        console.error('Failed to load templates:', err)
        setError('Failed to load templates. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadTemplates()
  }, [store.templates.length])

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return store.templates.filter((template) => {
      // Category filter
      if (selectedCategory !== 'all' && template.category !== selectedCategory) {
        return false
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = template.title.toLowerCase().includes(query)
        const matchesDescription = template.description?.toLowerCase().includes(query)
        const matchesCategory = template.category.toLowerCase().includes(query)
        if (!matchesTitle && !matchesDescription && !matchesCategory) {
          return false
        }
      }

      return true
    })
  }, [store.templates, searchQuery, selectedCategory])

  // Get featured templates
  const featuredTemplates = useMemo(() => {
    return store.templates.filter((t) => t.is_featured)
  }, [store.templates])

  // Get templates by category
  const templatesByCategory = useMemo(() => {
    const byCategory: Record<string, ChecklistTemplate[]> = {}

    store.templates.forEach((template) => {
      if (!byCategory[template.category]) {
        byCategory[template.category] = []
      }
      byCategory[template.category].push(template)
    })

    return byCategory
  }, [store.templates])

  // Get available categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(store.templates.map((t) => t.category))
    return Array.from(uniqueCategories)
  }, [store.templates])

  return {
    templates: store.templates,
    filteredTemplates,
    featuredTemplates,
    templatesByCategory,
    categories,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  }
}
