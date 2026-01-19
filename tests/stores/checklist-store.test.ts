import { describe, it, expect, beforeEach } from 'vitest'
import { useChecklistStore } from '@/stores/checklist-store'
import type { UserChecklist, ChecklistItem } from '@/types/checklist'

// Helper to create a mock checklist
const createMockChecklist = (overrides?: Partial<UserChecklist>): UserChecklist => ({
  id: 'checklist-1',
  user_id: 'user-1',
  title: 'Test Checklist',
  description: 'Test description',
  category: 'first_week',
  icon: 'CheckSquare',
  color: 'blue',
  status: 'in_progress',
  source_template_id: null,
  is_pinned: false,
  due_date: null,
  completed_at: null,
  sort_order: 0,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  items: [],
  ...overrides,
})

// Helper to create a mock checklist item
const createMockItem = (overrides?: Partial<ChecklistItem>): ChecklistItem => ({
  id: 'item-1',
  user_id: 'user-1',
  checklist_id: 'checklist-1',
  category: 'first_week',
  title: 'Test Item',
  description: null,
  is_completed: false,
  completed_at: null,
  help_url: null,
  help_text: null,
  sort_order: 0,
  is_custom: false,
  priority: 'medium',
  due_date: null,
  parent_id: null,
  source_template_item_id: null,
  tags: null,
  notes: null,
  attachments: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides,
})

