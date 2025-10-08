"use client"

import type * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Pagination as ReusablePagination } from "@/components/ui/reusable-pagination"

// Types for composite usage
type CompositeProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisiblePages?: number
  itemsPerPage?: number
  totalItems?: number
  className?: string
  children?: React.ReactNode
}

// Type guard to detect composite props versus wrapper usage
function isCompositeProps(props: any): props is CompositeProps {
  return (
    typeof props?.currentPage === "number" &&
    typeof props?.totalPages === "number" &&
    typeof props?.onPageChange === "function"
  )
}

export function Pagination(props: React.ComponentProps<"nav"> | CompositeProps) {
  if (isCompositeProps(props)) {
    const { currentPage, totalPages, onPageChange, itemsPerPage, totalItems, className } = props
    return (
      <div className={cn("w-full", className)}>
        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </div>
    )
  }
  const { className, ...rest } = props as React.ComponentProps<"nav">
  return <nav role="navigation" aria-label="pagination" className={cn("w-full", className)} {...rest} />
}

// UL container
export function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex items-center justify-center gap-1", className)} {...props} />
}

// LI item
export function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("list-none", className)} {...props} />
}

// Page link
export function PaginationLink({
  className,
  isActive,
  href = "#",
  ...props
}: React.ComponentProps<"a"> & { isActive?: boolean }) {
  return (
    <Button asChild variant={isActive ? "default" : "outline"} size="sm" className={cn("min-w-[2rem]", className)}>
      <a href={href} {...props} />
    </Button>
  )
}

// Previous control
export function PaginationPrevious({ className, href = "#", ...props }: React.ComponentProps<"a">) {
  return (
    <Button asChild variant="outline" size="sm" className={cn("flex items-center gap-1 bg-transparent", className)}>
      <a href={href} {...props}>
        <ChevronLeftIcon className="w-4 h-4" />
        Previous
      </a>
    </Button>
  )
}

// Next control
export function PaginationNext({ className, href = "#", ...props }: React.ComponentProps<"a">) {
  return (
    <Button asChild variant="outline" size="sm" className={cn("flex items-center gap-1 bg-transparent", className)}>
      <a href={href} {...props}>
        Next
        <ChevronRightIcon className="w-4 h-4" />
      </a>
    </Button>
  )
}
