// Visa types and interfaces

export type VisaType = 'F-1' | 'J-1' | 'M-1' | 'H-1B' | 'OPT' | 'CPT' | 'other'

export type VisaStatus = 'active' | 'expired' | 'pending' | 'grace-period'

export interface VisaDeadline {
  id: string
  type: DeadlineType
  title: string
  description: string
  dueDate: Date
  isCompleted: boolean
  urgency: 'low' | 'medium' | 'high' | 'critical'
}

export type DeadlineType =
  | 'address-change'
  | 'travel-signature'
  | 'opt-application'
  | 'cpt-application'
  | 'sevis-registration'
  | 'program-end'
  | 'visa-renewal'
  | 'i20-renewal'
  | 'transfer'
  | 'custom'

export interface WorkAuthorization {
  type: 'on-campus' | 'cpt' | 'opt' | 'stem-opt'
  startDate: Date
  endDate: Date
  hoursPerWeek: number
  employer?: string
}
