"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { syllabusData } from "@/data/syllabus"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { MobileCard } from "@/components/ui/mobile-card"
import { TableRows } from "./table-rows"
import { useState, useMemo } from "react"
import { ViewSyllabusModal } from "./view-syllabus-modal"
import { Text } from "@/components/atoms/text"
import { useRouter } from "next/navigation"
import { SearchInput } from "@/components/ui/search-input"
import { ArrowUpDown } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"

export function Syllabus() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSyllabus, setSelectedSyllabus] = useState<string | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const [subjectSearch, setSubjectSearch] = useState("")
  const [topicSearch, setTopicSearch] = useState("")
  const [targetAudienceSearch, setTargetAudienceSearch] = useState("")
  const [sortFilter, setSortFilter] = useState("")

  // Sorting state
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)

  const itemsPerPage = 10
  const router = useRouter()

  // Sorting handler
  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        // toggle direction
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" }
      }
      return { key, direction: "asc" }
    })
  }

  const filteredData = useMemo(() => {
    let filtered = syllabusData

    if (subjectSearch) {
      filtered = filtered.filter((item) => item.subject.toLowerCase().includes(subjectSearch.toLowerCase()))
    }

    if (topicSearch) {
      filtered = filtered.filter((item) => item.topic?.toLowerCase().includes(topicSearch.toLowerCase()))
    }

    if (targetAudienceSearch) {
      filtered = filtered.filter((item) =>
        item.targetAudience.toLowerCase().includes(targetAudienceSearch.toLowerCase()),
      )
    }

    if (sortFilter === "latest") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
      )
    } else if (sortFilter === "older") {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime(),
      )
    }

    // Apply column sorting
    if (sortConfig) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = (a[sortConfig.key] || "").toString().toLowerCase()
        const bVal = (b[sortConfig.key] || "").toString().toLowerCase()
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [subjectSearch, topicSearch, targetAudienceSearch, sortFilter, sortConfig])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handleViewSyllabus = (id: string) => {
    setSelectedSyllabus(id)
    setIsViewModalOpen(true)
  }

  const handleEditSyllabus = (id: string) => router.push(`/syllabus/edit/${id}`)
  const handleDeleteSyllabus = (id: string) => {}

  const resetFilters = () => {
    setSubjectSearch("")
    setTopicSearch("")
    setTargetAudienceSearch("")
    setSortFilter("")
    setSortConfig(null)
    setCurrentPage(1)
  }

  // Helper to render arrow direction (↑↓)
  const renderSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <ArrowUpDown className="w-4 h-4 ml-2 opacity-50" />
    return (
      <ArrowUpDown
        className={`w-4 h-4 ml-2 transition-transform ${
          sortConfig.direction === "asc" ? "rotate-180 text-blue-400" : "text-blue-400"
        }`}
      />
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="bg-card rounded-lg sm:p-6 md:p-8 2xl:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Text as="h1" className="text-xl sm:text-2xl font-semibold text-white">
            Subject and Syllabus
          </Text>
          <Link href="/syllabus/add">
           <GradientButton
  size="md"
  className="w-full sm:w-auto flex items-center justify-center gap-2"
>
  <span className="text-lg">+</span>
  <span>Add Syllabus</span>
</GradientButton>

          </Link>
        </div>

        <div className="border-b border-gray-600 mb-6"></div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row w-full gap-4">
            <SearchInput
              placeholder="Search Subject"
              value={subjectSearch}
              onChange={setSubjectSearch}
              className="w-full sm:w-60"
              icon="custom"
              customIcon="/icons/subject.png"
              iconAlt="Subject search"
            />

            <SearchInput
              placeholder="Search Topic"
              value={topicSearch}
              onChange={setTopicSearch}
              className="w-full sm:w-60"
              icon="custom"
              customIcon="/icons/noun-topic-6799098 1.png"
              iconAlt="Topic search"
            />

            <SearchInput
              placeholder="Search Target Audience"
              value={targetAudienceSearch}
              onChange={setTargetAudienceSearch}
              className="w-full sm:w-60"
              icon="custom"
              customIcon="/icons/audience tarr 1 (1).png"
              iconAlt="Target audience search"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              {(subjectSearch || topicSearch || targetAudienceSearch || sortFilter || sortConfig) && (
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="text-gray-300 border-gray-600 hover:bg-gray-700 bg-transparent"
                >
                  Clear Filters
                </Button>
              )}
              <span className="text-gray-400 text-sm flex items-center">
                {filteredData.length} of {syllabusData.length} results
              </span>
            </div>
          </div>
        </div>

        {/* No results */}
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-lg">No syllabus found matching your search criteria.</p>
            <Button
              variant="outline"
              onClick={resetFilters}
              className="mt-4 text-gray-300 border-gray-600 hover:bg-gray-700 bg-transparent"
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Table */}
        {filteredData.length > 0 && (
          <div className="hidden md:block overflow-x-auto">
            {/* Header with sorting */}
            <div className="grid grid-cols-[2fr_1fr_2fr_1fr] gap-x-32 px-6 py-2 bg-black text-white font-medium rounded-t-lg">
              <div className="flex items-center cursor-pointer select-none" onClick={() => handleSort("subject")}>
                Subject {renderSortIcon("subject")}
              </div>
              <div className="flex items-center cursor-pointer select-none" onClick={() => handleSort("category")}>
                Category {renderSortIcon("category")}
              </div>
              <div
                className="flex items-center whitespace-nowrap cursor-pointer select-none"
                onClick={() => handleSort("targetAudience")}
              >
                Target Audience {renderSortIcon("targetAudience")}
              </div>
              <div>Actions</div>
            </div>

            {/* Rows */}
            <TableRows
              data={filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
              onViewSyllabus={handleViewSyllabus}
              onEditSyllabus={handleEditSyllabus}
              onDisableSyllabus={handleDeleteSyllabus}
            />
          </div>
        )}

        {/* Mobile view */}
        {filteredData.length > 0 && (
          <div className="block md:hidden space-y-4">
            {filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
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
        )}

        {filteredData.length > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredData.length}
            >
              <PaginationContent>
                <PaginationPrevious />
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(i + 1)
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationNext />
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {selectedSyllabus && (
          <ViewSyllabusModal
            isOpen={isViewModalOpen}
            onClose={() => {
              setIsViewModalOpen(false)
              setSelectedSyllabus(null)
            }}
            syllabusId={selectedSyllabus}
          />
        )}
      </div>
    </div>
  )
}
