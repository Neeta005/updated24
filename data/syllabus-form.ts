import type { Section, TargetAudienceOption } from "@/types/syllabus"

export const targetAudienceOptions: TargetAudienceOption[] = [
  { value: "designers", label: "Designers" },
  { value: "developers", label: "Developers" },
  { value: "devops", label: "DevOps Engineers" },
  { value: "ui-ux", label: "UI/UX Designers" },
]

export const initialSections: Section[] = [
  {
    id: "section-1",
    title: "Introduction",
    isExpanded: true,
    lessons: [
      { id: "lesson-1", value: "Getting Started" },
      { id: "lesson-2", value: "Basics" },
    ],
  },
  {
    id: "section-2",
    title: "Advanced Topics",
    isExpanded: false,
    lessons: [
      { id: "lesson-3", value: "Deep Dive" },
      { id: "lesson-4", value: "Best Practices" },
    ],
  },
]
