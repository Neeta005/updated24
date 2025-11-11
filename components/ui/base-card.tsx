"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface BaseCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function BaseCard({ children, className, onClick }: BaseCardProps) {
  return (
    <div
      className={cn(
        // Base styling
        "bg-card rounded-lg border border-border shadow-sm transition-all duration-300 ease-in-out",
        
        // Hover effect: slightly brighter + deeper shadow for dark themes
        onClick &&
          "cursor-pointer hover:bg-muted hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] hover:border-border/80 hover:scale-[1.01]",
        
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
