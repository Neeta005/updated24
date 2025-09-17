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

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: "",
      lessons: [{ id: `${Date.now()}-1`, value: "" }],
    }
    onSectionsChange([...sections, newSection])
  }

  const addLesson = (sectionId: string) => {
    onSectionsChange(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: [...section.lessons, { id: `${sectionId}-${Date.now()}`, value: "" }],
            }
          : section,
      ),
    )
  }

  const removeLesson = (sectionId: string, lessonId: string) => {
    onSectionsChange(
      sections.map((section) =>
        section.id === sectionId && section.lessons.length > 1
          ? {
              ...section,
              lessons: section.lessons.filter((lesson) => lesson.id !== lessonId),
            }
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
              lessons: section.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, value } : lesson)),
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
            <div key={section.id} className="space-y-2 border border-border rounded-lg">
              {/* Section Header */}
              <div className="flex items-center gap-2 px-2 py-3 cursor-pointer hover:bg-accent rounded-t-lg">
                {/* Collapse toggle (chevron) */}
                <button type="button" onClick={() => toggleSection(section.id)} className="text-muted-foreground">
                  {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {/* Section input fills width */}
                <div className="flex-1">
                  <SectionRow
                    title={section.title}
                    onTitleChange={(title) => updateSectionTitle(section.id, title)}
                    onAddSection={addSection}
                  />
                </div>
              </div>

              {/* Collapsible Lessons */}
              <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-screen" : "max-h-0"}`}>
                <div className="pl-10 pr-2 pb-3 space-y-3">
                  {section.lessons.map((lesson) => (
                    <LessonRow
                      key={lesson.id}
                      value={lesson.value}
                      onValueChange={(value) => updateLessonValue(section.id, lesson.id, value)}
                      onAddLesson={() => addLesson(section.id)}
                      onRemoveLesson={() => removeLesson(section.id, lesson.id)}
                      canRemove={section.lessons.length > 1}
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
