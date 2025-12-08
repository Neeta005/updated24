"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Eye, Trash, MoreHorizontal } from "lucide-react"
import { CategoryBadge } from "@/components/ui/category-badge"
import Image from "next/image"

interface TableRowsProps {
  data: {
    id: string
    subject: string
    category: string
    targetAudience: string
  }[]
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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [syllabusToDelete, setSyllabusToDelete] = useState<{ id: string; subject: string } | null>(null)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const handleViewSyllabus = (syllabusId: string) => {
    onViewSyllabus(syllabusId)
    setOpenDropdownId(null)
  }

  const handleDeleteClick = (id: string, subject: string) => {
    setSyllabusToDelete({ id, subject })
    setDeleteModalOpen(true)
    setOpenDropdownId(null)
  }

  const confirmDelete = () => {
    if (syllabusToDelete) {
      onDisableSyllabus(syllabusToDelete.id)
      setDeleteModalOpen(false)
      setSyllabusToDelete(null)
    }
  }

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdownId &&
        dropdownRefs.current[openDropdownId] &&
        !dropdownRefs.current[openDropdownId]?.contains(event.target as Node)
      ) {
        setOpenDropdownId(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [openDropdownId])

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
          <div>
            <CategoryBadge category={item.category} />
          </div>
          <div className="text-white whitespace-nowrap">{item.targetAudience}</div>

          {/* Actions */}
          <div className="relative flex justify-start" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700"
              onClick={() =>
                setOpenDropdownId(openDropdownId === item.id ? null : item.id)
              }
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>

            {/* Dropdown */}
          {/* Dropdown */}
{openDropdownId === item.id && (
  <div
    ref={(el) => (dropdownRefs.current[item.id] = el)}
    className="absolute right-0 mt-2 w-36 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50 overflow-hidden
               max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 transition-all"
  >
    <button
      className="flex items-center w-full px-3 py-2 text-white hover:bg-gray-700 transition-colors"
      onClick={() => handleViewSyllabus(item.id)}
    >
      <Eye size={16} className="mr-2" /> View
    </button>
    <button
      className="flex items-center w-full px-3 py-2 text-white hover:bg-gray-700 transition-colors"
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
    </button>
    <button
      className="flex items-center w-full px-3 py-2  hover:bg-gray-700 transition-colors"
      onClick={() => handleDeleteClick(item.id, item.subject)}
    >
      <Trash size={16} className="mr-2" /> Delete
    </button>
  </div>
)}

          </div>
        </div>
      ))}

      {/* DELETE CONFIRM MODAL */}
      {deleteModalOpen && syllabusToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 w-80 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-2">Confirm Delete</h2>
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete the syllabus for:{" "}
              <span className="text-red-400 font-semibold">{syllabusToDelete.subject}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <GradientButton onClick={confirmDelete} size="md">
                Confirm
              </GradientButton>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
