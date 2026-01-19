import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import type { Document } from '@/types/document'

// Mock the Supabase client
const mockSelect = vi.fn()
const mockEq = vi.fn()
const mockOrder = vi.fn()
const mockInsert = vi.fn()
const mockUpdate = vi.fn()
const mockDelete = vi.fn()
const mockSingle = vi.fn()
const mockUpload = vi.fn()
const mockRemove = vi.fn()
const mockCreateSignedUrl = vi.fn()
const mockDownload = vi.fn()

// Chain mock setup
const createChainMock = () => ({
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  single: mockSingle,
})

const mockFrom = vi.fn()
const mockStorage = {
  from: vi.fn(() => ({
    upload: mockUpload,
    remove: mockRemove,
    createSignedUrl: mockCreateSignedUrl,
    download: mockDownload,
  })),
}

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: mockFrom,
    storage: mockStorage,
  }),
}))

// Mock ensureProfileExists
vi.mock('@/lib/supabase/queries/checklist', () => ({
  ensureProfileExists: vi.fn().mockResolvedValue(undefined),
}))

// Import after mocks are set up
import {
  fetchUserDocuments,
  uploadDocument,
  updateDocument,
  deleteDocument,
  getDocumentUrl,
  downloadDocument,
} from '@/lib/supabase/queries/document'

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

