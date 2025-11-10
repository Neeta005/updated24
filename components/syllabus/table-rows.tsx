"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Trash, ArrowUpDown } from "lucide-react"
import { syllabusData as initialSyllabusData } from "@/data/syllabus"
import { CategoryBadge } from "@/components/ui/category-badge"
import Image from "next/image"

interface TableRowsProps {
  onViewSyllabus: (syllabusId: string) => void
  onEditSyllabus: (syllabusId: string) => void
  onDisableSyllabus: (syllabusId: string) => void
}
export function TableRows({
  data,
  onViewSyllabus,
  onEditSyllabus,
  onDisableSyllabus,
}: TableRowsProps) {
  const handleViewSyllabus = (syllabusId: string) => {
    onViewSyllabus(syllabusId)
  }

  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-[2fr_1fr_2fr_1fr] gap-x-32 px-6 py-3
                     bg-gray-800 hover:bg-gray-700 transition-colors
                     border-b border-gray-700 last:rounded-b-lg items-center
                     cursor-pointer"
          onClick={() => handleViewSyllabus(item.id)}
        >
          <div className="text-white">{item.subject}</div>
          <div><CategoryBadge category={item.category} /></div>
          <div className="text-white whitespace-nowrap">{item.targetAudience}</div>

          <div
            className="flex justify-left"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="bg-gray-800 border border-gray-600 text-white z-50"
                align="center"
                sideOffset={5}
              >
                <DropdownMenuItem
                  onClick={() => handleViewSyllabus(item.id)}
                  className="cursor-pointer hover:bg-gray-700"
                >
                  <Eye size={16} className="mr-2" /> View
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onEditSyllabus(item.id)}
                  className="cursor-pointer hover:bg-gray-700"
                >
                  <Image src="/icons/editdotconnector.png" alt="Edit" width={12} height={12} className="mr-2" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onDisableSyllabus(item.id)}
                  className="cursor-pointer hover:bg-gray-700"
                >
                  <Trash size={16} className="mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </>
  )
}
