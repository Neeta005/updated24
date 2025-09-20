"use client"

import React, { useState, useMemo } from "react"
import { Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/tables/data-table"
import { TopicBadge } from "./topic-badge"
import { mockQuestions } from "@/data/questions"
import { createQuestionColumns } from "@/data/question-table-columns"
import { gradientButtonStyle } from "@/data/manual2"
import { Pagination } from "@/components/ui/pagination" // Adjust the import path as needed

interface QuestionSectionProps {
  topicName: string
  onBack: () => void
}

interface QuestionSectionState {
  selectedTopics: string[]
}

const StatusBadge = React.memo(({ status }: { status: string }) => {
  const colors = {
    Draft: "bg-purple-500/20 text-purple-400",
    Published: "bg-green-500/20 text-green-400",
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  )
})
StatusBadge.displayName = "StatusBadge"

export function QuestionSection({ topicName, onBack }: QuestionSectionProps) {
  const [state, setState] = useState<QuestionSectionState>({
    selectedTopics: ["Design", "Ui Design"],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) // You can adjust this as needed
  const router = useRouter()

  // Calculate paginated data
  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return mockQuestions.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, itemsPerPage])

  // Calculate total pages
  const totalPages = Math.ceil(mockQuestions.length / itemsPerPage)

  const handleEdit = (id: string) => {
    router.push(`/edit-question/${id}?topic=${encodeURIComponent(topicName)}`)
  }

  const handleDelete = (id: string) => {}

  const handlePreview = () => {
    router.push("/question-papers/preview")
  }

  const handleAddQuestion = () => {
    router.push("/question-papers/add")
  }

  const handleRemoveTopic = (index: number) => {
    setState((prev) => ({
      ...prev,
      selectedTopics: prev.selectedTopics.filter((_, i) => i !== index),
    }))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const columns = createQuestionColumns({ onEdit: handleEdit, onDelete: handleDelete })

  return (
    <div className="flex-1 p-4 bg-background min-h-screen">
      <div className="bg-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-card-foreground">Question Bank</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="px-4 py-2 border border-white hover:bg-white/10 text-card-foreground rounded-lg transition-colors"
            >
              Back
            </button>

            <button
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
            >
              Add Question
            </button>
            <button
              onClick={handlePreview}
              className={`${gradientButtonStyle} text-white px-4 py-2 flex items-center gap-2 w-full sm:w-auto justify-center rounded-md shadow-md`}
            >
              <Eye size={16} />
              View QA
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {/* First Row → Search inputs + Results text */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Inputs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* Main Search */}
              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-900 border border-gray-700 rounded-full pl-10 pr-4 py-2 
                           text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 
                           focus:ring-2 focus:ring-purple-500/30 w-full text-sm transition-all duration-200"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"
                  />
                </svg>
              </div>

              {/* Search Topic */}
              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  placeholder="Search Topic"
                  className="bg-gray-900 border border-gray-700 rounded-full px-4 py-2 
                           text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 
                           focus:ring-2 focus:ring-purple-500/30 w-full text-sm transition-all duration-200"
                />
              </div>

              {/* Search Target Audience */}
              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  placeholder="Search Target Audience"
                  className="bg-gray-900 border border-gray-700 rounded-full px-4 py-2 
                           text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 
                           focus:ring-2 focus:ring-purple-500/30 w-full text-sm transition-all duration-200"
                />
              </div>
            </div>

            {/* Results Text → aligned right */}
            <div className="text-sm text-gray-400 font-medium whitespace-nowrap">
              Showing results: <span className="text-white font-semibold">{mockQuestions.length}</span>
            </div>
          </div>

          {/* Second Row → Topic Badges */}
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
        
        {/* Add Pagination component */}
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
