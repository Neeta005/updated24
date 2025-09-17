"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import Link from "next/link"
import { syllabusData, gradientButtonStyle } from "@/data/syllabus"
import { Pagination } from "@/components/ui/reusable-pagination"
import { MobileCard } from "@/components/ui/mobile-card"
import { TableRows } from "./table-rows"
import { useState } from "react"
import { ViewSyllabusModal } from "./view-syllabus-modal"
import { Text } from "@/components/atoms/text" // new import

export function Syllabus() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSyllabus, setSelectedSyllabus] = useState<string | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const itemsPerPage = 10
  const totalPages = Math.ceil(syllabusData.length / itemsPerPage)

  const handleViewSyllabus = (syllabusId: string) => {
    setSelectedSyllabus(syllabusId)
    setIsViewModalOpen(true)
  }

  const handleEditSyllabus = (syllabusId: string) => {
    window.location.href = `/syllabus/edit/${syllabusId}`
  }

  const handleDeleteSyllabus = (syllabusId: string) => {
    // existing code here
  }

  return (
    <div className="min-h-screen p-4">
      <div className="bg-card rounded-lg sm:p-6 md:p-8 2xl:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Text as="h1" className="text-xl sm:text-2xl font-semibold text-white">
            Syllabus
          </Text>
          <Link href="/syllabus/add">
            <Button
              className={`${gradientButtonStyle} text-white px-4 py-2 flex items-center gap-2 w-full sm:w-auto justify-center rounded-md shadow-md`}
            >
              <span className="text-lg">+</span>
              Add Syllabus
            </Button>
          </Link>
        </div>

        <div className="border-b border-gray-600 mb-6"></div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:hidden" />
            <Input
              placeholder="search"
              className="bg-gray-700 border border-gray-600 text-white placeholder:text-gray-300 rounded-md pl-10 md:pl-4 py-2 w-full"
            />
          </div>

          <Select>
            <SelectTrigger className="w-full sm:w-32 bg-gray-700 border border-gray-600 text-white rounded-md">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border border-gray-600 text-white">
              <SelectItem value="latest" className="hover:bg-gray-600">
                Latest
              </SelectItem>
              <SelectItem value="older" className="hover:bg-gray-600">
                Older
              </SelectItem>
              <SelectItem value="higher-degree" className="hover:bg-gray-600">
                Higher Degree
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="hidden md:block overflow-x-auto">
          <div className="grid grid-cols-[2fr_1fr_2fr_1fr] gap-x-32 px-6 py-2 bg-black text-white font-medium rounded-t-lg">
            <div>Subject</div>
            <div>Category</div>
            <div className="whitespace-nowrap">Target Audience</div>
            <div>Actions</div>
          </div>

          <TableRows
            onViewSyllabus={handleViewSyllabus}
            onEditSyllabus={handleEditSyllabus}
            onDisableSyllabus={handleDeleteSyllabus}
          />
        </div>

        {/* Mobile View */}
        <div className="block md:hidden space-y-4">
          {syllabusData.map((item) => (
            <MobileCard
              key={item.id}
              id={item.id}
              title={item.subject}
              category={item.category}
              description={item.targetAudience}
              onView={handleViewSyllabus}
              onEdit={handleEditSyllabus}
              onDelete={handleDeleteSyllabus}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={syllabusData.length}
          />
        </div>

        {/* View Modal */}
        <ViewSyllabusModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          syllabusId={selectedSyllabus}
        />
      </div>
    </div>
  )
}
