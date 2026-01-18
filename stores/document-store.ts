// TODO: Document vault state management
// - Document list
// - Upload/delete actions
// - Expiry tracking

import { create } from 'zustand'

interface Document {
  id: string
  name: string
  type: string
  fileUrl: string
  uploadDate: Date
  expiryDate?: Date
  notes?: string
}

interface DocumentState {
  documents: Document[]
  isLoading: boolean
  addDocument: (doc: Omit<Document, 'id'>) => void
  removeDocument: (id: string) => void
  updateDocument: (id: string, updates: Partial<Document>) => void
  setDocuments: (docs: Document[]) => void
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  isLoading: false,
  addDocument: (doc) => set((state) => ({
    documents: [...state.documents, { ...doc, id: crypto.randomUUID() }]
  })),
  removeDocument: (id) => set((state) => ({
    documents: state.documents.filter(d => d.id !== id)
  })),
  updateDocument: (id, updates) => set((state) => ({
    documents: state.documents.map(d => d.id === id ? { ...d, ...updates } : d)
  })),
  setDocuments: (docs) => set({ documents: docs }),
}))