describe('Checklist Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useChecklistStore.setState({
      checklists: [],
      templates: [],
      isLoading: false,
      error: null,
      filter: {
        status: 'all',
        priority: 'all',
        search: '',
        category: 'all',
      },
      expandedIds: new Set(),
      isCreateDialogOpen: false,
      isTemplateGalleryOpen: false,
      isItemEditorOpen: false,
      editingItem: null,
      editingChecklist: null,
    })
  })

  describe('initial state', () => {
    it('should have empty checklists array', () => {
      const { checklists } = useChecklistStore.getState()
      expect(checklists).toEqual([])
    })

    it('should have default filter values', () => {
      const { filter } = useChecklistStore.getState()
      expect(filter).toEqual({
        status: 'all',
        priority: 'all',
        search: '',
        category: 'all',
      })
    })
  })

  describe('setChecklists', () => {
    it('should set checklists array', () => {
      const mockChecklists = [createMockChecklist()]
      useChecklistStore.getState().setChecklists(mockChecklists)

      const { checklists } = useChecklistStore.getState()
      expect(checklists).toEqual(mockChecklists)
    })
  })

  describe('addChecklist', () => {
    it('should add a new checklist', () => {
      const mockChecklist = createMockChecklist()
      useChecklistStore.getState().addChecklist(mockChecklist)

      const { checklists } = useChecklistStore.getState()
      expect(checklists).toHaveLength(1)
      expect(checklists[0]).toEqual(mockChecklist)
    })

    it('should add checklist to expanded ids', () => {
      const mockChecklist = createMockChecklist({ id: 'new-checklist' })
      useChecklistStore.getState().addChecklist(mockChecklist)

      const { expandedIds } = useChecklistStore.getState()
      expect(expandedIds.has('new-checklist')).toBe(true)
    })
  })

  describe('updateChecklist', () => {
    it('should update an existing checklist', () => {
      const mockChecklist = createMockChecklist()
      useChecklistStore.getState().setChecklists([mockChecklist])

      useChecklistStore.getState().updateChecklist('checklist-1', {
        title: 'Updated Title',
        status: 'completed',
      })

      const { checklists } = useChecklistStore.getState()
      expect(checklists[0].title).toBe('Updated Title')
      expect(checklists[0].status).toBe('completed')
    })

    it('should not update non-existent checklist', () => {
      const mockChecklist = createMockChecklist()
      useChecklistStore.getState().setChecklists([mockChecklist])

      useChecklistStore.getState().updateChecklist('non-existent', {
        title: 'Updated Title',
      })

      const { checklists } = useChecklistStore.getState()
      expect(checklists[0].title).toBe('Test Checklist')
    })
  })

  describe('deleteChecklist', () => {
    it('should remove a checklist', () => {
      const mockChecklist = createMockChecklist()
      useChecklistStore.getState().setChecklists([mockChecklist])

      useChecklistStore.getState().deleteChecklist('checklist-1')

      const { checklists } = useChecklistStore.getState()
      expect(checklists).toHaveLength(0)
    })

    it('should remove checklist from expanded ids', () => {
      const mockChecklist = createMockChecklist()
      useChecklistStore.getState().addChecklist(mockChecklist)

      useChecklistStore.getState().deleteChecklist('checklist-1')

      const { expandedIds } = useChecklistStore.getState()
      expect(expandedIds.has('checklist-1')).toBe(false)
    })
  })

  describe('toggleItem', () => {
    it('should toggle item completion status', () => {
      const mockItem = createMockItem({ is_completed: false })
      const mockChecklist = createMockChecklist({ items: [mockItem] })
      useChecklistStore.getState().setChecklists([mockChecklist])

      useChecklistStore.getState().toggleItem('checklist-1', 'item-1')

      const { checklists } = useChecklistStore.getState()
      expect(checklists[0].items[0].is_completed).toBe(true)
      expect(checklists[0].items[0].completed_at).not.toBeNull()
    })

    it('should clear completed_at when uncompleting item', () => {
      const mockItem = createMockItem({
        is_completed: true,
        completed_at: '2024-01-01T00:00:00Z',
      })
      const mockChecklist = createMockChecklist({ items: [mockItem] })
      useChecklistStore.getState().setChecklists([mockChecklist])

      useChecklistStore.getState().toggleItem('checklist-1', 'item-1')

      const { checklists } = useChecklistStore.getState()
      expect(checklists[0].items[0].is_completed).toBe(false)
      expect(checklists[0].items[0].completed_at).toBeNull()
    })
  })

  describe('addItem', () => {
    it('should add item to checklist', () => {
      const mockChecklist = createMockChecklist({ items: [] })
      useChecklistStore.getState().setChecklists([mockChecklist])

      const newItem = createMockItem({ id: 'new-item' })
      useChecklistStore.getState().addItem('checklist-1', newItem)

      const { checklists } = useChecklistStore.getState()
      expect(checklists[0].items).toHaveLength(1)
      expect(checklists[0].items[0].id).toBe('new-item')
    })
  })

  describe('deleteItem', () => {
    it('should remove item from checklist', () => {
      const mockItem = createMockItem()
      const mockChecklist = createMockChecklist({ items: [mockItem] })
      useChecklistStore.getState().setChecklists([mockChecklist])

      useChecklistStore.getState().deleteItem('checklist-1', 'item-1')

      const { checklists } = useChecklistStore.getState()
      expect(checklists[0].items).toHaveLength(0)
    })
  })

  describe('getOverallProgress', () => {
    it('should calculate correct progress', () => {
      const items = [
        createMockItem({ id: 'item-1', is_completed: true }),
        createMockItem({ id: 'item-2', is_completed: false }),
        createMockItem({ id: 'item-3', is_completed: true }),
      ]
      const mockChecklist = createMockChecklist({ items })
      useChecklistStore.getState().setChecklists([mockChecklist])

      const progress = useChecklistStore.getState().getOverallProgress()

      expect(progress.total).toBe(3)
      expect(progress.completed).toBe(2)
      expect(progress.percentage).toBe(67) // Math.round(2/3 * 100)
    })

    it('should return 0% for empty checklists', () => {
      const progress = useChecklistStore.getState().getOverallProgress()

      expect(progress.total).toBe(0)
      expect(progress.completed).toBe(0)
      expect(progress.percentage).toBe(0)
    })
  })

  describe('getChecklistProgress', () => {
    it('should calculate progress for specific checklist', () => {
      const items = [
        createMockItem({ id: 'item-1', is_completed: true }),
        createMockItem({ id: 'item-2', is_completed: true }),
      ]
      const mockChecklist = createMockChecklist({ items })
      useChecklistStore.getState().setChecklists([mockChecklist])

      const progress = useChecklistStore
        .getState()
        .getChecklistProgress('checklist-1')

      expect(progress.total).toBe(2)
      expect(progress.completed).toBe(2)
      expect(progress.percentage).toBe(100)
    })

    it('should return zero progress for non-existent checklist', () => {
      const progress = useChecklistStore
        .getState()
        .getChecklistProgress('non-existent')

      expect(progress.total).toBe(0)
      expect(progress.completed).toBe(0)
      expect(progress.percentage).toBe(0)
    })
  })

  describe('getFilteredChecklists', () => {
    it('should filter by search term in title', () => {
      const checklists = [
        createMockChecklist({ id: '1', title: 'Visa Documents' }),
        createMockChecklist({ id: '2', title: 'Bank Account Setup' }),
      ]
      useChecklistStore.getState().setChecklists(checklists)
      useChecklistStore.getState().setFilter({ search: 'visa' })

      const filtered = useChecklistStore.getState().getFilteredChecklists()

      expect(filtered).toHaveLength(1)
      expect(filtered[0].title).toBe('Visa Documents')
    })

    it('should filter by category', () => {
      const checklists = [
        createMockChecklist({ id: '1', category: 'first_week' }),
        createMockChecklist({ id: '2', category: 'opt' }),
      ]
      useChecklistStore.getState().setChecklists(checklists)
      useChecklistStore.getState().setFilter({ category: 'opt' })

      const filtered = useChecklistStore.getState().getFilteredChecklists()

      expect(filtered).toHaveLength(1)
      expect(filtered[0].category).toBe('opt')
    })

    it('should return all checklists when filter is "all"', () => {
      const checklists = [
        createMockChecklist({ id: '1' }),
        createMockChecklist({ id: '2' }),
      ]
      useChecklistStore.getState().setChecklists(checklists)

      const filtered = useChecklistStore.getState().getFilteredChecklists()

      expect(filtered).toHaveLength(2)
    })
  })

  describe('UI state actions', () => {
    it('should toggle expanded state', () => {
      useChecklistStore.getState().toggleExpanded('checklist-1')
      expect(useChecklistStore.getState().expandedIds.has('checklist-1')).toBe(true)

      useChecklistStore.getState().toggleExpanded('checklist-1')
      expect(useChecklistStore.getState().expandedIds.has('checklist-1')).toBe(false)
    })

    it('should expand all checklists', () => {
      const checklists = [
        createMockChecklist({ id: '1' }),
        createMockChecklist({ id: '2' }),
      ]
      useChecklistStore.getState().setChecklists(checklists)
      useChecklistStore.getState().expandAll()

      const { expandedIds } = useChecklistStore.getState()
      expect(expandedIds.has('1')).toBe(true)
      expect(expandedIds.has('2')).toBe(true)
    })

    it('should collapse all checklists', () => {
      useChecklistStore.setState({
        expandedIds: new Set(['1', '2', '3']),
      })

      useChecklistStore.getState().collapseAll()

      const { expandedIds } = useChecklistStore.getState()
      expect(expandedIds.size).toBe(0)
    })
  })

  describe('dialog state actions', () => {
    it('should open and close create dialog', () => {
      useChecklistStore.getState().openCreateDialog()
      expect(useChecklistStore.getState().isCreateDialogOpen).toBe(true)

      useChecklistStore.getState().closeCreateDialog()
      expect(useChecklistStore.getState().isCreateDialogOpen).toBe(false)
    })

    it('should clear editing checklist when closing create dialog', () => {
      useChecklistStore.setState({
        editingChecklist: createMockChecklist(),
      })

      useChecklistStore.getState().closeCreateDialog()

      expect(useChecklistStore.getState().editingChecklist).toBeNull()
    })
  })
})
