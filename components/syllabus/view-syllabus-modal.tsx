"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { syllabusDetailData } from "@/data/syllabus"

interface ViewSyllabusModalProps {
  isOpen: boolean
  onClose: () => void
  syllabusId: string | null
}

export function ViewSyllabusModal({ isOpen, onClose, syllabusId }: ViewSyllabusModalProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  if (!syllabusId) return null

  const syllabusDetail = syllabusDetailData[syllabusId]
  if (!syllabusDetail) return null

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    )
  }

  const allExpanded = expandedSections.length === syllabusDetail.sections.length

  const toggleAllSections = () => {
    if (allExpanded) {
      setExpandedSections([])
    } else {
      setExpandedSections(syllabusDetail.sections.map((section) => section.id))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-gray-600 text-white overflow-hidden">
        
        {/* HEADER */}
        <DialogHeader className="flex flex-row items-center justify-between p-6 border-b border-gray-600">
          <div>
            <DialogTitle className="text-2xl font-semibold text-white">
              {syllabusDetail.subject}
            </DialogTitle>

            <p className="text-gray-300 mt-1">
              {syllabusDetail.totalTopics} Topics • {syllabusDetail.totalLessons} Lessons
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={toggleAllSections}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <img
                src="\icons\viewsyllabus.png"
                alt="Toggle Icon"
                className="size-4"
              />
              {allExpanded ? "Collapse All" : "Expand All"}
            </Button>
          </div>
        </DialogHeader>

        {/* BODY */}
        <div className="p-6 overflow-y-auto max-h-[65vh]">
          <div className="space-y-4">
            {syllabusDetail.sections.map((section, sectionIndex) => {
              const sectionNumber = sectionIndex + 1
              const isExpanded = expandedSections.includes(section.id)

              return (
                <div key={section.id} className="bg-gray-700 rounded-lg overflow-hidden">
                  {/* SECTION HEADER */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronDown className="size-5 text-gray-300" />
                      ) : (
                        <ChevronRight className="size-5 text-gray-300" />
                      )}

                      {/* Section numbering: 1. Section Title */}
                      <span className="text-white font-medium">
                        {sectionNumber}. {section.title}
                      </span>
                    </div>

                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                      {section.lessonCount} Lessons
                    </span>
                  </button>

                  {/* LESSONS LIST */}
                  {isExpanded && (
                    <div className="px-4 pb-4 bg-gray-750">
                      <div className="pl-8 space-y-2">
                        {section.lessons.map((lesson, lessonIndex) => {
                          const lessonNumber = `${sectionNumber}.${lessonIndex + 1}`

                          return (
                            <div
                              key={lesson.id}
                              className="text-gray-300 py-2"
                            >
                              {/* 1.1 Lesson Title */}
                              {lessonNumber}. {lesson.title}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end p-6 border-t border-gray-600">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-orange-600 to-rose-600 hover:bg-orange-600 text-white px-8 py-2 rounded-md"
          >
            OK
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}
