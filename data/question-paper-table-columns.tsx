"use client"

import type { QuestionPaper } from "@/types"
import type { Column } from "@/components/tables/data-table"
import { Tag } from "@/components/ui/tag"
import { StatusBadge } from "@/components/ui/status-badge"

export const questionPaperTableColumns: Column<QuestionPaper>[] = [
  {
    key: "title",
    header: "Title",
    className: "text-white",
    headerClassName: "text-white",
  },
  {
    key: "tags",
    header: "Subject",
    render: (_value, row) => (
      <div className="flex flex-wrap gap-2">
        {row.tags.map((t, i) => (
          <Tag key={i} variant={t.variant} className="text-xs px-2 py-0.5">
            {t.name}
          </Tag>
        ))}
      </div>
    ),
    className: "text-white",
    headerClassName: "text-white",
  },
  {
    key: "questionCount",
    header: "Total Question",
    render: (value) => (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-white">
        {value}
      </span>
    ),
    className: "text-white",
    headerClassName: "text-white",
  },
  {
    key: "marks",
    header: "Total Marks",
    render: (value) => (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-white">
        {value}
      </span>
    ),
    className: "text-white",
    headerClassName: "text-white",
  },
  {
    key: "targetAudience",
    header: "Target Audience",
    className: "text-slate-300",
    headerClassName: "text-white",
  },
  {
    key: "isPublished",
    header: "Status",
    render: (_value, row) => <StatusBadge status={row.isPublished ? "published" : "unpublished"} />,
    className: "text-white",
    headerClassName: "text-white",
  },
  {
    key: "actions",
    header: "Actions",
    render: () => (
      <div className="flex items-center gap-2">
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-slate-300" />
      </div>
    ),
    className: "text-right",
    headerClassName: "text-right text-white",
  },
]
