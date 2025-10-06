"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type BaseLesson = { id: string; title?: string; value?: string }
type BaseSection = { id: string; title: string; lessons: BaseLesson[] }

interface SectionsPreviewProps {
  sections: BaseSection[]
  className?: string
}

export function SectionsPreview({ sections, className }: SectionsPreviewProps) {
  // Track which sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className={cn("space-y-3", className)}>
      {sections.map((section) => {
        const isOpen = openSections[section.id] ?? true // default open
        return (
          <div key={section.id} className="bg-slate-800 rounded-md">
            <div
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center gap-2">
                <ChevronDown
                  className={cn(
                    "size-4 text-muted-foreground transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
                <span className="text-card-foreground font-medium">{section.title}</span>
              </div>
            </div>
            {isOpen && (
              <div className="px-3 pb-3 space-y-1 bg-slate-900">
                {section.lessons.map((lesson) => (
                  <div key={lesson.id} className="text-muted-foreground text-sm pl-6">
                    {lesson.title ?? lesson.value ?? ""}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
