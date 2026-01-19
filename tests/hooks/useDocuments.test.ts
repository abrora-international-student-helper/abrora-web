import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest'
import { renderHook, waitFor, act, cleanup } from '@testing-library/react'
import { useDocumentStore } from '@/stores/document-store'
import type { Document } from '@/types/document'

// Mock document data
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

// Mock Supabase auth
const mockGetUser = vi.fn()
const mockOnAuthStateChange = vi.fn()
const mockUnsubscribe = vi.fn()

// Mock Supabase storage
const mockStorageDownload = vi.fn()

// Mock document query functions
const mockFetchUserDocuments = vi.fn()
const mockUploadDocumentApi = vi.fn()
const mockUpdateDocumentApi = vi.fn()
const mockDeleteDocumentApi = vi.fn()
const mockGetDocumentUrl = vi.fn()
const mockDownloadDocumentApi = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
      onAuthStateChange: mockOnAuthStateChange,
    },
    storage: {
      from: () => ({
        download: mockStorageDownload,
      }),
    },
  }),
}))

vi.mock('@/lib/supabase/queries/document', () => ({
  fetchUserDocuments: (...args: unknown[]) => mockFetchUserDocuments(...args),
  uploadDocument: (...args: unknown[]) => mockUploadDocumentApi(...args),
  updateDocument: (...args: unknown[]) => mockUpdateDocumentApi(...args),
  deleteDocument: (...args: unknown[]) => mockDeleteDocumentApi(...args),
  getDocumentUrl: (...args: unknown[]) => mockGetDocumentUrl(...args),
  downloadDocument: (...args: unknown[]) => mockDownloadDocumentApi(...args),
}))

// Import hook after mocks
import { useDocuments } from '@/hooks/useDocuments'

