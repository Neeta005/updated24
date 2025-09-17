"use client"

import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { IconButton } from "@/components/ui/icon-button"
import { FormField } from "@/components/ui/form-field"

interface SectionRowProps {
  title: string
  onTitleChange: (title: string) => void
  onAddSection: () => void
}

export function SectionRow({ title, onTitleChange, onAddSection }: SectionRowProps) {
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
          <IconButton onClick={onAddSection} size="md">
            <Plus className="size-4" />
          </IconButton>
        </div>
      </FormField>
    </div>
  )
}
