'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Upload,
  Trash2,
  Download,
  Eye,
  Search,
  MoreVertical,
  Shield,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Grid3X3,
  List,
  Calendar,
  X,
  Image as ImageIcon,
  FileIcon,
  StickyNote,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDocuments } from '@/hooks/useDocuments'
import { documentCategories, type DocumentType, type Document } from '@/types/document'

type ViewMode = 'grid' | 'list'

// Pending upload file type
interface PendingFile {
  file: File
  preview: string
  type: DocumentType
  customName: string
  notes: string
}

export default function DocumentsPage() {
  const {
    filteredDocuments,
    isLoading,
    error,
    isUploading,
    uploadProgress,
    searchQuery,
    uploadedTypes,
    uploadDocument,
    deleteDocument,
    downloadDocument,
    getSignedUrl,
    setSearchQuery,
    previewDocument,
    openPreview,
    closePreview,
  } = useDocuments()

  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedType, setSelectedType] = useState<DocumentType>('passport')
  const [customName, setCustomName] = useState('')
  const [notes, setNotes] = useState('')
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoadingPreview, setIsLoadingPreview] = useState(false)
  const [thumbnailUrls, setThumbnailUrls] = useState<Record<string, string>>({})
  const [showSecurityInfo, setShowSecurityInfo] = useState(false)

  // Load thumbnail URLs for documents
  useEffect(() => {
    const loadThumbnails = async () => {
      const newUrls: Record<string, string> = {}
      for (const doc of filteredDocuments) {
        if (!thumbnailUrls[doc.id] && (doc.mime_type?.startsWith('image/') || doc.mime_type === 'application/pdf')) {
          try {
            const url = await getSignedUrl(doc.file_path)
            newUrls[doc.id] = url
          } catch (err) {
            // Silently fail for thumbnails
          }
        }
      }
      if (Object.keys(newUrls).length > 0) {
        setThumbnailUrls(prev => ({ ...prev, ...newUrls }))
      }
    }
    loadThumbnails()
  }, [filteredDocuments, getSignedUrl])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Limit to 3 files
      const filesToAdd = acceptedFiles.slice(0, 3 - pendingFiles.length)

      const newPendingFiles: PendingFile[] = filesToAdd.map((file) => ({
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
        type: selectedType,
        customName: selectedType === 'other' ? '' : file.name,
        notes: '',
      }))

      setPendingFiles((prev) => [...prev, ...newPendingFiles].slice(0, 3))
    },
    [selectedType, pendingFiles.length]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxSize: 10 * 1024 * 1024,
    disabled: isUploading || pendingFiles.length >= 3,
    maxFiles: 3,
  })

  const removePendingFile = (index: number) => {
    setPendingFiles((prev) => {
      const newFiles = [...prev]
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const updatePendingFile = (index: number, updates: Partial<PendingFile>) => {
    setPendingFiles((prev) => {
      const newFiles = [...prev]
      newFiles[index] = { ...newFiles[index], ...updates }
      return newFiles
    })
  }

  const handleUploadAll = async () => {
    // Validate all pending files
    for (const pf of pendingFiles) {
      if (pf.type === 'other' && !pf.customName.trim()) {
        alert('Please enter a document name for all "Other" type documents')
        return
      }
    }

    // Upload each file
    for (const pf of pendingFiles) {
      const title = pf.type === 'other' ? pf.customName.trim() : pf.customName || pf.file.name
      try {
        await uploadDocument(pf.file, {
          document_type: pf.type,
          title,
          notes: pf.notes || undefined,
        })
      } catch (err) {
        // Error handled in hook
      }
    }

    // Clear pending files
    pendingFiles.forEach(pf => {
      if (pf.preview) URL.revokeObjectURL(pf.preview)
    })
    setPendingFiles([])
  }

  const handleDelete = async (doc: Document) => {
    if (confirm(`Are you sure you want to delete "${doc.title}"?`)) {
      try {
        await deleteDocument(doc.id, doc.file_path)
        setThumbnailUrls(prev => {
          const newUrls = { ...prev }
          delete newUrls[doc.id]
          return newUrls
        })
      } catch (err) {
        // Error handled in hook
      }
    }
  }

  const handleView = async (doc: Document) => {
    openPreview(doc)
    setIsLoadingPreview(true)
    setPreviewUrl(null)
    try {
      const url = await getSignedUrl(doc.file_path)
      setPreviewUrl(url)
    } catch (err) {
      // Error handled in hook
    } finally {
      setIsLoadingPreview(false)
    }
  }

  const handleDownload = async (doc: Document) => {
    try {
      await downloadDocument(doc.file_path, doc.title)
    } catch (err) {
      // Error handled in hook
    }
  }

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getDocumentTypeName = (type: DocumentType) => {
    const category = documentCategories.find((c) => c.id === type)
    return category?.name || type
  }

  const isExpiringSoon = (expiryDate: string | null) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const now = new Date()
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0
  }

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
  }

  const requiredDocs = documentCategories.filter((t) => t.required)
  const uploadedRequired = requiredDocs.filter((t) => uploadedTypes.includes(t.id))
  const completionPercent = requiredDocs.length > 0
    ? Math.round((uploadedRequired.length / requiredDocs.length) * 100)
    : 0

  // Handle clicking on a document category to view that document
  const handleCategoryClick = (docType: DocumentType) => {
    const doc = filteredDocuments.find(d => d.document_type === docType)
    if (doc) {
      handleView(doc)
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Document Vault</h1>
          <p className="text-gray-500 mt-1">Securely store and manage your important documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Shield className="h-3 w-3" />
            Encrypted Storage
          </Badge>
        </div>
      </div>

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Banner */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">Document Vault Progress</h3>
              <p className="text-sm text-gray-600 mt-1">
                {uploadedRequired.length} of {requiredDocs.length} required documents uploaded
              </p>
            </div>
            <div className="w-full sm:w-48">
              <Progress value={completionPercent} className="h-2" />
              <p className="text-xs text-gray-500 mt-1 text-right">{completionPercent}% complete</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area & Documents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Zone */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Upload Documents</CardTitle>
              <CardDescription>Upload up to 3 files at once (PDF, PNG, JPG - max 10MB each)</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Document Type Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Document Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as DocumentType)}
                  className="w-full sm:w-64 px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {documentCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? 'border-blue-500 bg-blue-50'
                    : pendingFiles.length >= 3
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                    : isUploading
                    ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-3">
                    <Upload className="h-5 w-5 text-blue-600" />
                  </div>
                  {isDragActive ? (
                    <p className="text-blue-600 font-medium">Drop your files here</p>
                  ) : pendingFiles.length >= 3 ? (
                    <p className="text-gray-500">Maximum 3 files reached</p>
                  ) : (
                    <>
                      <p className="font-medium text-gray-900">
                        Drag and drop files, or <span className="text-blue-600">browse</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {3 - pendingFiles.length} file{3 - pendingFiles.length !== 1 ? 's' : ''} remaining
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Pending Files */}
              <AnimatePresence>
                {pendingFiles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-3"
                  >
                    {pendingFiles.map((pf, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-start gap-3">
                          {/* Thumbnail */}
                          <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {pf.preview ? (
                              <img src={pf.preview} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <FileIcon className="h-6 w-6 text-gray-400" />
                            )}
                          </div>

                          {/* File Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <select
                                value={pf.type}
                                onChange={(e) => updatePendingFile(index, { type: e.target.value as DocumentType })}
                                className="text-sm border border-gray-200 rounded-md px-2 py-1 bg-white"
                              >
                                {documentCategories.map((cat) => (
                                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                              </select>
                              <span className="text-xs text-gray-500">{formatFileSize(pf.file.size)}</span>
                            </div>

                            {/* Document Name */}
                            <input
                              type="text"
                              value={pf.customName}
                              onChange={(e) => updatePendingFile(index, { customName: e.target.value })}
                              placeholder={pf.type === 'other' ? 'Document name (required)' : 'Document name'}
                              className={`w-full text-sm border rounded-md px-2 py-1 mb-2 ${
                                pf.type === 'other' && !pf.customName.trim()
                                  ? 'border-red-300 focus:ring-red-500'
                                  : 'border-gray-200 focus:ring-blue-500'
                              } focus:outline-none focus:ring-2`}
                            />

                            {/* Notes */}
                            <input
                              type="text"
                              value={pf.notes}
                              onChange={(e) => updatePendingFile(index, { notes: e.target.value })}
                              placeholder="Add notes (optional)"
                              className="w-full text-sm border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removePendingFile(index)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <X className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Upload Button */}
                    <button
                      onClick={handleUploadAll}
                      disabled={isUploading}
                      className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading... {uploadProgress}%
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Upload {pendingFiles.length} file{pendingFiles.length !== 1 ? 's' : ''}
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Documents List */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle>My Documents ({filteredDocuments.length})</CardTitle>
                <div className="flex items-center gap-2">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40"
                    />
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors ${
                        viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-500'
                      }`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors ${
                        viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-500'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 mx-auto mb-3 text-blue-600 animate-spin" />
                  <p className="text-gray-500">Loading documents...</p>
                </div>
              ) : filteredDocuments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>{searchQuery ? 'No documents found' : 'No documents uploaded yet'}</p>
                  {!searchQuery && <p className="text-sm mt-1">Upload your first document above</p>}
                </div>
              ) : viewMode === 'grid' ? (
                /* Grid View */
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {filteredDocuments.map((doc) => (
                    <motion.div
                      key={doc.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Thumbnail */}
                      <div
                        className="aspect-[4/3] bg-gray-100 flex items-center justify-center cursor-pointer relative overflow-hidden"
                        onClick={() => handleView(doc)}
                      >
                        {thumbnailUrls[doc.id] && doc.mime_type?.startsWith('image/') ? (
                          <img
                            src={thumbnailUrls[doc.id]}
                            alt={doc.title}
                            className="w-full h-full object-cover"
                          />
                        ) : doc.mime_type === 'application/pdf' ? (
                          <div className="flex flex-col items-center">
                            <FileText className="h-10 w-10 text-red-500" />
                            <span className="text-xs text-gray-500 mt-1">PDF</span>
                          </div>
                        ) : (
                          <FileIcon className="h-10 w-10 text-gray-400" />
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="h-6 w-6 text-white" />
                        </div>

                        {/* Expiry Badge */}
                        {isExpired(doc.expiry_date) && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-red-500 text-white text-xs">Expired</Badge>
                          </div>
                        )}
                        {isExpiringSoon(doc.expiry_date) && !isExpired(doc.expiry_date) && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-yellow-500 text-white text-xs">Expiring Soon</Badge>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-3">
                        <p className="font-medium text-sm text-gray-900 truncate" title={doc.title}>
                          {doc.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs px-1.5 py-0">
                            {getDocumentTypeName(doc.document_type)}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                          <span>{formatFileSize(doc.file_size)}</span>
                          <span>{formatDate(doc.created_at)}</span>
                        </div>
                        {doc.notes && (
                          <div className="flex items-start gap-1 mt-2 text-xs text-gray-500">
                            <StickyNote className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            <span className="truncate">{doc.notes}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                              <MoreVertical className="h-4 w-4 text-gray-600" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(doc)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(doc)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(doc)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="space-y-3">
                  {filteredDocuments.map((doc) => (
                    <motion.div
                      key={doc.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                    >
                      {/* Thumbnail */}
                      <div
                        className="w-14 h-14 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer flex-shrink-0"
                        onClick={() => handleView(doc)}
                      >
                        {thumbnailUrls[doc.id] && doc.mime_type?.startsWith('image/') ? (
                          <img
                            src={thumbnailUrls[doc.id]}
                            alt={doc.title}
                            className="w-full h-full object-cover"
                          />
                        ) : doc.mime_type === 'application/pdf' ? (
                          <FileText className="h-6 w-6 text-red-500" />
                        ) : (
                          <FileIcon className="h-6 w-6 text-gray-400" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{doc.title}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {getDocumentTypeName(doc.document_type)}
                          </Badge>
                          <span className="text-xs text-gray-500">{formatFileSize(doc.file_size)}</span>
                          <span className="text-xs text-gray-300">•</span>
                          <span className="text-xs text-gray-500">{formatDate(doc.created_at)}</span>
                          {doc.expiry_date && (
                            <>
                              <span className="text-xs text-gray-300">•</span>
                              <span className={`text-xs flex items-center gap-1 ${
                                isExpired(doc.expiry_date) ? 'text-red-600' :
                                isExpiringSoon(doc.expiry_date) ? 'text-yellow-600' : 'text-gray-500'
                              }`}>
                                <Calendar className="h-3 w-3" />
                                Exp: {formatDate(doc.expiry_date)}
                              </span>
                            </>
                          )}
                        </div>
                        {doc.notes && (
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <StickyNote className="h-3 w-3" />
                            {doc.notes}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 rounded-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4 text-gray-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(doc)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(doc)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(doc)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Required Documents Checklist */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>Essential documents for your file</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documentCategories.map((docType) => {
                  const isUploaded = uploadedTypes.includes(docType.id)
                  return (
                    <div
                      key={docType.id}
                      onClick={() => isUploaded && handleCategoryClick(docType.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        isUploaded
                          ? 'bg-green-50 border-green-200 cursor-pointer hover:bg-green-100 hover:border-green-300'
                          : docType.required
                          ? 'bg-gray-50 border-gray-200'
                          : 'bg-gray-50/50 border-gray-100'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isUploaded ? 'bg-green-100' : 'bg-gray-200'
                        }`}
                      >
                        {isUploaded ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${isUploaded ? 'text-green-900' : 'text-gray-700'}`}>
                          {docType.name}
                          {docType.required && <span className="text-red-500 ml-1">*</span>}
                        </p>
                        <p className="text-xs text-gray-500">{docType.description}</p>
                      </div>
                      {isUploaded && (
                        <Eye className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-br from-slate-800 to-slate-900 text-white cursor-pointer hover:from-slate-700 hover:to-slate-800 transition-all"
            onClick={() => setShowSecurityInfo(true)}
          >
            <CardContent className="p-6">
              <Shield className="h-8 w-8 mb-4 text-blue-400" />
              <h3 className="font-semibold mb-2">Your data is secure</h3>
              <p className="text-sm text-slate-300 mb-3">
                Bank-level encryption protects your documents. Only you can access them.
              </p>
              <span className="text-xs text-blue-400 hover:text-blue-300">
                Learn more about our security →
              </span>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Security Info Modal */}
      <Dialog open={showSecurityInfo} onOpenChange={setShowSecurityInfo}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              How We Protect Your Documents
            </DialogTitle>
            <DialogDescription>
              Your sensitive documents are protected by multiple layers of security
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Encryption at Rest</h4>
                <p className="text-sm text-gray-500">
                  All files are encrypted using AES-256 encryption when stored on our servers.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Encryption in Transit</h4>
                <p className="text-sm text-gray-500">
                  All data transfers use TLS/SSL encryption (HTTPS) to prevent interception.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Private Access Only</h4>
                <p className="text-sm text-gray-500">
                  Only you can access your documents. No one else - not even our team - can view your files.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Temporary Access Links</h4>
                <p className="text-sm text-gray-500">
                  Document URLs expire after 15 minutes and cannot be shared or accessed by others.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Data Deletion</h4>
                <p className="text-sm text-gray-500">
                  When you delete a document or your account, all associated files are permanently removed from our servers.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500 text-center">
              Your trust is important to us. We follow industry best practices to keep your data safe.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Preview Modal */}
      <Dialog open={!!previewDocument} onOpenChange={() => { closePreview(); setPreviewUrl(null); }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{previewDocument?.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <span>{previewDocument && getDocumentTypeName(previewDocument.document_type)}</span>
              <span>•</span>
              <span>{previewDocument && formatDate(previewDocument.created_at)}</span>
              <span>•</span>
              <span>{previewDocument && formatFileSize(previewDocument.file_size)}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 min-h-0 bg-gray-100 rounded-lg overflow-hidden">
            {isLoadingPreview ? (
              <div className="w-full h-96 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            ) : previewUrl ? (
              previewDocument?.mime_type?.startsWith('image/') ? (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <img
                    src={previewUrl}
                    alt={previewDocument.title}
                    className="max-w-full max-h-[60vh] object-contain"
                  />
                </div>
              ) : previewDocument?.mime_type === 'application/pdf' ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-[60vh]"
                  title={previewDocument.title}
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center">
                  <div className="text-center">
                    <FileIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Preview not available</p>
                  </div>
                </div>
              )
            ) : (
              <div className="w-full h-96 flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Failed to load preview</p>
                </div>
              </div>
            )}
          </div>

          {previewDocument?.notes && (
            <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg text-sm">
              <StickyNote className="h-4 w-4 text-yellow-600 mt-0.5" />
              <span className="text-yellow-800">{previewDocument.notes}</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => { closePreview(); setPreviewUrl(null); }}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
            <button
              onClick={() => previewDocument && handleDownload(previewDocument)}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
