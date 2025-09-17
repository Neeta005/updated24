// components/ui/search-filters.tsx
"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchFiltersProps {
  showSubject?: boolean
  showTopic?: boolean
  showAudience?: boolean
  onChange?: (field: string, value: string) => void
}

export function SearchFilters({
  showSubject = true,
  showTopic = true,
  showAudience = true,
  onChange,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row w-full sm:gap-4">
      {showSubject && (
        <div className="relative w-full sm:w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:hidden" />
          <Input
            placeholder="Search Subject"
            className="border border-gray-600 text-white placeholder:text-gray-300 rounded-md pl-10 md:pl-4 py-2 w-full"
            onChange={(e) => onChange?.("subject", e.target.value)}
          />
        </div>
      )}
      {showTopic && (
        <div className="relative w-full sm:w-60">
          <Input
            placeholder="Search Topic"
            className="border border-gray-600 text-white placeholder:text-gray-300 rounded-md pl-4 py-2 w-full"
            onChange={(e) => onChange?.("topic", e.target.value)}
          />
        </div>
      )}
      {showAudience && (
        <div className="relative w-full sm:w-60">
          <Input
            placeholder="Search Target Audience"
            className="border border-gray-600 text-white placeholder:text-gray-300 rounded-md pl-4 py-2 w-full"
            onChange={(e) => onChange?.("audience", e.target.value)}
          />
        </div>
      )}
    </div>
  )
}
