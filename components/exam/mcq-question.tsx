"use client"
import { Bookmark } from "lucide-react"

interface Option {
  id: string
  text: string
}

interface MCQQuestionProps {
  questionNumber: number
  totalQuestions: number
  question: string
  options: Option[]
  selectedAnswer: string | null
  isBookmarked: boolean
  subject: string
  topic: string
  imageUrl?: string
  codeSnippet?: string
  codeLanguage?: string
  onAnswerSelect: (optionId: string) => void
  onToggleBookmark: () => void
}

export function MCQQuestion({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedAnswer,
  isBookmarked,
  subject,
  topic,
  imageUrl,
  codeSnippet,
  codeLanguage,
  onAnswerSelect,
  onToggleBookmark,
}: MCQQuestionProps) {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex gap-6 text-sm">
            <span className="text-gray-400">
              Subject: <span className="text-white font-medium">{subject}</span>
            </span>
            <span className="text-gray-400">
              Topic: <span className="text-white font-medium">{topic}</span>
            </span>
          </div>
        </div>
        <button
          onClick={onToggleBookmark}
          className={`p-2 rounded-lg transition-colors ${
            isBookmarked ? "bg-orange-500/20 text-orange-400" : "bg-slate-700 text-gray-400 hover:text-white"
          }`}
        >
          <Bookmark className="w-6 h-6" fill={isBookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Question */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-8">
          {questionNumber}. {question}
        </h2>
      </div>

      {imageUrl && (
        <div className="mb-6 rounded-lg overflow-hidden bg-slate-700">
          <img src={imageUrl || "/placeholder.svg"} alt="Question content" className="w-full h-auto" />
        </div>
      )}

      {codeSnippet && (
        <div className="mb-6 bg-slate-950 rounded-lg p-4 border border-slate-700 overflow-x-auto">
          <div className="text-xs text-gray-400 mb-3 font-semibold">{codeLanguage?.toUpperCase() || "CODE"}</div>
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-words">{codeSnippet}</pre>
        </div>
      )}

      {/* Options */}
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswerSelect(option.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-start gap-3 ${
              selectedAnswer === option.id
                ? "bg-orange-500/20 border-orange-500 text-white"
                : "bg-transparent border-slate-600 text-gray-300 hover:border-slate-500 hover:bg-slate-800/50"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                selectedAnswer === option.id ? "border-orange-500 bg-orange-500" : "border-gray-400"
              }`}
            >
              {selectedAnswer === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <span className="text-base">{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
