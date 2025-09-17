"use client"

import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type BaseLesson = { id: string; title?: string; value?: string }
type BaseSection = { id: string; title: string; lessons: BaseLesson[] }

interface SectionsPreviewProps {
  sections: BaseSection[]
  className?: string
}

export function SectionsPreview({ sections, className }: SectionsPreviewProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {sections.map((section) => (
        <div key={section.id} className="bg-card rounded-lg">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <ChevronDown className="size-4 text-muted-foreground" />
              <span className="text-card-foreground font-medium">{section.title}</span>
            </div>
          </div>
          <div className="px-3 pb-3 space-y-1">
            {section.lessons.map((lesson) => (
              <div key={lesson.id} className="text-muted-foreground text-sm pl-6">
                {lesson.title ?? lesson.value ?? ""}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
