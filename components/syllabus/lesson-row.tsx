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
}

export function LessonRow({
  value,
  onValueChange,
  onAddLesson,
  onRemoveLesson,
  canRemove = true,
}: LessonRowProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Input field */}
      <div className="flex-1">
        <FormField label="Lesson / Unit" className="flex-1">
          <Input
            placeholder="Type here..."
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className="h-10  rounded-full bg-muted border border-white text-foreground placeholder:text-muted-foreground"
          />
        </FormField>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mt-6 h-10">
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
            className="h-10 w-10 flex items-center justify-center"
          >
            <Minus className="size-4" />
          </IconButton>
        )}
      </div>
    </div>
  )
}
