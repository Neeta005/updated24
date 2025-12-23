"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import type { Section, UploadedFile } from "@/types/syllabus"

interface SyllabusPreviewProps {
  subject: string
  targetAudience: string
  sections: Section[]
  uploadedFiles: UploadedFile[]
  activeTab: "manual" | "upload"
}

export function SyllabusPreview({ 
  subject, 
  targetAudience, 
  sections, 
  uploadedFiles, 
  activeTab 
}: SyllabusPreviewProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const hasContent = activeTab === "manual" 
    ? sections.some(section => section.title.trim() || section.lessons.some(lesson => lesson.value.trim()))
    : uploadedFiles.length > 0

  if (!hasContent) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-16 h-16 mx-auto bg-muted/50 rounded-lg flex items-center justify-center">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-foreground font-medium mb-2">No Course Content!</h3>
          <p className="text-muted-foreground text-sm">
            Enter Course Content to see the preview
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Subject and Audience Info */}
      {(subject || targetAudience) && (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
          {subject && (
            <div className="mb-2">
              <span className="text-sm font-medium text-muted-foreground">Subject:</span>
              <span className="ml-2 text-foreground">{subject}</span>
            </div>
          )}
          {targetAudience && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">Target Audience:</span>
              <span className="ml-2 text-foreground">{targetAudience}</span>
            </div>
          )}
        </div>
      )}

      {/* Sections Preview (Manual Mode) */}
      {activeTab === "manual" && sections.length > 0 && (
        <div className="space-y-3">
          {sections.map((section, sectionIdx) => {
            const sectionNumber = sectionIdx + 1
            const isExpanded = expandedSections.has(section.id)
            const hasLessonsWithContent = section.lessons.some(lesson => lesson.value.trim())
            
            if (!section.title.trim() && !hasLessonsWithContent) {
              return null
            }

            return (
              <div
                key={section.id}
                className="border border-border rounded-lg overflow-hidden"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-slate-700/50 hover:bg-slate-700/70 transition-colors text-left"
                >
                  {isExpanded ? (
                    <ChevronDown className="size-6 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronRight className="size-6 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className="text-lg font-bold text-foreground">
                    {section.title || `Section ${sectionNumber}`}
                  </span>
                </button>

                {/* Lessons */}
                {isExpanded && (
                  <div className="bg-slate-800/60 px-4 pb-3">
                    <div className="pl-7 space-y-2 pt-3">
                      {section.lessons.filter(lesson => lesson.value.trim()).length > 0 ? (
                        section.lessons
                          .filter(lesson => lesson.value.trim())
                          .map((lesson, lessonIdx) => (
                            <div
                              key={lesson.id}
                              className="flex items-start gap-2 text-md py-1 whitespace-pre-line"
                            >
                              <span className="text-muted-foreground font-medium flex-shrink-0">
                                {sectionNumber}.{lessonIdx + 1}
                              </span>
                              <span className="text-foreground">{lesson.value}</span>
                            </div>
                          ))
                      ) : (
                        <div className="text-slate-400 text-sm italic py-2">
                          No lessons added yet
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* File Upload Preview */}
      {activeTab === "upload" && uploadedFiles.length > 0 && (
        <div className="space-y-3">
          {uploadedFiles.map((file, fileIdx) => (
            <div key={file.id}>
              {/* File Info Header */}
              <div className="mb-3 p-3 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{file.name}</div>
                    <div className="text-sm text-muted-foreground">{file.size}</div>
                    {file.status && (
                      <div
                        className={`mt-1 text-xs px-2 py-0.5 rounded inline-block ${
                          file.status === "error"
                            ? "bg-red-500/20 text-red-600"
                            : "bg-green-500/20 text-green-600"
                        }`}
                      >
                        {file.status}
                      </div>
                    )}
                  </div>
                </div>
                {file.error && (
                  <div className="mt-2 text-xs text-red-400">{file.error}</div>
                )}
              </div>

              {/* Extracted Sections */}
              {file.sections && file.sections.length > 0 && (
                <div className="space-y-3 mb-6">
                  {file.sections.map((section, sectionIdx) => {
                    const sectionNumber = sectionIdx + 1
                    const sectionKey = `${file.id}-${section.id}`
                    const isExpanded = expandedSections.has(sectionKey)
                    
                    return (
                      <div
                        key={sectionKey}
                        className="border border-border rounded-lg overflow-hidden"
                      >
                        {/* Section Header */}
                        <button
                          onClick={() => toggleSection(sectionKey)}
                          className="w-full flex items-center gap-3 px-4 py-3 bg-slate-700/50 hover:bg-slate-700/70 transition-colors text-left"
                        >
                          {isExpanded ? (
                            <ChevronDown className="size-6 text-muted-foreground flex-shrink-0" />
                          ) : (
                            <ChevronRight className="size-6 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className="text-lg font-bold text-foreground">
                            {section.title || `Section ${sectionNumber}`}
                          </span>
                        </button>

                        {/* Lessons */}
                        {isExpanded && (
                          <div className="bg-slate-800/60 px-4 pb-3">
                            <div className="pl-7 space-y-2 pt-3">
                              {section.lessons && section.lessons.length > 0 ? (
                                section.lessons.map((lesson, lessonIdx) => (
                                  <div
                                    key={`${sectionKey}-${lessonIdx}`}
                                    className="flex items-start gap-2 text-md py-1 whitespace-pre-line"
                                  >
                                    <span className="text-muted-foreground font-medium flex-shrink-0">
                                      {sectionNumber}.{lessonIdx + 1}
                                    </span>
                                    <span className="text-foreground">{lesson}</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-slate-400 text-sm italic py-2">
                                  No lessons found in this section
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
