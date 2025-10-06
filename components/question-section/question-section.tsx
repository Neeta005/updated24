"use client"

import React, { useState, useMemo } from "react"
import { Eye, Book, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/tables/data-table"
import { TopicBadge } from "./topic-badge"
import { mockQuestions } from "@/data/questions"
import { createQuestionColumns } from "@/data/question-table-columns"
import { gradientButtonStyle } from "@/data/manual2"
import { Pagination } from "@/components/ui/pagination"
import { SearchInput } from "@/components/ui/search-input"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"

interface QuestionSectionProps {
  topicName: string
  onBack: () => void
}

interface QuestionSectionState {
  selectedTopics: string[]
}

export function QuestionSection({ topicName, onBack }: QuestionSectionProps) {
  const [state, setState] = useState<QuestionSectionState>({
    selectedTopics: ["Design", "Ui Design"],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [searchMain, setSearchMain] = useState("")
  const [searchTopic, setSearchTopic] = useState("")
  const [searchAudience, setSearchAudience] = useState("")
  const router = useRouter()

  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return mockQuestions.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, itemsPerPage])

  const totalPages = Math.ceil(mockQuestions.length / itemsPerPage)

  const handleEdit = (id: string) => router.push(`/edit-question/${id}?topic=${encodeURIComponent(topicName)}`)
  const handleDelete = (id: string) => {}
  const handlePreview = () => router.push("/question-papers/preview")
  const handleAddQuestion = () => router.push("/question-papers/add")
  const handleRemoveTopic = (index: number) => {
    setState((prev) => ({
      ...prev,
      selectedTopics: prev.selectedTopics.filter((_, i) => i !== index),
    }))
  }
  const handlePageChange = (page: number) => setCurrentPage(page)

  const columns = createQuestionColumns({ onEdit: handleEdit, onDelete: handleDelete })

  return (
    <div className="flex-1 p-4 bg-background min-h-screen">
      <div className="bg-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-card-foreground">Question Bank</h1>
         <div className="flex items-center gap-3">
  {/* Back button */}
  <Button
    onClick={onBack}
    variant="outline"
    size="md"
    className="h-10 px-6 py-2 text-sm text-card-foreground border-white hover:bg-white/10"
  >
    Back
  </Button>

  {/* Add Question button */}
  <Button
    onClick={handleAddQuestion}
    variant="default"
    size="md"
    className="h-10 px-6 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
  >
    Add Question
  </Button>

  {/* View QA button - Gradient */}
  <GradientButton
    onClick={handlePreview}
    size="md"
    className="h-10 px-6 py-2 text-sm flex items-center gap-2"
  >
    <Eye size={16} />
    View QA
  </GradientButton>
</div>

        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Inputs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
             <SearchInput
  placeholder="Search"
  value={searchMain}
  onChange={setSearchMain}
  className="w-full sm:w-56"
  icon="custom"
  customIcon="/icons/subject.png"  // Make sure this exists in public/icons
  iconAlt="Search icon"
/>

<SearchInput
  placeholder="Search Topic"
  value={searchTopic}
  onChange={setSearchTopic}
  className="w-full sm:w-56"
  icon="custom"
  customIcon="/icons/noun-topic-6799098 1.png"   // Make sure this exists in public/icons
  iconAlt="Topic icon"
/>

<SearchInput
  placeholder="Search Target Audience"
  value={searchAudience}
  onChange={setSearchAudience}
  className="w-full sm:w-56"
  icon="custom"
  customIcon="/icons/audience tarr 1 (1).png"   // Make sure this exists in public/icons
  iconAlt="Users icon"
/>

            </div>

            {/* Results count */}
            <div className="text-sm text-gray-400 font-medium whitespace-nowrap">
              Showing results: <span className="text-white font-semibold">{mockQuestions.length}</span>
            </div>
          </div>

          {/* Topic Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {state.selectedTopics.map((topic, index) => (
              <TopicBadge key={index} topic={topic} index={index} onRemove={handleRemoveTopic} />
            ))}
          </div>
        </div>

        <DataTable
          data={paginatedQuestions}
          columns={columns}
          className="bg-muted rounded-xl overflow-hidden border border-border"
          headerClassName="bg-card"
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={5}
        />
      </div>
    </div>
  )
}
