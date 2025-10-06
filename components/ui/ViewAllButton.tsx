"use client"

import Link from "next/link"

interface ViewAllButtonProps {
  href: string
  text?: string
  className?: string
}

export function ViewAllButton({ href, text = "View All", className = "" }: ViewAllButtonProps) {
  return (
    <Link
      href={href}
      className={`text-orange-primary hover:text-orange-hover text-xs md:text-sm font-medium ${className}`}
    >
      {text}
    </Link>
  )
}
