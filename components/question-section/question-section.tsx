"use client"

import React, { useState } from "react"
import { Eye, Edit3, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { DifficultyBadge } from "@/components/ui/difficulty-badge"
import { Pagination } from "@/components/ui/reusable-pagination"
import { DataTable } from "@/components/tables/data-table"
import { TopicBadge } from "./topic-badge"
import { mockQuestions } from "@/data/questions"

interface QuestionSectionProps {
  topicName: string
  onBack: () => void
}

interface QuestionSectionState {
  currentPage: number
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
    currentPage: 1,
    selectedTopics: ["Design", "Ui Design"],
  })
  const router = useRouter()

  const itemsPerPage = 10
  const totalPages = Math.ceil(mockQuestions.length / itemsPerPage)

  const handleEdit = (id: string) => {
    router.push(`/edit-question/${id}?topic=${encodeURIComponent(topicName)}`)
  }

  const handleDelete = (id: string) => {
    console.log("[v0] Delete question:", id)
  }

  const handlePreview = () => {
    console.log("[v0] Preview questions")
  }

  const handleAddQuestion = () => {
    console.log("[v0] Add new question")
  }

  const handleEditTopic = () => {
    console.log("[v0] Edit topic")
  }

  const handleRemoveTopic = (index: number) => {
    setState((prev) => ({
      ...prev,
      selectedTopics: prev.selectedTopics.filter((_, i) => i !== index),
    }))
  }

  const columns = [
    {
      key: "sr",
      header: "Sr.",
      render: (value: any, question: any) => <span className="text-card-foreground text-sm">{question.sr}</span>,
    },
    {
      key: "question",
      header: "Question",
      render: (value: any, question: any) => <span className="text-card-foreground text-sm">{question.question}</span>,
    },
    {
      key: "type",
      header: "Type",
      render: (value: any, question: any) => <span className="text-muted-foreground text-sm">{question.type}</span>,
    },
    {
      key: "difficulty",
      header: "Difficulty",
      render: (value: any, question: any) => <DifficultyBadge difficulty={question.difficulty} />,
    },
    {
      key: "marks",
      header: "Marks",
      render: (value: any, question: any) => <span className="text-card-foreground text-sm">{question.marks}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (value: any, question: any) => <StatusBadge status={question.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (value: any, question: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDelete(question.id)}
            className="flex items-center justify-center p-2 size-8 bg-pink-500/10 rounded transition-colors hover:bg-pink-500/20"
          >
            <Trash2 size={12} className="text-pink-500" />
          </button>
          <button
            onClick={() => handleEdit(question.id)}
            className="flex items-center justify-center size-8 p-2 rounded bg-gradient-to-r from-orange-200/10 to-pink-600/10 hover:from-orange-200/20 hover:to-pink-600/20 transition-colors"
          >
            <Edit3 size={12} className="text-orange-500" />
          </button>
        </div>
      ),
    },
  ]

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
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7M6 6l12 12" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {state.selectedTopics.map((topic, index) => (
              <TopicBadge key={index} topic={topic} index={index} onRemove={handleRemoveTopic} />
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
            currentPage={state.currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setState((prev) => ({ ...prev, currentPage: page }))}
            itemsPerPage={itemsPerPage}
            totalItems={mockQuestions.length}
          />
        </div>
      </div>
    </div>
  )
}
