"use client"

import React from "react"
import type { Column } from "@/components/tables/data-table"
import { DifficultyBadge } from "@/components/ui/difficulty-badge"

// Import the Question type that matches mockQuestions shape (includes sr)
import type { Question as QuestionsDataQuestion } from "@/data/questions"

const StatusBadge = React.memo(({ status }: { status: "Draft" | "Published" }) => {
  const colors: Record<"Draft" | "Published", string> = {
    Draft: "bg-purple-500/20 text-purple-400",
    Published: "bg-green-500/20 text-green-400",
  }
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>{status}</span>
})
StatusBadge.displayName = "StatusBadge"

export function createQuestionColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}): Column<QuestionsDataQuestion>[] {
  return [
    {
      key: "sr",
      header: "Sr.",
      render: (_value, question) => <span className="text-card-foreground text-sm">{question.sr}</span>,
    },
    {
      key: "question",
      header: "Question",
      render: (_value, question) => <span className="text-card-foreground text-sm">{question.question}</span>,
    },
    {
      key: "type",
      header: "Type",
      render: (_value, question) => <span className="text-muted-foreground text-sm">{question.type}</span>,
    },
    {
      key: "difficulty",
      header: "Difficulty",
      render: (_value, question) => <DifficultyBadge difficulty={question.difficulty} />,
    },
    {
      key: "marks",
      header: "Marks",
      render: (_value, question) => <span className="text-card-foreground text-sm">{question.marks}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (_value, question) => <StatusBadge status={question.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (_value, question) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(question.id)
            }}
            className="flex items-center justify-center p-2 size-8 bg-pink-500/10 rounded transition-colors hover:bg-pink-500/20"
          >
            {/* trash icon handled at callsite or rely on existing styles */}
            <svg className="h-3 w-3 text-pink-500" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18M8 6v12m8-12v12M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(question.id)
            }}
            className="flex items-center justify-center size-8 p-2 rounded bg-gradient-to-r from-orange-200/10 to-pink-600/10 hover:from-orange-200/20 hover:to-pink-600/20 transition-colors"
          >
            <svg className="h-3 w-3 text-orange-500" viewBox="0 0 24 24" fill="none">
              <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M16.5 3.5a2.121 2.121 0 1 1 3 3L8 18l-4 1 1-4 11.5-11.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ]
}
