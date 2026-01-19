'use client'

import { useEffect, useCallback, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useDocumentStore } from '@/stores/document-store'
import {
  fetchUserDocuments,
  uploadDocument as uploadDocumentApi,
  updateDocument as updateDocumentApi,
  deleteDocument as deleteDocumentApi,
  getDocumentUrl,
  downloadDocument as downloadDocumentApi,
} from '@/lib/supabase/queries/document'
import type { DocumentType, UpdateDocumentInput } from '@/types/document'

export function useDocuments() {
  const store = useDocumentStore()
  const [userId, setUserId] = useState<string | null>(null)
  const supabase = createClient()

  // Get the authenticated user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserId(user?.id || null)
    }
    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  // Fetch documents when user is available
  useEffect(() => {
    if (!userId) {
      store.setDocuments([])
      store.setLoading(false)
      return
    }

    const loadDocuments = async () => {
      store.setLoading(true)
      store.setError(null)

      try {
        const documents = await fetchUserDocuments(userId)
        store.setDocuments(documents)
      } catch (error) {
        console.error('Failed to load documents:', error)
      } finally {
        store.setLoading(false)
      }
    }

    loadDocuments()
  }, [userId])

  // Upload document
  const handleUpload = useCallback(
    async (
      file: File,
      metadata: {
        document_type: DocumentType
        title?: string
        expiry_date?: string
        notes?: string
      }
    ) => {
      if (!userId) throw new Error('User not authenticated')

      store.setUploading(true)
      store.setUploadProgress(0)
      store.setError(null)

      try {
        // Simulate progress (actual upload doesn't provide progress events)
        const progressInterval = setInterval(() => {
          const current = useDocumentStore.getState().uploadProgress
          if (current >= 90) {
            clearInterval(progressInterval)
            return
          }
          store.setUploadProgress(current + 10)
        }, 200)

        const document = await uploadDocumentApi(userId, file, metadata)

        clearInterval(progressInterval)
        store.setUploadProgress(100)

        store.addDocument(document)
        store.closeUploadDialog()

        // Reset progress after a short delay
        setTimeout(() => {
          store.setUploadProgress(0)
          store.setUploading(false)
        }, 500)

        return document
      } catch (error) {
        console.error('Failed to upload document:', error)
        store.setError('Failed to upload document. Please try again.')
        store.setUploading(false)
        store.setUploadProgress(0)
        throw error
      }
    },
    [userId]
  )

  // Update document metadata
  const handleUpdate = useCallback(
    async (docId: string, input: UpdateDocumentInput) => {
      const previousDocument = store.documents.find((d) => d.id === docId)

      // Optimistic update
      store.updateDocument(docId, input)

      try {
        await updateDocumentApi(docId, input)
      } catch (error) {
        // Rollback on error
        if (previousDocument) {
          store.updateDocument(docId, previousDocument)
        }
        console.error('Failed to update document:', error)
        store.setError('Failed to update document. Please try again.')
        throw error
      }
    },
    [store.documents]
  )

  // Delete document
  const handleDelete = useCallback(
    async (docId: string, filePath: string) => {
      const previousDocuments = [...store.documents]

      // Optimistic update
      store.deleteDocument(docId)

      try {
        await deleteDocumentApi(docId, filePath)
      } catch (error) {
        // Rollback on error
        store.setDocuments(previousDocuments)
        console.error('Failed to delete document:', error)
        store.setError('Failed to delete document. Please try again.')
        throw error
      }
    },
    [store.documents]
  )

  // Get signed URL for viewing/downloading
  const getSignedUrl = useCallback(async (filePath: string) => {
    try {
      return await getDocumentUrl(filePath)
    } catch (error) {
      console.error('Failed to get document URL:', error)
      store.setError('Failed to access document. Please try again.')
      throw error
    }
  }, [])

  // Download document
  const handleDownload = useCallback(
    async (filePath: string, fileName: string) => {
      try {
        const blob = await downloadDocumentApi(filePath)
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Failed to download document:', error)
        store.setError('Failed to download document. Please try again.')
        throw error
      }
    },
    []
  )

  // View document in new tab
  const handleView = useCallback(async (filePath: string) => {
    try {
      const url = await getDocumentUrl(filePath)
      window.open(url, '_blank')
    } catch (error) {
      console.error('Failed to view document:', error)
      store.setError('Failed to view document. Please try again.')
      throw error
    }
  }, [])

  return {
    // State
    documents: store.documents,
    isLoading: store.isLoading,
    error: store.error,
    isUploading: store.isUploading,
    uploadProgress: store.uploadProgress,
    searchQuery: store.searchQuery,
    filterType: store.filterType,
    isAuthenticated: !!userId,

    // Computed
    filteredDocuments: store.getFilteredDocuments(),
    uploadedTypes: store.getUploadedTypes(),
    expiringDocuments: store.getExpiringDocuments(),
    getDocumentsByType: store.getDocumentsByType,

    // Actions
    uploadDocument: handleUpload,
    updateDocument: handleUpdate,
    deleteDocument: handleDelete,
    getSignedUrl,
    downloadDocument: handleDownload,
    viewDocument: handleView,

    // UI Actions
    setSearchQuery: store.setSearchQuery,
    setFilterType: store.setFilterType,

    // Dialog Actions
    openPreview: store.openPreview,
    closePreview: store.closePreview,
    openUploadDialog: store.openUploadDialog,
    closeUploadDialog: store.closeUploadDialog,

    // Dialog State
    previewDocument: store.previewDocument,
    uploadDialogOpen: store.uploadDialogOpen,
  }
}
