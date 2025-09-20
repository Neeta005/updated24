"use client"

import { Plus, Minus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { IconButton } from "@/components/ui/icon-button"
import { FormField } from "@/components/ui/form-field"
interface LessonRowProps {
  value: string
  onValueChange: (value: string) => void
  onAddLesson: () => void
  onRemoveLesson: () => void
  canRemove?: boolean
  level?: 1 | 2 | 3 // control indentation using Tailwind classes
}

export function LessonRow({
  value,
  onValueChange,
  onAddLesson,
  onRemoveLesson,
  canRemove = true,
  level = 1,
}: LessonRowProps) {
  // Map levels to Tailwind spacing classes
  const marginRightClass = {
    1: "mr-13",
    2: "mr-8",
    3: "mr-12",
  }[level]

  return (
    <div className={`flex items-center gap-3 justify-end ${marginRightClass}`}>
      {/* Input field */}
      <div className="flex-1">
        <FormField label="Lesson / Unit">
          <Input
            placeholder="Type here..."
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className="h-10 rounded-full bg-muted border border-white text-foreground placeholder:text-muted-foreground"
          />
        </FormField>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 h-10">
        <IconButton
          onClick={onAddLesson}
          size="icon"
          className="h-10 w-10 flex items-center justify-center"
        >
          <Plus className="size-4" />
        </IconButton>

        {canRemove && (
          <IconButton
            onClick={onRemoveLesson}
            variant="secondary"
            size="icon"
            className="size-10 bg-white flex items-center justify-center"
          >
            <Minus className="size-4 text-black" />
          </IconButton>
        )}
      </div>
    </div>
  )
}
