"use client"

import React from "react"
import type { Column } from "@/components/tables/data-table"
import { DifficultyBadge } from "@/components/ui/difficulty-badge"
import Image from "next/image"
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
          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(question.id)
            }}
            className="flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:brightness-110"
          >
            <Image
              src="/icons/newdeletequestionbank.png"
              alt="Delete"
              width={28}
              height={28}
              className="object-contain"
            />
          </button>

          {/* Edit Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(question.id)
            }}
            className="flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:brightness-110"
          >
            <Image
              src="/icons/neweditquestionbank.png"
              alt="Edit"
              width={28}
              height={28}
              className="object-contain"
            />
          </button>
        </div>
      ),
    },
  ]
}
