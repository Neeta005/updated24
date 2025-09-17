"use client"

import { ChevronDown, ChevronRight } from "lucide-react"

interface SectionAccordionProps<T> {
  section: T
  isExpanded: boolean
  onToggle: (id: string) => void
  sectionKey?: keyof T // defaults to "title" if present
  colorKey?: keyof T // defaults to "color" if present
  idKey?: keyof T // defaults to "id"
  renderContent: () => JSX.Element
}

export function SectionAccordion<T extends Record<string, any>>({
  section,
  isExpanded,
  onToggle,
  sectionKey = "title",
  colorKey = "color",
  idKey = "id",
  renderContent,
}: SectionAccordionProps<T>) {
  const color = section[colorKey] as string
  const id = section[idKey] as string
  const title = section[sectionKey] as string

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown size={20} className={`text-${color}-400`} />
          ) : (
            <ChevronRight size={20} className={`text-${color}-400`} />
          )}
          <h2 className={`text-${color}-400 text-lg font-semibold`}>{title}</h2>
        </div>
        <span className="text-gray-400 text-sm">{section.questions?.length ?? 0} Questions</span>
      </button>

      {isExpanded && <div className="p-6 pt-0 space-y-6">{renderContent()}</div>}
    </div>
  )
}
