// Document types

export type DocumentType =
  | 'passport'
  | 'visa-stamp'
  | 'i20'
  | 'ds2019'
  | 'i94'
  | 'ead-card'
  | 'ssn-card'
  | 'drivers-license'
  | 'bank-statement'
  | 'acceptance-letter'
  | 'sevis-payment'
  | 'ds160'
  | 'noc'
  | 'police-clearance'
  | 'medical-report'
  | 'vaccination-record'
  | 'flight-ticket'
  | 'other'

export interface Document {
  id: string
  userId: string
  type: DocumentType
  name: string
  fileUrl: string
  thumbnailUrl?: string
  uploadDate: Date
  expiryDate?: Date
  notes?: string
  isEncrypted: boolean
}

export interface DocumentCategory {
  id: string
  name: string
  types: DocumentType[]
  icon: string
}
