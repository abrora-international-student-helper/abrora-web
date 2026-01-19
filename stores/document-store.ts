import { create } from 'zustand'
import type { Document, DocumentType } from '@/types/document'

interface DocumentState {
  // Data
  documents: Document[]

  // UI State
  isLoading: boolean
  error: string | null
  searchQuery: string
  filterType: DocumentType | 'all'
  uploadProgress: number
  isUploading: boolean

  // Dialog State
  previewDocument: Document | null
  uploadDialogOpen: boolean

  // Actions - Data
  setDocuments: (documents: Document[]) => void
  addDocument: (document: Document) => void
  updateDocument: (id: string, updates: Partial<Document>) => void
  deleteDocument: (id: string) => void

  // Actions - UI
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSearchQuery: (query: string) => void
  setFilterType: (type: DocumentType | 'all') => void
  setUploadProgress: (progress: number) => void
  setUploading: (uploading: boolean) => void

  // Actions - Dialogs
  openPreview: (document: Document) => void
  closePreview: () => void
  openUploadDialog: () => void
  closeUploadDialog: () => void

  // Computed
  getFilteredDocuments: () => Document[]
  getDocumentsByType: (type: DocumentType) => Document[]
  getExpiringDocuments: (days?: number) => Document[]
  getUploadedTypes: () => DocumentType[]
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  // Initial state
  documents: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  filterType: 'all',
  uploadProgress: 0,
  isUploading: false,
  previewDocument: null,
  uploadDialogOpen: false,

  // Data actions
  setDocuments: (documents) => set({ documents }),

  addDocument: (document) =>
    set((state) => ({
      documents: [document, ...state.documents],
    })),

  updateDocument: (id, updates) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    })),

  deleteDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
      previewDocument:
        state.previewDocument?.id === id ? null : state.previewDocument,
    })),

  // UI actions
  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setFilterType: (filterType) => set({ filterType }),

  setUploadProgress: (uploadProgress) => set({ uploadProgress }),

  setUploading: (isUploading) => set({ isUploading }),

  // Dialog actions
  openPreview: (document) => set({ previewDocument: document }),

  closePreview: () => set({ previewDocument: null }),

  openUploadDialog: () => set({ uploadDialogOpen: true }),

  closeUploadDialog: () => set({ uploadDialogOpen: false, uploadProgress: 0 }),

  // Computed values
  getFilteredDocuments: () => {
    const { documents, searchQuery, filterType } = get()

    return documents.filter((doc) => {
      // Type filter
      if (filterType !== 'all' && doc.document_type !== filterType) {
        return false
      }

      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        const matchesTitle = doc.title.toLowerCase().includes(searchLower)
        const matchesType = doc.document_type.toLowerCase().includes(searchLower)
        const matchesNotes = doc.notes?.toLowerCase().includes(searchLower)
        if (!matchesTitle && !matchesType && !matchesNotes) {
          return false
        }
      }

      return true
    })
  },

  getDocumentsByType: (type) => {
    const { documents } = get()
    return documents.filter((doc) => doc.document_type === type)
  },

  getExpiringDocuments: (days = 30) => {
    const { documents } = get()
    const now = new Date()
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

    return documents.filter((doc) => {
      if (!doc.expiry_date) return false
      const expiryDate = new Date(doc.expiry_date)
      return expiryDate <= futureDate && expiryDate >= now
    })
  },

  getUploadedTypes: () => {
    const { documents } = get()
    return [...new Set(documents.map((doc) => doc.document_type))]
  },
}))
