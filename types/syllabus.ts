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

export interface UploadedFile {
  id: string
  name: string
  url: string
}

export interface TargetAudienceOption {
  value: string
  label: string
}
