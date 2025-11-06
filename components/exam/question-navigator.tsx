"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface QuestionStatus {
  id: number
  status: "attempted" | "skipped" | "bookmarked" | "unanswered"
}

interface QuestionNavigatorProps {
  totalQuestions: number
  currentQuestion: number
  questions: QuestionStatus[]
  onQuestionSelect: (questionNumber: number) => void
  onCollapse?: (collapsed: boolean) => void
}

export function QuestionNavigator({
  totalQuestions,
  currentQuestion,
  questions,
  onQuestionSelect,
  onCollapse,
}: QuestionNavigatorProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    onCollapse?.(!isCollapsed)
  }

  // Count statuses
  const bookmarked = questions.filter((q) => q.status === "bookmarked").length
  const attempted = questions.filter((q) => q.status === "attempted").length
  const skipped = questions.filter((q) => q.status === "skipped").length

  // Grid layout - show 6 columns, multiple rows
  const questionGrid = []
  for (let i = 0; i < totalQuestions; i += 6) {
    questionGrid.push(questions.slice(i, i + 6))
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 h-fit sticky top-6">
      {/* Header with collapse button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white mb-1">Questions</h3>
          <p className="text-xs text-gray-400">
            {currentQuestion + 1}/{totalQuestions}
          </p>
        </div>
        <button onClick={toggleCollapse} className="p-1 hover:bg-slate-700 rounded transition-colors">
          {isCollapsed ? (
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <>
          {/* Question Grid */}
          <div className="space-y-3 mb-6">
            {questionGrid.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-2 flex-wrap">
                {row.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => onQuestionSelect(q.id - 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                      currentQuestion === q.id - 1
                        ? "bg-blue-500 text-white ring-2 ring-blue-400"
                        : q.status === "attempted"
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : q.status === "skipped"
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : q.status === "bookmarked"
                              ? "bg-orange-500 text-white hover:bg-orange-600"
                              : "bg-slate-700 text-gray-300 border border-slate-600 hover:border-slate-500"
                    }`}
                  >
                    {q.id}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Status Legend */}
          <div className="border-t border-slate-700 pt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-green-600" />
              <span className="text-gray-400">{attempted} Attempted</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-gray-400">{bookmarked} Bookmark</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-red-600" />
              <span className="text-gray-400">{skipped} Skip</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
