"use client"

import { Plus, Minus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { IconButton } from "@/components/ui/icon-button"
import { FormField } from "@/components/ui/form-field"

interface SectionRowProps {
  title: string
  onTitleChange: (title: string) => void
  onAddSection: () => void
  onRemoveSection: () => void
}

export function SectionRow({
  title,
  onTitleChange,
  onAddSection,
  onRemoveSection,
}: SectionRowProps) {
  return (
    <div className="flex-1">
      <FormField label="Section / Module">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Type here..."
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="flex-1 bg-muted border border-white text-foreground placeholder:text-muted-foreground h-10 px-4"
          />

          {/* Plus button (unchanged) */}
          <IconButton onClick={onAddSection} size="md">
            <Plus className="size-4" />
          </IconButton>

          {/* Minus button (your style) */}
       <IconButton
  onClick={onRemoveSection}
  variant="secondary"
  size="icon"
  className="size-10 flex items-center justify-center bg-white border border-gray-300 shadow-sm"
>
  <Minus className="size-4 text-black" />
</IconButton>

        </div>
      </FormField>
    </div>
  )
}
