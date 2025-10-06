"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Trash } from "lucide-react"
import { syllabusData } from "@/data/syllabus"
import { CategoryBadge } from "@/components/ui/category-badge"
import { ViewSyllabusModal } from "./view-syllabus-modal"
import { useState } from "react"
import Image from "next/image"

interface TableRowsProps {
  onViewSyllabus: (syllabusId: string) => void
  onEditSyllabus: (syllabusId: string) => void
  onDisableSyllabus: (syllabusId: string) => void
}

export function TableRows({
  onViewSyllabus,
  onEditSyllabus,
  onDisableSyllabus,
}: TableRowsProps) {
  const [selectedSyllabus, setSelectedSyllabus] = useState<string | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const handleViewSyllabus = (syllabusId: string) => {
    setSelectedSyllabus(syllabusId)
    setIsViewModalOpen(true)
    onViewSyllabus(syllabusId)
  }

  return (
    <>
      {syllabusData.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-[2fr_1fr_2fr_1fr] gap-x-32 px-6 py-3
                     bg-gray-800 hover:bg-gray-700 transition-colors
                     border-b border-gray-700 last:rounded-b-lg items-center
                     overflow-visible cursor-pointer"
          onClick={() => handleViewSyllabus(item.id)} // ✅ Whole row click
        >
          {/* Subject */}
          <div className="text-white">{item.subject}</div>

          {/* Category */}
          <div>
            <CategoryBadge category={item.category} />
          </div>

          {/* Target Audience */}
          <div className="text-white whitespace-nowrap">{item.targetAudience}</div>

          {/* Actions */}
          <div
            className="flex justify-left"
            onClick={(e) => e.stopPropagation()} // ✅ Prevent row click when using dropdown
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-700 "
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="bg-gray-800 border border-gray-600 text-white z-50"
                align="center"
                sideOffset={5}
              >
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white"
                  onClick={() => handleViewSyllabus(item.id)}
                >
                  <Eye size={16} className="mr-2" /> View
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white"
                  onClick={() => onEditSyllabus(item.id)}
                >
                  <Image
                    src="/icons/editdotconnector.png"
                    alt="Edit"
                    width={12}
                    height={12}
                    className="mr-2"
                  />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white"
                  onClick={() => onDisableSyllabus(item.id)}
                >
                  <Trash size={16} className="mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}

      {/* Local Modal */}
      {/* <ViewSyllabusModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        syllabusId={selectedSyllabus}
      /> */}
    </>
  )
}
