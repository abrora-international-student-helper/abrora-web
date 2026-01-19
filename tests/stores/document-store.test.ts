import { describe, it, expect, beforeEach } from 'vitest'
import { useDocumentStore } from '@/stores/document-store'
import type { Document, DocumentType } from '@/types/document'

// Helper to create a mock document
const createMockDocument = (overrides?: Partial<Document>): Document => ({
  id: 'doc-1',
  user_id: 'user-1',
  document_type: 'passport',
  title: 'My Passport',
  file_path: 'user-1/1234567890_passport.pdf',
  file_size: 1024000,
  mime_type: 'application/pdf',
  thumbnail_path: null,
  document_number: null,
  issue_date: null,
  expiry_date: null,
  notes: null,
  is_verified: false,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides,
})

describe('Document Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useDocumentStore.setState({
      documents: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      filterType: 'all',
      uploadProgress: 0,
      isUploading: false,
      previewDocument: null,
      uploadDialogOpen: false,
    })
  })

  describe('initial state', () => {
    it('should have empty documents array', () => {
      const { documents } = useDocumentStore.getState()
      expect(documents).toEqual([])
    })

    it('should have default loading state as false', () => {
      const { isLoading } = useDocumentStore.getState()
      expect(isLoading).toBe(false)
    })

    it('should have no error', () => {
      const { error } = useDocumentStore.getState()
      expect(error).toBeNull()
    })

    it('should have empty search query', () => {
      const { searchQuery } = useDocumentStore.getState()
      expect(searchQuery).toBe('')
    })

    it('should have filter type as "all"', () => {
      const { filterType } = useDocumentStore.getState()
      expect(filterType).toBe('all')
    })

    it('should have upload progress at 0', () => {
      const { uploadProgress } = useDocumentStore.getState()
      expect(uploadProgress).toBe(0)
    })

    it('should not be uploading', () => {
      const { isUploading } = useDocumentStore.getState()
      expect(isUploading).toBe(false)
    })
  })

  describe('setDocuments', () => {
    it('should set documents array', () => {
      const mockDocuments = [createMockDocument()]
      useDocumentStore.getState().setDocuments(mockDocuments)

      const { documents } = useDocumentStore.getState()
      expect(documents).toEqual(mockDocuments)
    })

    it('should replace existing documents', () => {
      const initialDoc = createMockDocument({ id: 'doc-1' })
      const newDoc = createMockDocument({ id: 'doc-2' })

      useDocumentStore.getState().setDocuments([initialDoc])
      useDocumentStore.getState().setDocuments([newDoc])

      const { documents } = useDocumentStore.getState()
      expect(documents).toHaveLength(1)
      expect(documents[0].id).toBe('doc-2')
    })
  })

  describe('addDocument', () => {
    it('should add a new document to the beginning of the array', () => {
      const existingDoc = createMockDocument({ id: 'doc-1' })
      const newDoc = createMockDocument({ id: 'doc-2', title: 'New Document' })

      useDocumentStore.getState().setDocuments([existingDoc])
      useDocumentStore.getState().addDocument(newDoc)

      const { documents } = useDocumentStore.getState()
      expect(documents).toHaveLength(2)
      expect(documents[0].id).toBe('doc-2')
      expect(documents[1].id).toBe('doc-1')
    })

    it('should add document to empty array', () => {
      const newDoc = createMockDocument()
      useDocumentStore.getState().addDocument(newDoc)

      const { documents } = useDocumentStore.getState()
      expect(documents).toHaveLength(1)
      expect(documents[0]).toEqual(newDoc)
    })
  })

  describe('updateDocument', () => {
    it('should update an existing document', () => {
      const mockDoc = createMockDocument()
      useDocumentStore.getState().setDocuments([mockDoc])

      useDocumentStore.getState().updateDocument('doc-1', {
        title: 'Updated Passport',
        is_verified: true,
      })

      const { documents } = useDocumentStore.getState()
      expect(documents[0].title).toBe('Updated Passport')
      expect(documents[0].is_verified).toBe(true)
    })

    it('should not modify other documents', () => {
      const doc1 = createMockDocument({ id: 'doc-1', title: 'Doc 1' })
      const doc2 = createMockDocument({ id: 'doc-2', title: 'Doc 2' })
      useDocumentStore.getState().setDocuments([doc1, doc2])

      useDocumentStore.getState().updateDocument('doc-1', { title: 'Updated' })

      const { documents } = useDocumentStore.getState()
      expect(documents[0].title).toBe('Updated')
      expect(documents[1].title).toBe('Doc 2')
    })

    it('should do nothing for non-existent document', () => {
      const mockDoc = createMockDocument()
      useDocumentStore.getState().setDocuments([mockDoc])

      useDocumentStore.getState().updateDocument('non-existent', {
        title: 'Updated',
      })

      const { documents } = useDocumentStore.getState()
      expect(documents[0].title).toBe('My Passport')
    })
  })

  describe('deleteDocument', () => {
    it('should remove a document', () => {
      const mockDoc = createMockDocument()
      useDocumentStore.getState().setDocuments([mockDoc])

      useDocumentStore.getState().deleteDocument('doc-1')

      const { documents } = useDocumentStore.getState()
      expect(documents).toHaveLength(0)
    })

    it('should only remove the specified document', () => {
      const doc1 = createMockDocument({ id: 'doc-1' })
      const doc2 = createMockDocument({ id: 'doc-2' })
      useDocumentStore.getState().setDocuments([doc1, doc2])

      useDocumentStore.getState().deleteDocument('doc-1')

      const { documents } = useDocumentStore.getState()
      expect(documents).toHaveLength(1)
      expect(documents[0].id).toBe('doc-2')
    })

    it('should clear preview document if it was deleted', () => {
      const mockDoc = createMockDocument()
      useDocumentStore.getState().setDocuments([mockDoc])
      useDocumentStore.getState().openPreview(mockDoc)

      useDocumentStore.getState().deleteDocument('doc-1')

      const { previewDocument } = useDocumentStore.getState()
      expect(previewDocument).toBeNull()
    })

    it('should not clear preview document if different document was deleted', () => {
      const doc1 = createMockDocument({ id: 'doc-1' })
      const doc2 = createMockDocument({ id: 'doc-2' })
      useDocumentStore.getState().setDocuments([doc1, doc2])
      useDocumentStore.getState().openPreview(doc1)

      useDocumentStore.getState().deleteDocument('doc-2')

      const { previewDocument } = useDocumentStore.getState()
      expect(previewDocument?.id).toBe('doc-1')
    })
  })

  describe('UI state actions', () => {
    it('should set loading state', () => {
      useDocumentStore.getState().setLoading(true)
      expect(useDocumentStore.getState().isLoading).toBe(true)

      useDocumentStore.getState().setLoading(false)
      expect(useDocumentStore.getState().isLoading).toBe(false)
    })

    it('should set error state', () => {
      useDocumentStore.getState().setError('Something went wrong')
      expect(useDocumentStore.getState().error).toBe('Something went wrong')

      useDocumentStore.getState().setError(null)
      expect(useDocumentStore.getState().error).toBeNull()
    })

    it('should set search query', () => {
      useDocumentStore.getState().setSearchQuery('passport')
      expect(useDocumentStore.getState().searchQuery).toBe('passport')
    })

    it('should set filter type', () => {
      useDocumentStore.getState().setFilterType('visa')
      expect(useDocumentStore.getState().filterType).toBe('visa')
    })

    it('should set upload progress', () => {
      useDocumentStore.getState().setUploadProgress(50)
      expect(useDocumentStore.getState().uploadProgress).toBe(50)
    })

    it('should set uploading state', () => {
      useDocumentStore.getState().setUploading(true)
      expect(useDocumentStore.getState().isUploading).toBe(true)
    })
  })

  describe('dialog state actions', () => {
    it('should open preview with document', () => {
      const mockDoc = createMockDocument()
      useDocumentStore.getState().openPreview(mockDoc)

      expect(useDocumentStore.getState().previewDocument).toEqual(mockDoc)
    })

    it('should close preview', () => {
      const mockDoc = createMockDocument()
      useDocumentStore.getState().openPreview(mockDoc)
      useDocumentStore.getState().closePreview()

      expect(useDocumentStore.getState().previewDocument).toBeNull()
    })

    it('should open upload dialog', () => {
      useDocumentStore.getState().openUploadDialog()
      expect(useDocumentStore.getState().uploadDialogOpen).toBe(true)
    })

    it('should close upload dialog and reset progress', () => {
      useDocumentStore.getState().setUploadProgress(75)
      useDocumentStore.getState().openUploadDialog()
      useDocumentStore.getState().closeUploadDialog()

      expect(useDocumentStore.getState().uploadDialogOpen).toBe(false)
      expect(useDocumentStore.getState().uploadProgress).toBe(0)
    })
  })

  describe('getFilteredDocuments', () => {
    it('should return all documents when no filters applied', () => {
      const docs = [
        createMockDocument({ id: 'doc-1', document_type: 'passport' }),
        createMockDocument({ id: 'doc-2', document_type: 'visa' }),
      ]
      useDocumentStore.getState().setDocuments(docs)

      const filtered = useDocumentStore.getState().getFilteredDocuments()
      expect(filtered).toHaveLength(2)
    })

    it('should filter by document type', () => {
      const docs = [
        createMockDocument({ id: 'doc-1', document_type: 'passport' }),
        createMockDocument({ id: 'doc-2', document_type: 'visa' }),
        createMockDocument({ id: 'doc-3', document_type: 'passport' }),
      ]
      useDocumentStore.getState().setDocuments(docs)
      useDocumentStore.getState().setFilterType('passport')

      const filtered = useDocumentStore.getState().getFilteredDocuments()
      expect(filtered).toHaveLength(2)
      expect(filtered.every((d) => d.document_type === 'passport')).toBe(true)
    })

    it('should filter by search query in title', () => {
      const docs = [
        createMockDocument({ id: 'doc-1', title: 'My Passport', document_type: 'passport' }),
        createMockDocument({ id: 'doc-2', title: 'My Visa', document_type: 'visa' }),
      ]
      useDocumentStore.getState().setDocuments(docs)
      useDocumentStore.getState().setSearchQuery('My Visa')

      const filtered = useDocumentStore.getState().getFilteredDocuments()
      expect(filtered).toHaveLength(1)
      expect(filtered[0].title).toBe('My Visa')
    })

    it('should filter by search query in document type', () => {
      const docs = [
        createMockDocument({ id: 'doc-1', document_type: 'passport', title: 'Document 1' }),
        createMockDocument({ id: 'doc-2', document_type: 'visa', title: 'Document 2' }),
      ]
      useDocumentStore.getState().setDocuments(docs)
      useDocumentStore.getState().setSearchQuery('visa')

      const filtered = useDocumentStore.getState().getFilteredDocuments()
      expect(filtered).toHaveLength(1)
      expect(filtered[0].document_type).toBe('visa')
    })

    it('should filter by search query in notes', () => {
      const docs = [
        createMockDocument({ id: 'doc-1', notes: 'Important document' }),
        createMockDocument({ id: 'doc-2', notes: 'Secondary file' }),
      ]
      useDocumentStore.getState().setDocuments(docs)
      useDocumentStore.getState().setSearchQuery('important')

      const filtered = useDocumentStore.getState().getFilteredDocuments()
      expect(filtered).toHaveLength(1)
      expect(filtered[0].notes).toBe('Important document')
    })

    it('should be case insensitive', () => {
      const docs = [
        createMockDocument({ id: 'doc-1', title: 'SPECIAL DOCUMENT', document_type: 'i20' }),
        createMockDocument({ id: 'doc-2', title: 'other file', document_type: 'visa' }),
      ]
      useDocumentStore.getState().setDocuments(docs)
      useDocumentStore.getState().setSearchQuery('special')

      const filtered = useDocumentStore.getState().getFilteredDocuments()
      expect(filtered).toHaveLength(1)
      expect(filtered[0].title).toBe('SPECIAL DOCUMENT')
    })

    it('should combine type filter and search query', () => {
      const docs = [
        createMockDocument({ id: 'doc-1', document_type: 'passport', title: 'My Passport' }),
        createMockDocument({ id: 'doc-2', document_type: 'passport', title: 'Old Passport' }),
        createMockDocument({ id: 'doc-3', document_type: 'visa', title: 'My Visa' }),
      ]
      useDocumentStore.getState().setDocuments(docs)
      useDocumentStore.getState().setFilterType('passport')
      useDocumentStore.getState().setSearchQuery('my')

      const filtered = useDocumentStore.getState().getFilteredDocuments()
      expect(filtered).toHaveLength(1)
      expect(filtered[0].title).toBe('My Passport')
    })
  })

  describe('getDocumentsByType', () => {
    it('should return documents of specific type', () => {
      const docs = [
        createMockDocument({ id: 'doc-1', document_type: 'passport' }),
        createMockDocument({ id: 'doc-2', document_type: 'visa' }),
        createMockDocument({ id: 'doc-3', document_type: 'passport' }),
      ]
      useDocumentStore.getState().setDocuments(docs)

      const passports = useDocumentStore.getState().getDocumentsByType('passport')
      expect(passports).toHaveLength(2)
      expect(passports.every((d) => d.document_type === 'passport')).toBe(true)
    })

    it('should return empty array if no documents of type exist', () => {
      const docs = [createMockDocument({ id: 'doc-1', document_type: 'passport' })]
      useDocumentStore.getState().setDocuments(docs)

      const visas = useDocumentStore.getState().getDocumentsByType('visa')
      expect(visas).toHaveLength(0)
    })
  })

  describe('getExpiringDocuments', () => {
    it('should return documents expiring within default 30 days', () => {
      const now = new Date()
      const in15Days = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000)
      const in45Days = new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000)

      const docs = [
        createMockDocument({ id: 'doc-1', expiry_date: in15Days.toISOString() }),
        createMockDocument({ id: 'doc-2', expiry_date: in45Days.toISOString() }),
        createMockDocument({ id: 'doc-3', expiry_date: null }),
      ]
      useDocumentStore.getState().setDocuments(docs)

      const expiring = useDocumentStore.getState().getExpiringDocuments()
      expect(expiring).toHaveLength(1)
      expect(expiring[0].id).toBe('doc-1')
    })

    it('should accept custom days parameter', () => {
      const now = new Date()
      const in45Days = new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000)

      const docs = [
        createMockDocument({ id: 'doc-1', expiry_date: in45Days.toISOString() }),
      ]
      useDocumentStore.getState().setDocuments(docs)

      const expiring = useDocumentStore.getState().getExpiringDocuments(60)
      expect(expiring).toHaveLength(1)
    })

    it('should not include already expired documents', () => {
      const now = new Date()
      const pastDate = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)

      const docs = [
        createMockDocument({ id: 'doc-1', expiry_date: pastDate.toISOString() }),
      ]
      useDocumentStore.getState().setDocuments(docs)

      const expiring = useDocumentStore.getState().getExpiringDocuments()
      expect(expiring).toHaveLength(0)
    })

    it('should return empty array when no documents have expiry dates', () => {
      const docs = [
        createMockDocument({ id: 'doc-1', expiry_date: null }),
        createMockDocument({ id: 'doc-2', expiry_date: null }),
      ]
      useDocumentStore.getState().setDocuments(docs)

      const expiring = useDocumentStore.getState().getExpiringDocuments()
      expect(expiring).toHaveLength(0)
    })
  })

  describe('getUploadedTypes', () => {
    it('should return unique document types', () => {
      const docs = [
        createMockDocument({ id: 'doc-1', document_type: 'passport' }),
        createMockDocument({ id: 'doc-2', document_type: 'visa' }),
        createMockDocument({ id: 'doc-3', document_type: 'passport' }),
      ]
      useDocumentStore.getState().setDocuments(docs)

      const types = useDocumentStore.getState().getUploadedTypes()
      expect(types).toHaveLength(2)
      expect(types).toContain('passport')
      expect(types).toContain('visa')
    })

    it('should return empty array when no documents', () => {
      const types = useDocumentStore.getState().getUploadedTypes()
      expect(types).toHaveLength(0)
    })
  })
})
