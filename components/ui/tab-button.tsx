"use client"

import type React from "react"

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  position?: "left" | "right" | "middle"
  className?: string
}

export function TabButton({ active, onClick, children, position = "middle", className = "" }: TabButtonProps) {
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

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center min-w-[100px] h-[32px] px-[12px] gap-[10px] text-[12px] leading-[18px] font-poppins whitespace-nowrap transition-all duration-200
        ${getPositionClasses()} 
        ${active
          ? "bg-gradient-to-b from-[rgba(240,89,33,0.2)] to-[rgba(240,89,33,0)] text-[#F05921] font-semibold"
          : "bg-transparent text-slate-400 font-semibold hover:text-slate-300"} 
        ${className}`}
    >
      {children}
    </button>
  )
}
