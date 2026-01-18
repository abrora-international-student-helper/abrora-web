// F1/J1 deadline rules and constants

export const DEADLINE_RULES = {
  // Address change must be reported within 10 days
  ADDRESS_CHANGE_DAYS: 10,

  // Travel signature renewal (typically valid for 1 year)
  TRAVEL_SIGNATURE_VALIDITY_MONTHS: 12,

  // OPT application windows
  OPT: {
    // Can apply 90 days before program end
    EARLIEST_APPLICATION_DAYS: 90,
    // Must apply within 60 days after program end
    LATEST_APPLICATION_DAYS: 60,
    // Standard OPT duration
    DURATION_MONTHS: 12,
  },

  // STEM OPT extension
  STEM_OPT: {
    // Can apply 90 days before OPT end
    EARLIEST_APPLICATION_DAYS: 90,
    DURATION_MONTHS: 24,
  },

  // Grace period after program completion
  GRACE_PERIOD_DAYS: 60,

  // Full-time enrollment requirements
  FULL_TIME: {
    UNDERGRADUATE_CREDITS: 12,
    GRADUATE_CREDITS: 9,
  },

  // Work hour limits
  WORK_HOURS: {
    DURING_SCHOOL: 20,
    DURING_VACATION: 40,
  },
}

export const VISA_TYPES = [
  { value: 'F-1', label: 'F-1 (Student Visa)' },
  { value: 'J-1', label: 'J-1 (Exchange Visitor)' },
  { value: 'M-1', label: 'M-1 (Vocational Student)' },
  { value: 'other', label: 'Other' },
]

export const DEADLINE_URGENCY_THRESHOLDS = {
  CRITICAL: 7,   // 7 days or less
  HIGH: 14,      // 14 days or less
  MEDIUM: 30,    // 30 days or less
  LOW: 90,       // More than 30 days
}
