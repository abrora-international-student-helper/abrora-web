// Document types matching database schema

export type DocumentType =
  | 'passport'
  | 'visa'
  | 'i20'
  | 'ds2019'
  | 'i94'
  | 'ead'
  | 'transcript'
  | 'bank_statement'
  | 'insurance'
  | 'other'

export interface Document {
  id: string
  user_id: string
  document_type: DocumentType
  title: string
  file_path: string
  file_size: number | null
  mime_type: string | null
  thumbnail_path: string | null
  document_number: string | null
  issue_date: string | null
  expiry_date: string | null
  notes: string | null
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface CreateDocumentInput {
  document_type: DocumentType
  title: string
  file_path: string
  file_size?: number
  mime_type?: string
  expiry_date?: string
  notes?: string
}

export interface UpdateDocumentInput {
  title?: string
  document_type?: DocumentType
  expiry_date?: string | null
  notes?: string | null
  is_verified?: boolean
}

export interface DocumentCategory {
  id: DocumentType
  name: string
  description: string
  required: boolean
}

// Document categories for the UI
export const documentCategories: DocumentCategory[] = [
  { id: 'passport', name: 'Passport', description: 'Valid passport copy', required: true },
  { id: 'visa', name: 'Visa', description: 'F-1 Student Visa', required: true },
  { id: 'i20', name: 'I-20', description: 'Certificate of Eligibility', required: true },
  { id: 'ds2019', name: 'DS-2019', description: 'J-1 Exchange Visitor', required: false },
  { id: 'i94', name: 'I-94', description: 'Arrival/Departure Record', required: true },
  { id: 'ead', name: 'EAD Card', description: 'Employment Authorization', required: false },
  { id: 'transcript', name: 'Transcript', description: 'Academic transcript', required: false },
  { id: 'bank_statement', name: 'Bank Statement', description: 'Financial documents', required: false },
  { id: 'insurance', name: 'Insurance', description: 'Health insurance', required: false },
  { id: 'other', name: 'Other', description: 'Other documents', required: false },
]
