import { createClient } from '@/lib/supabase/client'
import type {
  UserChecklist,
  ChecklistItem,
  ChecklistTemplate,
  CreateChecklistInput,
  UpdateChecklistInput,
  CreateItemInput,
  UpdateItemInput,
} from '@/types/checklist'

const supabase = createClient()

// ============================================
// User Checklists
// ============================================

export async function fetchUserChecklists(userId: string): Promise<UserChecklist[]> {
  const { data, error } = await supabase
    .from('user_checklists')
    .select(`
      *,
      items:checklist_items(*)
    `)
    .eq('user_id', userId)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching checklists:', error)
    throw error
  }

  // Sort items within each checklist
  return (data || []).map(checklist => ({
    ...checklist,
    items: (checklist.items || []).sort((a: ChecklistItem, b: ChecklistItem) => a.sort_order - b.sort_order)
  }))
}

export async function createChecklist(
  userId: string,
  input: CreateChecklistInput
): Promise<UserChecklist> {
  // Get the highest sort_order
  const { data: existingChecklists } = await supabase
    .from('user_checklists')
    .select('sort_order')
    .eq('user_id', userId)
    .order('sort_order', { ascending: false })
    .limit(1)

  const nextSortOrder = existingChecklists?.[0]?.sort_order ? existingChecklists[0].sort_order + 1 : 0

  const { data, error } = await supabase
    .from('user_checklists')
    .insert({
      user_id: userId,
      title: input.title,
      description: input.description,
      category: input.category,
      color: input.color,
      icon: input.icon,
      status: 'active',
      sort_order: nextSortOrder,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating checklist:', error)
    throw error
  }

  return { ...data, items: [] }
}

export async function updateChecklist(
  checklistId: string,
  input: UpdateChecklistInput
): Promise<UserChecklist> {
  const { data, error } = await supabase
    .from('user_checklists')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', checklistId)
    .select(`
      *,
      items:checklist_items(*)
    `)
    .single()

  if (error) {
    console.error('Error updating checklist:', error)
    throw error
  }

  return {
    ...data,
    items: (data.items || []).sort((a: ChecklistItem, b: ChecklistItem) => a.sort_order - b.sort_order)
  }
}

export async function deleteChecklist(checklistId: string): Promise<void> {
  // Items will be deleted automatically due to cascade
  const { error } = await supabase
    .from('user_checklists')
    .delete()
    .eq('id', checklistId)

  if (error) {
    console.error('Error deleting checklist:', error)
    throw error
  }
}

// ============================================
// Checklist Items
// ============================================

export async function createItem(input: CreateItemInput): Promise<ChecklistItem> {
  // Get the highest sort_order for this checklist
  const { data: existingItems } = await supabase
    .from('checklist_items')
    .select('sort_order')
    .eq('checklist_id', input.checklist_id)
    .order('sort_order', { ascending: false })
    .limit(1)

  const nextSortOrder = existingItems?.[0]?.sort_order ? existingItems[0].sort_order + 1 : 0

  const { data, error } = await supabase
    .from('checklist_items')
    .insert({
      checklist_id: input.checklist_id,
      title: input.title,
      description: input.description,
      priority: input.priority,
      due_date: input.due_date,
      completed: false,
      sort_order: nextSortOrder,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating item:', error)
    throw error
  }

  return data
}

export async function updateItem(
  itemId: string,
  input: UpdateItemInput
): Promise<ChecklistItem> {
  const updateData: Record<string, unknown> = {
    ...input,
    updated_at: new Date().toISOString(),
  }

  // If completing the item, set completed_at
  if (input.completed === true) {
    updateData.completed_at = new Date().toISOString()
  } else if (input.completed === false) {
    updateData.completed_at = null
  }

  const { data, error } = await supabase
    .from('checklist_items')
    .update(updateData)
    .eq('id', itemId)
    .select()
    .single()

  if (error) {
    console.error('Error updating item:', error)
    throw error
  }

  return data
}

export async function deleteItem(itemId: string): Promise<void> {
  const { error } = await supabase
    .from('checklist_items')
    .delete()
    .eq('id', itemId)

  if (error) {
    console.error('Error deleting item:', error)
    throw error
  }
}

export async function toggleItem(itemId: string, completed: boolean): Promise<ChecklistItem> {
  const { data, error } = await supabase
    .from('checklist_items')
    .update({
      completed,
      completed_at: completed ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', itemId)
    .select()
    .single()

  if (error) {
    console.error('Error toggling item:', error)
    throw error
  }

  return data
}

export async function reorderItems(
  items: { id: string; sort_order: number }[]
): Promise<void> {
  // Use a transaction-like approach with individual updates
  const updates = items.map(item =>
    supabase
      .from('checklist_items')
      .update({ sort_order: item.sort_order })
      .eq('id', item.id)
  )

  const results = await Promise.all(updates)

  const errors = results.filter(r => r.error)
  if (errors.length > 0) {
    console.error('Error reordering items:', errors)
    throw errors[0].error
  }
}

// ============================================
// Templates
// ============================================

export async function fetchTemplates(): Promise<ChecklistTemplate[]> {
  const { data, error } = await supabase
    .from('checklist_templates')
    .select(`
      *,
      items:template_items(*)
    `)
    .order('is_featured', { ascending: false })
    .order('usage_count', { ascending: false })

  if (error) {
    console.error('Error fetching templates:', error)
    throw error
  }

  return (data || []).map(template => ({
    ...template,
    items: (template.items || []).sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
  }))
}

export async function copyTemplateToUser(
  userId: string,
  templateId: string
): Promise<UserChecklist> {
  // First, fetch the template with its items
  const { data: template, error: templateError } = await supabase
    .from('checklist_templates')
    .select(`
      *,
      items:template_items(*)
    `)
    .eq('id', templateId)
    .single()

  if (templateError || !template) {
    console.error('Error fetching template:', templateError)
    throw templateError || new Error('Template not found')
  }

  // Get the highest sort_order for the user's checklists
  const { data: existingChecklists } = await supabase
    .from('user_checklists')
    .select('sort_order')
    .eq('user_id', userId)
    .order('sort_order', { ascending: false })
    .limit(1)

  const nextSortOrder = existingChecklists?.[0]?.sort_order ? existingChecklists[0].sort_order + 1 : 0

  // Create the checklist
  const { data: checklist, error: checklistError } = await supabase
    .from('user_checklists')
    .insert({
      user_id: userId,
      title: template.title,
      description: template.description,
      category: template.category,
      color: template.color,
      icon: template.icon,
      template_id: templateId,
      status: 'active',
      sort_order: nextSortOrder,
    })
    .select()
    .single()

  if (checklistError || !checklist) {
    console.error('Error creating checklist from template:', checklistError)
    throw checklistError || new Error('Failed to create checklist')
  }

  // Create the items
  const templateItems = template.items || []
  if (templateItems.length > 0) {
    const itemsToInsert = templateItems.map((item: { title: string; description?: string; priority: string; sort_order: number }) => ({
      checklist_id: checklist.id,
      title: item.title,
      description: item.description,
      priority: item.priority,
      sort_order: item.sort_order,
      completed: false,
    }))

    const { data: items, error: itemsError } = await supabase
      .from('checklist_items')
      .insert(itemsToInsert)
      .select()

    if (itemsError) {
      console.error('Error creating items from template:', itemsError)
      // Don't throw here, return checklist with empty items
      return { ...checklist, items: [] }
    }

    // Increment usage count on template
    await supabase
      .from('checklist_templates')
      .update({ usage_count: template.usage_count + 1 })
      .eq('id', templateId)

    return {
      ...checklist,
      items: (items || []).sort((a: ChecklistItem, b: ChecklistItem) => a.sort_order - b.sort_order)
    }
  }

  return { ...checklist, items: [] }
}
