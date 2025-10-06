// components/ui/SelectDropdown.tsx
"use client"

import { FC, ReactNode } from "react"

interface SelectDropdownProps {
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
  className?: string
}

export const SelectDropdown: FC<SelectDropdownProps> = ({ value, onChange, options, className }) => {
  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-slate-600 px-4 py-3 text-white focus:outline-none focus:border-orange-500"
      >
        {options.map((opt) => (
          <option key={opt.value} className="bg-slate-700" value={opt.label}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* Arrow Icon */}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  )
}
