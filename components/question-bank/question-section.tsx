"use client"

import React, { useState } from "react"
import { Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { Pagination } from "@/components/ui/reusable-pagination"
import { DataTable } from "@/components/tables/data-table"
import { mockQuestions } from "@/data/questions"
import { EditTopicModal } from "@/components/modals/edit-topic-modal"
import { createQuestionColumns } from "@/data/question-table-columns"

interface QuestionSectionProps {
  topicName: string
  onBack: () => void
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
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTopics, setSelectedTopics] = useState(["Design", "Ui Design"])
  const [isEditTopicModalOpen, setIsEditTopicModalOpen] = useState(false)
  const router = useRouter()

  const itemsPerPage = 10
  const totalPages = Math.ceil(mockQuestions.length / itemsPerPage)

  const handleEdit = (id: string) => {
    router.push(`/edit-question/${id}?topic=${encodeURIComponent(topicName)}`)
  }

  const handleDelete = (id: string) => {}

  const handlePreview = () => {
    try {
      router.push("/question-papers/preview")
    } catch (error) {
      // no-op
    }
  }

  const handleAddQuestion = () => {
    try {
      router.push("/question-papers/add")
    } catch (error) {
      // no-op
    }
  }

  const handleEditTopic = () => {
    setIsEditTopicModalOpen(true)
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
              className="px-4 py-2 border border-border hover:bg-muted text-card-foreground rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors"
            >
              <Eye size={16} />
              Preview
            </button>
            <button
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
            >
              Add Question
            </button>
            <button
              onClick={handleEditTopic}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white rounded-lg transition-colors"
            >
              Edit Topic
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 bg-transparent border border-border rounded-lg text-card-foreground placeholder-muted-foreground focus:outline-none focus:border-ring transition-colors"
            />
          </div>

          <div className="relative">
            <select className="appearance-none px-4 py-2 bg-muted border border-border rounded-lg text-card-foreground focus:outline-none focus:border-ring transition-colors pr-10">
              <option value="">Filter By</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="size-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7M6 6l12 12" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedTopics.map((topic, index) => (
              <div key={index} className="flex items-center">
                <div className="relative inline-flex items-center px-3 py-1 bg-muted text-card-foreground rounded-full text-sm">
                  {topic}
                  <button
                    className="ml-2 text-muted-foreground hover:text-card-foreground transition-colors"
                    onClick={() => {
                      setSelectedTopics((prev) => prev.filter((_, i) => i !== index))
                    }}
                  >
                    <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {index === 0 && <span className="text-green-400 text-sm ml-2">●</span>}
                {index === 1 && <span className="text-green-400 text-sm ml-2">●</span>}
              </div>
            ))}
          </div>
        </div>

        <DataTable
          data={mockQuestions}
          columns={columns}
          className="bg-muted rounded-xl overflow-hidden border border-border"
          headerClassName="bg-card"
        />

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={mockQuestions.length}
          />
        </div>
      </div>
      <EditTopicModal
        isOpen={isEditTopicModalOpen}
        onClose={() => setIsEditTopicModalOpen(false)}
        topic={{
          id: "1",
          name: topicName,
          subject: "Network Security",
          description: "",
        }}
        onSave={(updatedTopic) => {
          setIsEditTopicModalOpen(false)
        }}
      />
    </div>
  )
}
