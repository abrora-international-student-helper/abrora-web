'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Upload,
  Trash2,
  Download,
  Eye,
  Search,
  Filter,
  MoreVertical,
  Shield,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

// Document types
const documentTypes = [
  { id: 'i20', name: 'I-20', description: 'Certificate of Eligibility', required: true },
  { id: 'passport', name: 'Passport', description: 'Valid passport copy', required: true },
  { id: 'visa', name: 'Visa', description: 'F-1 Student Visa', required: true },
  { id: 'i94', name: 'I-94', description: 'Arrival/Departure Record', required: true },
  { id: 'ead', name: 'EAD Card', description: 'Employment Authorization', required: false },
  { id: 'ssn', name: 'SSN Card', description: 'Social Security Card', required: false },
]

// Mock uploaded documents
const mockDocuments = [
  {
    id: '1',
    name: 'I-20_2024.pdf',
    type: 'i20',
    size: '245 KB',
    uploadedAt: '2024-01-15',
    status: 'verified',
    expiresAt: '2025-12-01',
  },
  {
    id: '2',
    name: 'Passport_Scan.pdf',
    type: 'passport',
    size: '1.2 MB',
    uploadedAt: '2024-01-10',
    status: 'verified',
    expiresAt: '2028-06-15',
  },
  {
    id: '3',
    name: 'F1_Visa.pdf',
    type: 'visa',
    size: '890 KB',
    uploadedAt: '2024-01-12',
    status: 'pending',
    expiresAt: '2025-08-20',
  },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedDoc, setSelectedDoc] = useState<typeof mockDocuments[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          // Add mock document
          const newDoc = {
            id: Date.now().toString(),
            name: acceptedFiles[0].name,
            type: 'other',
            size: `${(acceptedFiles[0].size / 1024).toFixed(0)} KB`,
            uploadedAt: new Date().toISOString().split('T')[0],
            status: 'pending' as const,
            expiresAt: '',
          }
          setDocuments((prev) => [...prev, newDoc])
          return 0
        }
        return prev + 10
      })
    }, 200)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const uploadedTypes = documents.map((d) => d.type)
  const requiredDocs = documentTypes.filter((t) => t.required)
  const uploadedRequired = requiredDocs.filter((t) => uploadedTypes.includes(t.id))
  const completionPercent = Math.round((uploadedRequired.length / requiredDocs.length) * 100)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500 mt-1">Securely store and manage your important documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Shield className="h-3 w-3" />
            Bank-level encryption
          </Badge>
        </div>
      </div>

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
            <CardContent className="p-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                    <Upload className="h-6 w-6 text-blue-600" />
                  </div>
                  {isDragActive ? (
                    <p className="text-blue-600 font-medium">Drop your files here</p>
                  ) : (
                    <>
                      <p className="font-medium text-gray-900">
                        Drag and drop files, or{' '}
                        <span className="text-blue-600">browse</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        PDF, PNG, or JPG up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Upload Progress */}
              <AnimatePresence>
                {uploading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Uploading...</p>
                        <Progress value={uploadProgress} className="h-1.5 mt-2" />
                      </div>
                      <span className="text-sm text-gray-500">{uploadProgress}%</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Documents List */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle>Uploaded Documents</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDocuments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No documents found</p>
                  </div>
                ) : (
                  filteredDocuments.map((doc) => (
                    <motion.div
                      key={doc.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{doc.size}</span>
                          <span className="text-xs text-gray-300">|</span>
                          <span className="text-xs text-gray-500">{doc.uploadedAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={
                            doc.status === 'verified'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }
                        >
                          {doc.status === 'verified' ? (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertCircle className="h-3 w-3 mr-1" />
                          )}
                          {doc.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1.5 rounded-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="h-4 w-4 text-gray-500" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedDoc(doc)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(doc.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
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
                {documentTypes.map((docType) => {
                  const isUploaded = uploadedTypes.includes(docType.id)
                  return (
                    <div
                      key={docType.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${
                        isUploaded
                          ? 'bg-green-50 border-green-200'
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
                        <p
                          className={`font-medium text-sm ${
                            isUploaded ? 'text-green-900' : 'text-gray-700'
                          }`}
                        >
                          {docType.name}
                          {docType.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">{docType.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
            <CardContent className="p-6">
              <Shield className="h-8 w-8 mb-4 text-blue-400" />
              <h3 className="font-semibold mb-2">Your data is secure</h3>
              <p className="text-sm text-slate-300">
                All documents are encrypted with AES-256 and stored securely. Only you can access them.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* View Document Dialog */}
      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedDoc?.name}</DialogTitle>
            <DialogDescription>
              Uploaded on {selectedDoc?.uploadedAt}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
            <FileText className="h-16 w-16 text-gray-400" />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setSelectedDoc(null)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="h-4 w-4 inline mr-2" />
              Download
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
