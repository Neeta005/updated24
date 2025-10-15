"use client"

import type React from "react"

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  position?: "left" | "right" | "middle"
  className?: string
}

export function TabButton({
  active,
  onClick,
  children,
  position = "middle",
  className = "",
}: TabButtonProps) {
  const getPositionClasses = () => {
    switch (position) {
      case "left":
        return "rounded-l-md"
      case "right":
        return "rounded-r-md"
      default:
        return "rounded-none"
    }
  }

  const activeClasses =
    "relative bg-gradient-to-b from-orange-500/20 to-orange-500/0 text-orange-500 border-t border-orange-500"
  const inactiveClasses = "bg-transparent text-slate-400 hover:text-slate-300"

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center 
        h-9 min-w-[77px] px-4 gap-2
        text-xs leading-[18px] font-poppins font-semibold 
        transition-all duration-200
        ${getPositionClasses()} 
        ${active ? activeClasses : inactiveClasses} 
        ${className}`}
    >
      {/* Wrap children in span with text-current so icons inherit color */}
      <span className="flex items-center gap-2 text-current">{children}</span>
    </button>
  )
}
