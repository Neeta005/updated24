"use client"

import React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { gradientButtonStyle } from "@/data/syllabus"
import { Button } from "@/components/ui/button"
import type { PaginationProps } from "@/types"

const Pagination = React.memo<PaginationProps>(
  ({ currentPage, totalPages, onPageChange, itemsPerPage = 10, totalItems = 0, maxVisiblePages = 5 }) => {
    if (!totalPages || totalPages <= 0) return null

    const getPageNumbers = () => {
      const pages: (number | string)[] = []
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
      let endPage = startPage + maxVisiblePages - 1
      if (endPage > totalPages) {
        endPage = totalPages
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }
      for (let i = startPage; i <= endPage; i++) pages.push(i)
      if (startPage > 1) {
        pages.unshift("...")
        pages.unshift(1)
      }
      if (endPage < totalPages) {
        pages.push("...")
        pages.push(totalPages)
      }
      return pages
    }

    const pages = getPageNumbers()

    return (
      <nav className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-b-lg">
        {/* Previous */}
        <button
          className="flex items-center gap-1 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Prev
        </button>

        {/* Page numbers */}
        <ul className="flex gap-2 overflow-x-auto">
          {pages.map((page, index) => (
            <li key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-gray-400">...</span>
              ) : (
                <button
                  className={cn(
                    "px-4 py-2 rounded-md font-medium transition",
                    page === currentPage
                      ? `${gradientButtonStyle} text-white shadow-md`
                      : "bg-gray-700 text-gray-200 hover:bg-gray-600",
                  )}
                  onClick={() => typeof page === "number" && onPageChange(page)}
                >
                  {page}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Next - keep gradient, not disabled */}
        <Button
          className={`${gradientButtonStyle} text-white px-4 py-2 flex items-center gap-2 w-full sm:w-auto justify-center rounded-md shadow-md`}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        >
          Next
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </nav>
    )
  },
)

Pagination.displayName = "Pagination"
export { Pagination }
