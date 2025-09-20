"use client"

import { useState } from "react"
import type { Section } from "@/types/syllabus"
import { SectionRow } from "./section-row"
import { LessonRow } from "./lesson-row"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Text } from "@/components/atoms/text"

interface SectionFormProps {
  sections: Section[]
  onSectionsChange: (sections: Section[]) => void
}

export function SectionForm({ sections, onSectionsChange }: SectionFormProps) {
  const [openSectionId, setOpenSectionId] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    setOpenSectionId((prev) => (prev === sectionId ? null : sectionId))
  }

  const addSection = (afterSectionId?: string) => {
    const ts = Date.now().toString()
    const newSection: Section = {
      id: ts,
      title: "",
      lessons: [{ id: `${ts}-1`, value: "" }],
    }

    if (!afterSectionId) {
      onSectionsChange([...sections, newSection])
      setOpenSectionId(newSection.id)
      return
    }

    const idx = sections.findIndex((s) => s.id === afterSectionId)
    const updated =
      idx === -1
        ? [...sections, newSection]
        : [...sections.slice(0, idx + 1), newSection, ...sections.slice(idx + 1)]

    onSectionsChange(updated)
    setOpenSectionId(newSection.id)
  }

  const removeSection = (sectionId: string) => {
    if (sections.length > 1) { // prevent deleting the last section
      onSectionsChange(sections.filter((s) => s.id !== sectionId))
      if (openSectionId === sectionId) setOpenSectionId(null)
    }
  }

  const addLesson = (sectionId: string, afterLessonId?: string) => {
    onSectionsChange(
      sections.map((section) => {
        if (section.id !== sectionId) return section
        const newLesson = { id: `${sectionId}-${Date.now()}`, value: "" }

        if (!afterLessonId) {
          return { ...section, lessons: [...section.lessons, newLesson] }
        }

        const idx = section.lessons.findIndex((l) => l.id === afterLessonId)
        const newLessons =
          idx === -1
            ? [...section.lessons, newLesson]
            : [...section.lessons.slice(0, idx + 1), newLesson, ...section.lessons.slice(idx + 1)]

        return { ...section, lessons: newLessons }
      }),
    )
  }

  const removeLesson = (sectionId: string, lessonId: string) => {
    onSectionsChange(
      sections.map((section) =>
        section.id === sectionId && section.lessons.length > 1
          ? { ...section, lessons: section.lessons.filter((lesson) => lesson.id !== lessonId) }
          : section,
      ),
    )
  }

  const updateSectionTitle = (sectionId: string, title: string) => {
    onSectionsChange(sections.map((section) => (section.id === sectionId ? { ...section, title } : section)))
  }

  const updateLessonValue = (sectionId: string, lessonId: string, value: string) => {
    onSectionsChange(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, value } : lesson,
              ),
            }
          : section,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <Text as="h3" className="text-foreground text-lg font-semibold mb-4">
        Course Content
      </Text>

      <div className="space-y-6">
        {sections.map((section) => {
          const isOpen = openSectionId === section.id
          return (
            <div key={section.id} className="space-y-2 rounded-lg">
              {/* Section Header */}
              <div className="flex items-center gap-2 px-2 py-3 cursor-pointer hover:bg-accent rounded-t-lg">
                {/* Collapse toggle */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="text-muted-foreground mb-12"
                >
                  {isOpen ? <ChevronDown size={28} /> : <ChevronRight size={28} />}
                </button>

                {/* Section input fills width */}
                <div className="flex-1">
                  <SectionRow
                    title={section.title}
                    onTitleChange={(title) => updateSectionTitle(section.id, title)}
                    onAddSection={() => addSection(section.id)}
                    onRemoveSection={() => removeSection(section.id)} // <-- added
                  />
                </div>
              </div>

              {/* Collapsible Lessons */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="pl-10 pr-2 pb-3 space-y-3">
              {section.lessons.map((lesson) => (
  <LessonRow
    key={lesson.id}
    value={lesson.value}
    onValueChange={(value) =>
      updateLessonValue(section.id, lesson.id, value)
    }
    onAddLesson={() => addLesson(section.id, lesson.id)}
    onRemoveLesson={() => removeLesson(section.id, lesson.id)}
    canRemove={section.lessons.length > 1}
    level={1} // choose 1, 2, 3 depending on how far right you want it
  />
))}

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
