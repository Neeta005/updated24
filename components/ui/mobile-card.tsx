"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Trash } from "lucide-react"
import { CategoryBadge } from "@/components/ui/category-badge"
import Image from "next/image"

interface MobileCardProps {
  id: string
  title: string
  category: string
  description: string
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}

export function MobileCard({
  id,
  title,
  category,
  description,
  onView,
  onEdit,
  onDelete,
  className = "",
}: MobileCardProps) {
  return (
    <div
      className={`bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold text-base sm:text-lg mb-1">{title}</h3>
          <CategoryBadge category={category} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-600 p-2">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border border-gray-600 text-white">
            {onView && (
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer" onClick={() => onView(id)}>
                <Eye size={16} className="mr-2" />
                View
              </DropdownMenuItem>
            )}
            {onEdit && (
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer" onClick={() => onEdit(id)}>
                <Image src="/icons/editdotconnector.png" alt="Edit" width={12} height={12} className="mr-2" />
                Edit
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer" onClick={() => onDelete(id)}>
                <Trash size={16} className="mr-2" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="text-gray-300 text-sm">
        <span className="text-gray-400">Target Audience:</span> {description}
      </div>
    </div>
  )
}