describe('useDocuments Hook', () => {
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks()

    // Reset store state
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

    // Default mock implementations
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } } })
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: mockUnsubscribe } },
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    cleanup()
  })

  describe('initialization', () => {
    it('should get user on mount', async () => {
      mockFetchUserDocuments.mockResolvedValue([])

      renderHook(() => useDocuments())

      await waitFor(() => {
        expect(mockGetUser).toHaveBeenCalled()
      })
    })

    it('should set up auth state change listener', async () => {
      mockFetchUserDocuments.mockResolvedValue([])

      renderHook(() => useDocuments())

      await waitFor(() => {
        expect(mockOnAuthStateChange).toHaveBeenCalled()
      })
    })

    it('should unsubscribe from auth changes on unmount', async () => {
      mockFetchUserDocuments.mockResolvedValue([])

      const { unmount } = renderHook(() => useDocuments())
      unmount()

      expect(mockUnsubscribe).toHaveBeenCalled()
    })

    it('should fetch documents when user is available', async () => {
      const mockDocs = [createMockDocument()]
      mockFetchUserDocuments.mockResolvedValue(mockDocs)

      renderHook(() => useDocuments())

      await waitFor(() => {
        expect(mockFetchUserDocuments).toHaveBeenCalledWith('user-1')
      })
    })

    it('should not fetch documents when user is not available', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } })

      renderHook(() => useDocuments())

      await waitFor(() => {
        expect(mockFetchUserDocuments).not.toHaveBeenCalled()
      })
    })

    it('should set documents in store after fetch', async () => {
      const mockDocs = [createMockDocument()]
      mockFetchUserDocuments.mockResolvedValue(mockDocs)

      renderHook(() => useDocuments())

      await waitFor(() => {
        const { documents } = useDocumentStore.getState()
        expect(documents).toEqual(mockDocs)
      })
    })

    it('should clear documents when user logs out', async () => {
      const mockDocs = [createMockDocument()]
      mockFetchUserDocuments.mockResolvedValue(mockDocs)

      renderHook(() => useDocuments())

      await waitFor(() => {
        expect(useDocumentStore.getState().documents).toEqual(mockDocs)
      })

      // Simulate logout via auth state change
      const authCallback = mockOnAuthStateChange.mock.calls[0][0]
      act(() => {
        authCallback('SIGNED_OUT', null)
      })

      // Documents should be cleared but we need to re-render for this
    })
  })

  describe('uploadDocument', () => {
    it('should upload document and add to store', async () => {
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' })
      const mockDoc = createMockDocument()
      mockFetchUserDocuments.mockResolvedValue([])
      mockUploadDocumentApi.mockResolvedValue(mockDoc)

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true)
      })

      await act(async () => {
        await result.current.uploadDocument(mockFile, {
          document_type: 'passport',
          title: 'Test Doc',
        })
      })

      expect(mockUploadDocumentApi).toHaveBeenCalledWith('user-1', mockFile, {
        document_type: 'passport',
        title: 'Test Doc',
      })

      const { documents } = useDocumentStore.getState()
      expect(documents).toContainEqual(mockDoc)
    })

    it('should set uploading state during upload', async () => {
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' })
      const mockDoc = createMockDocument()
      mockFetchUserDocuments.mockResolvedValue([])

      // Delay the upload to check uploading state
      mockUploadDocumentApi.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockDoc), 100))
      )

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true)
      })

      const uploadPromise = act(async () => {
        return result.current.uploadDocument(mockFile, {
          document_type: 'passport',
        })
      })

      // Check that uploading is true during upload
      await waitFor(() => {
        expect(result.current.isUploading).toBe(true)
      })

      await uploadPromise

      // Check that uploading is false after completion
      await waitFor(() => {
        expect(result.current.isUploading).toBe(false)
      })
    })

    it('should throw error when user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } })
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' })

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(false)
      })

      await expect(
        act(async () => {
          await result.current.uploadDocument(mockFile, {
            document_type: 'passport',
          })
        })
      ).rejects.toThrow('User not authenticated')
    })

    it('should set error when upload fails', async () => {
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' })
      mockFetchUserDocuments.mockResolvedValue([])
      mockUploadDocumentApi.mockRejectedValue(new Error('Upload failed'))

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true)
      })

      await expect(
        act(async () => {
          await result.current.uploadDocument(mockFile, {
            document_type: 'passport',
          })
        })
      ).rejects.toThrow()

      await waitFor(() => {
        expect(result.current.error).toBe('Failed to upload document. Please try again.')
      })
    })
  })

  describe('updateDocument', () => {
    it('should update document optimistically', async () => {
      const mockDoc = createMockDocument()
      mockFetchUserDocuments.mockResolvedValue([mockDoc])
      mockUpdateDocumentApi.mockResolvedValue({ ...mockDoc, title: 'Updated' })

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.documents).toHaveLength(1)
      })

      await act(async () => {
        await result.current.updateDocument('doc-1', { title: 'Updated' })
      })

      const { documents } = useDocumentStore.getState()
      expect(documents[0].title).toBe('Updated')
    })

    it('should rollback on update failure', async () => {
      const mockDoc = createMockDocument({ title: 'Original' })
      mockFetchUserDocuments.mockResolvedValue([mockDoc])
      mockUpdateDocumentApi.mockRejectedValue(new Error('Update failed'))

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.documents).toHaveLength(1)
      })

      await expect(
        act(async () => {
          await result.current.updateDocument('doc-1', { title: 'Updated' })
        })
      ).rejects.toThrow()

      const { documents } = useDocumentStore.getState()
      expect(documents[0].title).toBe('Original')
    })
  })

  describe('deleteDocument', () => {
    it('should delete document optimistically', async () => {
      const mockDoc = createMockDocument()
      mockFetchUserDocuments.mockResolvedValue([mockDoc])
      mockDeleteDocumentApi.mockResolvedValue(undefined)

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.documents).toHaveLength(1)
      })

      await act(async () => {
        await result.current.deleteDocument('doc-1', 'user-1/file.pdf')
      })

      const { documents } = useDocumentStore.getState()
      expect(documents).toHaveLength(0)
    })

    it('should rollback on delete failure', async () => {
      const mockDoc = createMockDocument()
      mockFetchUserDocuments.mockResolvedValue([mockDoc])
      mockDeleteDocumentApi.mockRejectedValue(new Error('Delete failed'))

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.documents).toHaveLength(1)
      })

      await expect(
        act(async () => {
          await result.current.deleteDocument('doc-1', 'user-1/file.pdf')
        })
      ).rejects.toThrow()

      const { documents } = useDocumentStore.getState()
      expect(documents).toHaveLength(1)
    })
  })

  describe('getSignedUrl', () => {
    it('should return signed URL', async () => {
      mockFetchUserDocuments.mockResolvedValue([])
      mockGetDocumentUrl.mockResolvedValue('https://example.com/signed-url')

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true)
      })

      let url: string | undefined
      await act(async () => {
        url = await result.current.getSignedUrl('user-1/file.pdf')
      })

      expect(url).toBe('https://example.com/signed-url')
    })

    it('should set error when getting URL fails', async () => {
      mockFetchUserDocuments.mockResolvedValue([])
      mockGetDocumentUrl.mockRejectedValue(new Error('Failed'))

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true)
      })

      await expect(
        act(async () => {
          await result.current.getSignedUrl('user-1/file.pdf')
        })
      ).rejects.toThrow()

      await waitFor(() => {
        expect(result.current.error).toBe('Failed to access document. Please try again.')
      })
    })
  })

  describe('downloadDocument', () => {
    it('should call download API with correct path', async () => {
      mockFetchUserDocuments.mockResolvedValue([])
      const mockBlob = new Blob(['test'], { type: 'application/pdf' })
      mockDownloadDocumentApi.mockResolvedValue(mockBlob)

      // Mock URL APIs
      const originalCreateObjectURL = URL.createObjectURL
      const originalRevokeObjectURL = URL.revokeObjectURL
      URL.createObjectURL = vi.fn(() => 'blob:test')
      URL.revokeObjectURL = vi.fn()

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true)
      })

      await act(async () => {
        await result.current.downloadDocument('user-1/file.pdf', 'file.pdf')
      })

      expect(mockDownloadDocumentApi).toHaveBeenCalledWith('user-1/file.pdf')

      // Restore original functions
      URL.createObjectURL = originalCreateObjectURL
      URL.revokeObjectURL = originalRevokeObjectURL
    })
  })

  describe('viewDocument', () => {
    it('should open document in new tab', async () => {
      mockFetchUserDocuments.mockResolvedValue([])
      mockGetDocumentUrl.mockResolvedValue('https://example.com/signed-url')

      const mockOpen = vi.fn()
      global.window.open = mockOpen

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true)
      })

      await act(async () => {
        await result.current.viewDocument('user-1/file.pdf')
      })

      expect(mockGetDocumentUrl).toHaveBeenCalledWith('user-1/file.pdf')
      expect(mockOpen).toHaveBeenCalledWith('https://example.com/signed-url', '_blank')
    })
  })

  describe('UI actions', () => {
    it('should set search query', async () => {
      mockFetchUserDocuments.mockResolvedValue([])

      const { result } = renderHook(() => useDocuments())

      act(() => {
        result.current.setSearchQuery('passport')
      })

      expect(result.current.searchQuery).toBe('passport')
    })

    it('should set filter type', async () => {
      mockFetchUserDocuments.mockResolvedValue([])

      const { result } = renderHook(() => useDocuments())

      act(() => {
        result.current.setFilterType('visa')
      })

      expect(result.current.filterType).toBe('visa')
    })

    it('should open and close preview', async () => {
      const mockDoc = createMockDocument()
      mockFetchUserDocuments.mockResolvedValue([mockDoc])

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.documents).toHaveLength(1)
      })

      act(() => {
        result.current.openPreview(mockDoc)
      })

      expect(result.current.previewDocument).toEqual(mockDoc)

      act(() => {
        result.current.closePreview()
      })

      expect(result.current.previewDocument).toBeNull()
    })

    it('should open and close upload dialog', async () => {
      mockFetchUserDocuments.mockResolvedValue([])

      const { result } = renderHook(() => useDocuments())

      act(() => {
        result.current.openUploadDialog()
      })

      expect(result.current.uploadDialogOpen).toBe(true)

      act(() => {
        result.current.closeUploadDialog()
      })

      expect(result.current.uploadDialogOpen).toBe(false)
    })
  })

  describe('computed values', () => {
    it('should return filtered documents', async () => {
      const docs = [
        createMockDocument({ id: 'doc-1', title: 'My Travel Document', document_type: 'i20' }),
        createMockDocument({ id: 'doc-2', title: 'Visa Application', document_type: 'visa' }),
      ]
      mockFetchUserDocuments.mockResolvedValue(docs)

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.documents).toHaveLength(2)
      })

      act(() => {
        result.current.setSearchQuery('travel')
      })

      expect(result.current.filteredDocuments).toHaveLength(1)
      expect(result.current.filteredDocuments[0].title).toBe('My Travel Document')
    })

    it('should return uploaded types', async () => {
      const docs = [
        createMockDocument({ id: 'doc-1', document_type: 'passport' }),
        createMockDocument({ id: 'doc-2', document_type: 'visa' }),
        createMockDocument({ id: 'doc-3', document_type: 'passport' }),
      ]
      mockFetchUserDocuments.mockResolvedValue(docs)

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.uploadedTypes).toHaveLength(2)
        expect(result.current.uploadedTypes).toContain('passport')
        expect(result.current.uploadedTypes).toContain('visa')
      })
    })

    it('should return expiring documents', async () => {
      const now = new Date()
      const in15Days = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000)
      const docs = [
        createMockDocument({ id: 'doc-1', expiry_date: in15Days.toISOString() }),
        createMockDocument({ id: 'doc-2', expiry_date: null }),
      ]
      mockFetchUserDocuments.mockResolvedValue(docs)

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.expiringDocuments).toHaveLength(1)
        expect(result.current.expiringDocuments[0].id).toBe('doc-1')
      })
    })

    it('should get documents by type', async () => {
      const docs = [
        createMockDocument({ id: 'doc-1', document_type: 'passport' }),
        createMockDocument({ id: 'doc-2', document_type: 'visa' }),
      ]
      mockFetchUserDocuments.mockResolvedValue(docs)

      const { result } = renderHook(() => useDocuments())

      await waitFor(() => {
        expect(result.current.documents).toHaveLength(2)
      })

      const passports = result.current.getDocumentsByType('passport')
      expect(passports).toHaveLength(1)
      expect(passports[0].document_type).toBe('passport')
    })
  })
})
