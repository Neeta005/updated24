"use client"

interface QuestionBankHeaderProps {
  title: string
  targetAudience: string
  topicsCount: number
  questionsCount: number
}

const headerColumns = [
  { key: "subjects", label: "Subjects / Topics", span: 3 },
  { key: "audience", label: "Target Audience", span: 2 },
  { key: "topics", label: "Topics", span: 2 },
  { key: "questions", label: "Questions", span: 2 },
  { key: "actions", label: "Actions", span: 3 },
]

export function QuestionBankHeader() {
  return (
    <div className="grid grid-cols-12 gap-6 px-6 py-3 border-b border-gray-700 bg-gray-900">
      {headerColumns.map((column) => (
        <div key={column.key} className={`col-span-${column.span} text-gray-300 text-sm font-semibold`}>
          {column.label}
        </div>
      ))}
    </div>
  )
}
