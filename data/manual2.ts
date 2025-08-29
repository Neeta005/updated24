export interface Manual2Lesson {
  id: string
  title: string
}

export interface Manual2Section {
  id: string
  title: string
  lessons: Manual2Lesson[]
  isExpanded: boolean
}

export interface Manual2Data {
  subject: string
  targetAudience: string
  sections: Manual2Section[]
}

export const targetAudienceOptions = [
  { value: "designers", label: "Designers" },
  { value: "developers", label: "Developers" },
  { value: "devops", label: "DevOps Engineers" },
  { value: "ui-ux", label: "UI/UX Designers" },
]

export const initialManual2Data: Manual2Data = {
  subject: "Design",
  targetAudience: "designers",
  sections: [
    {
      id: "ux-design-1",
      title: "UX Design",
      isExpanded: true,
      lessons: [
        { id: "ux-1", title: "Introduction to UX" },
        { id: "ux-2", title: "Basic Info" },
      ],
    },
    {
      id: "ux-design-2",
      title: "UX Design",
      isExpanded: true,
      lessons: [
        { id: "ux-3", title: "Introduction to UX" },
        { id: "ux-4", title: "Basic Info" },
      ],
    },
    {
      id: "ux-design-3",
      title: "UX Design",
      isExpanded: true,
      lessons: [
        { id: "ux-5", title: "Introduction to UX" },
        { id: "ux-6", title: "Basic Info" },
      ],
    },
    {
      id: "ui-design-1",
      title: "UI Design",
      isExpanded: false,
      lessons: [
        { id: "ui-1", title: "Introduction to UI" },
        { id: "ui-2", title: "Design Principles" },
      ],
    },
  ],
}
