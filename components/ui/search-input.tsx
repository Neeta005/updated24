"use client"

import { ReactNode } from "react"
import { Search } from "lucide-react"
import Image from "next/image"

interface SearchInputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
  icon?: "search" | "custom"
  customIcon?: string // path to image in public folder
  iconAlt?: string
}

export function SearchInput({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  className = "",
  icon = "search",
  customIcon,
  iconAlt = "Search icon"
}: SearchInputProps) {
  const renderIcon = () => {
    if (icon === "custom" && customIcon) {
      return (
        <Image
          src={customIcon}
          alt={iconAlt}
          width={16}
          height={16}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
        />
      )
    }
    
    return (
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    )
  }

  return (
    <div className={`relative ${className}`}>
      {renderIcon()}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-600 text-white placeholder:text-gray-300 rounded-md pl-10 pr-4 py-2 w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}