describe('Document Queries', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchUserDocuments', () => {
    it('should fetch documents for a user', async () => {
      const mockDocs = [createMockDocument()]
      const chainMock = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockDocs, error: null }),
      }
      mockFrom.mockReturnValue(chainMock)

      const result = await fetchUserDocuments('user-1')

      expect(mockFrom).toHaveBeenCalledWith('documents')
      expect(chainMock.select).toHaveBeenCalledWith('*')
      expect(chainMock.eq).toHaveBeenCalledWith('user_id', 'user-1')
      expect(chainMock.order).toHaveBeenCalledWith('created_at', { ascending: false })
      expect(result).toEqual(mockDocs)
    })

    it('should return empty array on error', async () => {
      const chainMock = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' },
        }),
      }
      mockFrom.mockReturnValue(chainMock)

      const result = await fetchUserDocuments('user-1')

      expect(result).toEqual([])
    })

    it('should return empty array when data is null', async () => {
      const chainMock = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: null, error: null }),
      }
      mockFrom.mockReturnValue(chainMock)

      const result = await fetchUserDocuments('user-1')

      expect(result).toEqual([])
    })

    it('should handle unexpected exceptions', async () => {
      mockFrom.mockImplementation(() => {
        throw new Error('Unexpected error')
      })

      const result = await fetchUserDocuments('user-1')

      expect(result).toEqual([])
    })
  })

  describe('uploadDocument', () => {
    it('should upload file and create document record', async () => {
      const mockFile = new File(['test content'], 'test.pdf', {
        type: 'application/pdf',
      })
      const mockDocument = createMockDocument()

      mockUpload.mockResolvedValue({ error: null })
      const chainMock = {
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockDocument, error: null }),
      }
      mockFrom.mockReturnValue(chainMock)

      const result = await uploadDocument('user-1', mockFile, {
        document_type: 'passport',
        title: 'My Passport',
      })

      expect(mockStorage.from).toHaveBeenCalledWith('Documents')
      expect(mockUpload).toHaveBeenCalled()
      expect(mockFrom).toHaveBeenCalledWith('documents')
      expect(result).toEqual(mockDocument)
    })

    it('should throw error when file upload fails', async () => {
      const mockFile = new File(['test content'], 'test.pdf', {
        type: 'application/pdf',
      })

      mockUpload.mockResolvedValue({
        error: { message: 'Storage error' },
      })

      await expect(
        uploadDocument('user-1', mockFile, {
          document_type: 'passport',
        })
      ).rejects.toThrow('Storage error')
    })

    it('should clean up file when database insert fails', async () => {
      const mockFile = new File(['test content'], 'test.pdf', {
        type: 'application/pdf',
      })

      mockUpload.mockResolvedValue({ error: null })
      mockRemove.mockResolvedValue({ error: null })
      const chainMock = {
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Insert failed' },
        }),
      }
      mockFrom.mockReturnValue(chainMock)

      await expect(
        uploadDocument('user-1', mockFile, {
          document_type: 'passport',
        })
      ).rejects.toThrow('Insert failed')

      expect(mockRemove).toHaveBeenCalled()
    })

    it('should use filename as title when not provided', async () => {
      const mockFile = new File(['test content'], 'my-document.pdf', {
        type: 'application/pdf',
      })
      const mockDocument = createMockDocument({ title: 'my-document.pdf' })

      mockUpload.mockResolvedValue({ error: null })
      const chainMock = {
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockDocument, error: null }),
      }
      mockFrom.mockReturnValue(chainMock)

      await uploadDocument('user-1', mockFile, {
        document_type: 'passport',
      })

      expect(chainMock.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'my-document.pdf',
        })
      )
    })

    it('should sanitize filename in file path', async () => {
      const mockFile = new File(['test content'], 'my file (1).pdf', {
        type: 'application/pdf',
      })
      const mockDocument = createMockDocument()

      mockUpload.mockResolvedValue({ error: null })
      const chainMock = {
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockDocument, error: null }),
      }
      mockFrom.mockReturnValue(chainMock)

      await uploadDocument('user-1', mockFile, {
        document_type: 'passport',
      })

      // Verify the upload was called with a sanitized path
      const uploadCall = mockUpload.mock.calls[0]
      expect(uploadCall[0]).toMatch(/user-1\/\d+_my_file__1_.pdf/)
    })
  })

  describe('updateDocument', () => {
    it('should update document metadata', async () => {
      const mockDocument = createMockDocument({ title: 'Updated Title' })
      const chainMock = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockDocument, error: null }),
      }
      mockFrom.mockReturnValue(chainMock)

      const result = await updateDocument('doc-1', { title: 'Updated Title' })

      expect(mockFrom).toHaveBeenCalledWith('documents')
      expect(chainMock.update).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Updated Title',
        })
      )
      expect(chainMock.eq).toHaveBeenCalledWith('id', 'doc-1')
      expect(result.title).toBe('Updated Title')
    })

    it('should include updated_at timestamp', async () => {
      const mockDocument = createMockDocument()
      const chainMock = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockDocument, error: null }),
      }
      mockFrom.mockReturnValue(chainMock)

      await updateDocument('doc-1', { title: 'New Title' })

      expect(chainMock.update).toHaveBeenCalledWith(
        expect.objectContaining({
          updated_at: expect.any(String),
        })
      )
    })

    it('should throw error when update fails', async () => {
      const chainMock = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Update failed' },
        }),
      }
      mockFrom.mockReturnValue(chainMock)

      await expect(
        updateDocument('doc-1', { title: 'Updated Title' })
      ).rejects.toEqual({ message: 'Update failed' })
    })
  })

  describe('deleteDocument', () => {
    it('should delete file from storage and record from database', async () => {
      mockRemove.mockResolvedValue({ error: null })
      const chainMock = {
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ error: null }),
      }
      mockFrom.mockReturnValue(chainMock)

      await deleteDocument('doc-1', 'user-1/file.pdf')

      expect(mockStorage.from).toHaveBeenCalledWith('Documents')
      expect(mockRemove).toHaveBeenCalledWith(['user-1/file.pdf'])
      expect(mockFrom).toHaveBeenCalledWith('documents')
      expect(chainMock.delete).toHaveBeenCalled()
      expect(chainMock.eq).toHaveBeenCalledWith('id', 'doc-1')
    })

    it('should continue deleting database record even if storage delete fails', async () => {
      mockRemove.mockResolvedValue({ error: { message: 'Storage delete failed' } })
      const chainMock = {
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ error: null }),
      }
      mockFrom.mockReturnValue(chainMock)

      // Should not throw
      await deleteDocument('doc-1', 'user-1/file.pdf')

      expect(chainMock.delete).toHaveBeenCalled()
    })

    it('should throw error when database delete fails', async () => {
      mockRemove.mockResolvedValue({ error: null })
      const chainMock = {
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ error: { message: 'Delete failed' } }),
      }
      mockFrom.mockReturnValue(chainMock)

      await expect(
        deleteDocument('doc-1', 'user-1/file.pdf')
      ).rejects.toEqual({ message: 'Delete failed' })
    })
  })

  describe('getDocumentUrl', () => {
    it('should create a signed URL', async () => {
      mockCreateSignedUrl.mockResolvedValue({
        data: { signedUrl: 'https://example.com/signed-url' },
        error: null,
      })

      const result = await getDocumentUrl('user-1/file.pdf')

      expect(mockStorage.from).toHaveBeenCalledWith('Documents')
      expect(mockCreateSignedUrl).toHaveBeenCalledWith('user-1/file.pdf', 3600)
      expect(result).toBe('https://example.com/signed-url')
    })

    it('should throw error when creating signed URL fails', async () => {
      mockCreateSignedUrl.mockResolvedValue({
        data: null,
        error: { message: 'Failed to create URL' },
      })

      await expect(getDocumentUrl('user-1/file.pdf')).rejects.toEqual({
        message: 'Failed to create URL',
      })
    })
  })

  describe('downloadDocument', () => {
    it('should download document blob', async () => {
      const mockBlob = new Blob(['test content'], { type: 'application/pdf' })
      mockDownload.mockResolvedValue({ data: mockBlob, error: null })

      const result = await downloadDocument('user-1/file.pdf')

      expect(mockStorage.from).toHaveBeenCalledWith('Documents')
      expect(mockDownload).toHaveBeenCalledWith('user-1/file.pdf')
      expect(result).toBe(mockBlob)
    })

    it('should throw error when download fails', async () => {
      mockDownload.mockResolvedValue({
        data: null,
        error: { message: 'Download failed' },
      })

      await expect(downloadDocument('user-1/file.pdf')).rejects.toEqual({
        message: 'Download failed',
      })
    })
  })
})
