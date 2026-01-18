// User type definitions

export interface User {
  id: string
  email: string
  name: string
  country: string
  school: string
  profilePhoto?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile extends User {
  visaInfo: VisaInfo
}

export interface VisaInfo {
  type: 'F-1' | 'J-1' | 'M-1' | 'other'
  status: 'active' | 'expired' | 'pending'
  sevisId?: string
  programStartDate: Date
  programEndDate: Date
  i20ExpiryDate?: Date
  visaStampExpiryDate?: Date
}
