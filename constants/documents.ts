// Document categories and types

export const DOCUMENT_CATEGORIES = [
  {
    id: 'visa-immigration',
    name: 'Visa & Immigration',
    icon: 'passport',
    types: ['passport', 'visa-stamp', 'i20', 'ds2019', 'i94', 'ead-card', 'ds160'],
  },
  {
    id: 'identification',
    name: 'Identification',
    icon: 'id-card',
    types: ['ssn-card', 'drivers-license'],
  },
  {
    id: 'academic',
    name: 'Academic',
    icon: 'graduation-cap',
    types: ['acceptance-letter', 'sevis-payment'],
  },
  {
    id: 'financial',
    name: 'Financial',
    icon: 'dollar-sign',
    types: ['bank-statement'],
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: 'plane',
    types: ['flight-ticket', 'noc', 'police-clearance'],
  },
  {
    id: 'medical',
    name: 'Medical',
    icon: 'heart',
    types: ['medical-report', 'vaccination-record'],
  },
  {
    id: 'other',
    name: 'Other',
    icon: 'file',
    types: ['other'],
  },
]

export const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  'passport': 'Passport',
  'visa-stamp': 'Visa Stamp',
  'i20': 'I-20',
  'ds2019': 'DS-2019',
  'i94': 'I-94',
  'ead-card': 'EAD Card',
  'ssn-card': 'Social Security Card',
  'drivers-license': "Driver's License",
  'bank-statement': 'Bank Statement',
  'acceptance-letter': 'Acceptance Letter',
  'sevis-payment': 'SEVIS Payment Receipt',
  'ds160': 'DS-160 Confirmation',
  'noc': 'No Objection Certificate (NOC)',
  'police-clearance': 'Police Clearance Report',
  'medical-report': 'Medical Report',
  'vaccination-record': 'Vaccination Record',
  'flight-ticket': 'Flight Ticket',
  'other': 'Other Document',
}
