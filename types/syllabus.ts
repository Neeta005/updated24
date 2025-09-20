export interface Lesson {
  id: string
  value: string
}

export interface Section {
  id: string
  title: string
  lessons: Lesson[]
  isExpanded: boolean
}

interface UploadedFile {
  id: string
  name: string
  size: string
  content?: string
  sections?: { id: string; title: string; lessons: string[] }[]
  status?: 'success' | 'error'
  error?: string
}

export interface TargetAudienceOption {
  value: string
  label: string
}
