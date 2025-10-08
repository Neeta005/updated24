"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { syllabusData, gradientButtonStyle } from "@/data/syllabus"
import { Pagination } from "@/components/ui/pagination"
import { MobileCard } from "@/components/ui/mobile-card"
import { TableRows } from "./table-rows"
import { useState, useMemo } from "react"
import { ViewSyllabusModal } from "./view-syllabus-modal"
import { Text } from "@/components/atoms/text"
import { useRouter } from "next/navigation"
import { SearchInput } from "@/components/ui/search-input" // Import the reusable component

export function Syllabus() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSyllabus, setSelectedSyllabus] = useState<string | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  
  // Search states
  const [subjectSearch, setSubjectSearch] = useState("")
  const [topicSearch, setTopicSearch] = useState("")
  const [targetAudienceSearch, setTargetAudienceSearch] = useState("")
  const [sortFilter, setSortFilter] = useState("")

  const itemsPerPage = 10
  const router = useRouter()

  // Filter and search logic
  const filteredData = useMemo(() => {
    let filtered = syllabusData

    // Apply search filters
    if (subjectSearch) {
      filtered = filtered.filter(item => 
        item.subject.toLowerCase().includes(subjectSearch.toLowerCase())
      )
    }

    if (topicSearch) {
      filtered = filtered.filter(item => 
        item.topic?.toLowerCase().includes(topicSearch.toLowerCase())
      )
    }

    if (targetAudienceSearch) {
      filtered = filtered.filter(item => 
        item.targetAudience.toLowerCase().includes(targetAudienceSearch.toLowerCase())
      )
    }

    // Apply sorting
    if (sortFilter === "latest") {
      filtered = [...filtered].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    } else if (sortFilter === "older") {
      filtered = [...filtered].sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
    }

    return filtered
  }, [subjectSearch, topicSearch, targetAudienceSearch, sortFilter])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handleViewSyllabus = (syllabusId: string) => {
    setSelectedSyllabus(syllabusId)
    setIsViewModalOpen(true)
  }

  const handleEditSyllabus = (syllabusId: string) => {
    router.push(`/syllabus/edit/${syllabusId}`)
  }

  const handleDeleteSyllabus = (syllabusId: string) => {
    // TODO: implement delete logic (API call / state update)
    console.log("delete", syllabusId)
  }

  // Reset search filters
  const resetFilters = () => {
    setSubjectSearch("")
    setTopicSearch("")
    setTargetAudienceSearch("")
    setSortFilter("")
    setCurrentPage(1)
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
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row w-full gap-4">
            {/* Subject Search with custom icon */}
            <SearchInput
              placeholder="Search Subject"
              value={subjectSearch}
              onChange={setSubjectSearch}
              className="w-full sm:w-60"
              icon="custom"
              customIcon="/icons/subject.png" // Add your icon to public/icons/
              iconAlt="Subject search"
            />

            {/* Topic Search with custom icon */}
            <SearchInput
              placeholder="Search Topic"
              value={topicSearch}
              onChange={setTopicSearch}
              className="w-full sm:w-60"
              icon="custom"
              customIcon="/icons/noun-topic-6799098 1.png" // Add your icon to public/icons/
              iconAlt="Topic search"
            />

            {/* Target Audience Search with custom icon */}
            <SearchInput
              placeholder="Search Target Audience"
              value={targetAudienceSearch}
              onChange={setTargetAudienceSearch}
              className="w-full sm:w-60"
              icon="custom"
              customIcon="/icons/audience tarr 1 (1).png" // Add your icon to public/icons/
              iconAlt="Target audience search"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              {/* Clear filters button */}
              {(subjectSearch || topicSearch || targetAudienceSearch || sortFilter) && (
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="text-gray-300 border-gray-600 hover:bg-gray-700"
                >
                  Clear Filters
                </Button>
              )}
              
              {/* Search results count */}
              <span className="text-gray-400 text-sm flex items-center">
                {filteredData.length} of {syllabusData.length} results
              </span>
            </div>
{/* 
            <Select value={sortFilter} onValueChange={setSortFilter}>
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
            </Select> */}
          </div>
        </div>

        {/* No results message */}
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-lg">No syllabus found matching your search criteria.</p>
            <Button
              variant="outline"
              onClick={resetFilters}
              className="mt-4 text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Table (desktop) */}
        {filteredData.length > 0 && (
          <div className="hidden md:block overflow-x-auto">
            <div className="grid grid-cols-[2fr_1fr_2fr_1fr] gap-x-32 px-6 py-2 bg-black text-white font-medium rounded-t-lg">
              <div>Subject</div>
              <div>Category</div>
              <div className="whitespace-nowrap">Target Audience</div>
              <div>Actions</div>
            </div>

            <TableRows
              data={filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
              onViewSyllabus={handleViewSyllabus}
              onEditSyllabus={handleEditSyllabus}
              onDisableSyllabus={handleDeleteSyllabus}
            />
          </div>
        )}

        {/* Mobile View */}
        {filteredData.length > 0 && (
          <div className="block md:hidden space-y-4">
            {filteredData
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((item) => (
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

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredData.length}
            />
          </div>
        )}

        {/* View Modal */}
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
