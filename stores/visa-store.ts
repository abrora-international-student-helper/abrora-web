// TODO: Visa data state management
// - Visa information storage
// - Status tracking
// - Deadline calculations

import { create } from 'zustand'

interface VisaState {
  visaType: string | null
  status: string | null
  programStartDate: Date | null
  programEndDate: Date | null
  sevisId: string | null
  i20ExpiryDate: Date | null
  visaStampExpiryDate: Date | null
  setVisaInfo: (info: Partial<VisaState>) => void
  clearVisaInfo: () => void
}

export const useVisaStore = create<VisaState>((set) => ({
  visaType: null,
  status: null,
  programStartDate: null,
  programEndDate: null,
  sevisId: null,
  i20ExpiryDate: null,
  visaStampExpiryDate: null,
  setVisaInfo: (info) => set((state) => ({ ...state, ...info })),
  clearVisaInfo: () => set({
    visaType: null,
    status: null,
    programStartDate: null,
    programEndDate: null,
    sevisId: null,
    i20ExpiryDate: null,
    visaStampExpiryDate: null,
  }),
}))
