import { createClient } from '@/lib/supabase/client'
import type {
  UserChecklist,
  ChecklistItem,
  ChecklistTemplate,
  CreateChecklistInput,
  UpdateChecklistInput,
  CreateItemInput,
  UpdateItemInput,
  ChecklistCategory,
} from '@/types/checklist'

// ============================================
// Helper Functions
// ============================================

export async function ensureProfileExists(userId: string): Promise<void> {
  const supabase = createClient()

  // Check if profile exists
  const { data: profile, error: checkError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .single()

  if (checkError && checkError.code === 'PGRST116') {
    // Profile doesn't exist (no rows returned), create it
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || null,
        })

      if (insertError) {
        console.error('Error creating profile:', insertError)
        throw new Error('Failed to create user profile. Please try again.')
      }
    }
  } else if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking profile:', checkError)
    throw checkError
  }
}

// ============================================
// User Checklists
// ============================================

export async function fetchUserChecklists(userId: string): Promise<UserChecklist[]> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('user_checklists')
      .select(`
        *,
        items:checklist_items(*)
      `)
      .eq('user_id', userId)
      .order('sort_order', { ascending: true })

    if (error) {
      // Log but don't throw - user may not have any checklists yet
      console.error('Error fetching checklists:', error.message || error)
      return []
    }

    if (!data || data.length === 0) {
      return []
    }

    // Sort items within each checklist
    return data.map(checklist => ({
      ...checklist,
      items: (checklist.items || []).sort((a: ChecklistItem, b: ChecklistItem) => a.sort_order - b.sort_order)
    }))
  } catch (err) {
    console.error('Unexpected error fetching checklists:', err)
    return []
  }
}

export async function createChecklist(
  userId: string,
  input: CreateChecklistInput
): Promise<UserChecklist> {
  const supabase = createClient()

  // Ensure user profile exists first
  await ensureProfileExists(userId)

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
      color: input.color || 'blue',
      icon: input.icon || 'clipboard-list',
      status: 'not_started',
      sort_order: nextSortOrder,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating checklist:', JSON.stringify(error, null, 2))
    console.error('Error details:', error.message, error.code, error.details, error.hint)
    throw new Error(error.message || 'Failed to create checklist')
  }

  return { ...data, items: [] }
}

export async function updateChecklist(
  checklistId: string,
  input: UpdateChecklistInput
): Promise<UserChecklist> {
  const supabase = createClient()

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
  const supabase = createClient()

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

export async function createItem(userId: string, input: CreateItemInput): Promise<ChecklistItem> {
  const supabase = createClient()

  // Get the highest sort_order for items at this level (same parent)
  let query = supabase
    .from('checklist_items')
    .select('sort_order')
    .eq('checklist_id', input.checklist_id)
    .order('sort_order', { ascending: false })
    .limit(1)

  // If creating a sub-item, only look at siblings
  if (input.parent_id) {
    query = query.eq('parent_id', input.parent_id)
  } else {
    query = query.is('parent_id', null)
  }

  const { data: existingItems } = await query

  const nextSortOrder = existingItems?.[0]?.sort_order ? existingItems[0].sort_order + 1 : 0

  const { data, error } = await supabase
    .from('checklist_items')
    .insert({
      user_id: userId,
      checklist_id: input.checklist_id,
      category: input.category,
      title: input.title,
      description: input.description,
      priority: input.priority || 'medium',
      due_date: input.due_date,
      help_url: input.help_url,
      help_text: input.help_text,
      is_completed: false,
      is_custom: true,
      sort_order: nextSortOrder,
      parent_id: input.parent_id || null,
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
  const supabase = createClient()

  const updateData: Record<string, unknown> = {
    ...input,
    updated_at: new Date().toISOString(),
  }

  // If completing the item, set completed_at
  if (input.is_completed === true) {
    updateData.completed_at = new Date().toISOString()
  } else if (input.is_completed === false) {
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
  const supabase = createClient()

  const { error } = await supabase
    .from('checklist_items')
    .delete()
    .eq('id', itemId)

  if (error) {
    console.error('Error deleting item:', error)
    throw error
  }
}

export async function toggleItem(itemId: string, isCompleted: boolean): Promise<ChecklistItem> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('checklist_items')
    .update({
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null,
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

export async function toggleItems(itemIds: string[], isCompleted: boolean): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from('checklist_items')
    .update({
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .in('id', itemIds)

  if (error) {
    console.error('Error toggling items:', error)
    throw error
  }
}

export async function reorderItems(
  items: { id: string; sort_order: number }[]
): Promise<void> {
  const supabase = createClient()

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
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('checklist_templates')
      .select(`
        *,
        items:checklist_template_items(*)
      `)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      // Log but don't throw - return empty array so UI doesn't break
      console.error('Error fetching templates:', error.message || error)
      return []
    }

    if (!data || data.length === 0) {
      return []
    }

    return data.map(template => ({
      ...template,
      items: (template.items || []).sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
    }))
  } catch (err) {
    console.error('Unexpected error fetching templates:', err)
    return []
  }
}

export async function copyTemplateToUser(
  userId: string,
  templateId: string
): Promise<UserChecklist> {
  const supabase = createClient()

  // Ensure user profile exists first
  await ensureProfileExists(userId)

  // First, fetch the template with its items
  const { data: template, error: templateError } = await supabase
    .from('checklist_templates')
    .select(`
      *,
      items:checklist_template_items(*)
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
      source_template_id: templateId,
      status: 'not_started',
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
    const itemsToInsert = templateItems.map((item: {
      id: string
      title: string
      description?: string
      help_url?: string
      help_text?: string
      sort_order: number
    }) => ({
      user_id: userId,
      checklist_id: checklist.id,
      category: template.category as ChecklistCategory,
      title: item.title,
      description: item.description,
      help_url: item.help_url,
      help_text: item.help_text,
      priority: 'medium',
      sort_order: item.sort_order,
      is_completed: false,
      is_custom: false,
      source_template_item_id: item.id,
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

    // Record template usage
    await supabase
      .from('template_usage')
      .insert({
        user_id: userId,
        template_id: templateId,
        checklist_id: checklist.id,
        items_selected: templateItems.length,
      })

    return {
      ...checklist,
      items: (items || []).sort((a: ChecklistItem, b: ChecklistItem) => a.sort_order - b.sort_order)
    }
  }

  return { ...checklist, items: [] }
}
