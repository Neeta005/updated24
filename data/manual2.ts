// ------------------- Types -------------------
export interface LessonUnit {
  id: string
  title: string
}

export interface Section {
  id: string
  title: string
  lessons: LessonUnit[]
}

export interface UploadedFile {
  id: string
  name: string
  size: string
}

export interface SyllabusItem {
  id: string
  subject: string
  category: string
  targetAudience: string
}

export interface EditableLesson {
  id: string
  title: string
}

export interface EditableSection {
  id: string
  title: string
  isExpanded: boolean
  lessons: EditableLesson[]
}

export interface SyllabusDetailItem {
  id: string
  subject: string
  targetAudience: string
  totalTopics: number
  totalLessons: number
  sections: {
    id: string
    title: string
    lessonCount: number
    lessons: LessonUnit[]
  }[]
}

export interface TargetAudienceOption {
  value: string
  label: string
}

export type Manual2Lesson = LessonUnit

export interface Manual2Section {
  id: string
  title: string
  isExpanded: boolean
  lessons: Manual2Lesson[]
}

export interface Manual2Data {
  subject: string
  targetAudience: string
  sections: Manual2Section[]
}

// ------------------- Options -------------------
export const targetAudienceOptions: TargetAudienceOption[] = [
  { value: "graphic-designers", label: "Graphic Designers" },
  { value: "developers", label: "Developers" },
  { value: "devops", label: "DevOps Engineers" },
  { value: "ui-ux", label: "UI/UX Designers" },
]

// ------------------- Mock List -------------------
export const syllabusData: SyllabusItem[] = [
  { id: "1", subject: "Design", category: "Design", targetAudience: "Graphic Designers" },
  { id: "2", subject: "Development", category: "Development", targetAudience: "Developers" },
  { id: "3", subject: "Cyber Security", category: "Security", targetAudience: "DevOps Engineers" },
  { id: "4", subject: "Design", category: "Design", targetAudience: "Graphic Designers" },
  { id: "5", subject: "Development", category: "Development", targetAudience: "Frontend Developers" },
  { id: "6", subject: "Cyber Security", category: "Security", targetAudience: "Security Specialists" },
  { id: "7", subject: "Design", category: "Design", targetAudience: "UI/UX Designers" },
  { id: "8", subject: "Development", category: "Development", targetAudience: "Backend Developers" },
  { id: "9", subject: "Cyber Security", category: "Security", targetAudience: "Network Security" },
]

// ------------------- Detail Data -------------------
export const syllabusDetailData: Record<string, SyllabusDetailItem> = {
  "1": {
    id: "1",
    subject: "Design",
    targetAudience: "Graphic Designers",
    totalTopics: 43,
    totalLessons: 57,
    sections: [
      {
        id: "ui-design-1",
        title: "UI Design",
        lessonCount: 3,
        lessons: [
          { id: "ui-1", title: "Introduction to UI" },
          { id: "ui-2", title: "Design Principles" },
          { id: "ui-3", title: "Color Theory" },
        ],
      },
      {
        id: "ux-design-1",
        title: "UX Design",
        lessonCount: 6,
        lessons: [
          { id: "ux-1", title: "Introduction to UX" },
          { id: "ux-2", title: "Basic Info" },
          { id: "ux-3", title: "User Research" },
          { id: "ux-4", title: "Wireframing" },
          { id: "ux-5", title: "Prototyping" },
          { id: "ux-6", title: "Usability Testing" },
        ],
      },
      {
        id: "ui-design-2",
        title: "UI Design",
        lessonCount: 3,
        lessons: [
          { id: "ui-4", title: "Advanced UI Patterns" },
          { id: "ui-5", title: "Responsive Design" },
          { id: "ui-6", title: "Design Systems" },
        ],
      },
    ],
  },
  "2": {
    id: "2",
    subject: "Development",
    targetAudience: "Developers",
    totalTopics: 35,
    totalLessons: 48,
    sections: [
      {
        id: "frontend-1",
        title: "Frontend Development",
        lessonCount: 5,
        lessons: [
          { id: "fe-1", title: "HTML Fundamentals" },
          { id: "fe-2", title: "CSS Styling" },
          { id: "fe-3", title: "JavaScript Basics" },
          { id: "fe-4", title: "React Introduction" },
          { id: "fe-5", title: "State Management" },
        ],
      },
      {
        id: "backend-1",
        title: "Backend Development",
        lessonCount: 4,
        lessons: [
          { id: "be-1", title: "Server Architecture" },
          { id: "be-2", title: "Database Design" },
          { id: "be-3", title: "API Development" },
          { id: "be-4", title: "Authentication" },
        ],
      },
    ],
  },
}

// ------------------- Initial Empty State -------------------
export const initialSections: Section[] = [
  {
    id: "1",
    title: "",
    lessons: [
      { id: "1-1", title: "" },
      { id: "1-2", title: "" },
      { id: "1-3", title: "" },
    ],
  },
]

export const initialManual2Data: Manual2Data = {
  subject: "",
  targetAudience: "",
  sections: initialSections.map((sec) => ({
    id: sec.id,
    title: sec.title,
    isExpanded: true,
    lessons: sec.lessons.map((l) => ({ id: l.id, title: l.title })),
  })),
}

// ------------------- Styling -------------------
export const gradientButtonStyle =
  "bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 h-10"
