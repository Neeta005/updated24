"use client"
import { Bookmark } from "lucide-react"

interface EssayQuestionProps {
  questionNumber: number
  question: string
  answerText: string
  isBookmarked: boolean
  subject: string
  topic: string
  codeSnippet?: string
  codeLanguage?: string
  onAnswerChange: (text: string) => void
  onToggleBookmark: () => void
}

export function EssayQuestion({
  questionNumber,
  question,
  answerText,
  isBookmarked,
  subject,
  topic,
  codeSnippet,
  codeLanguage,
  onAnswerChange,
  onToggleBookmark,
}: EssayQuestionProps) {
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
        <h2 className="text-xl font-semibold text-white mb-8 whitespace-pre-wrap">
          {questionNumber}. {question}
        </h2>
      </div>

      {/* Code Snippet Example */}
      {codeSnippet && (
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-700 overflow-x-auto">
          <div className="text-xs text-gray-400 mb-3 font-semibold">{codeLanguage?.toUpperCase() || "CODE"}</div>
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-words">{codeSnippet}</pre>
        </div>
      )}

      {/* Rich Text Editor */}
      <div className="space-y-3">
        <div className="border border-slate-600 rounded-lg bg-slate-950 overflow-hidden">
          {/* Editor Toolbar */}
          <div className="bg-slate-900 border-b border-slate-700 p-3 flex items-center gap-1 overflow-x-auto flex-wrap">
            <button className="p-2 text-gray-400 hover:bg-slate-800 rounded transition-colors" title="Undo">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:bg-slate-800 rounded transition-colors" title="Redo">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l7-7-7-7" />
              </svg>
            </button>

            <div className="w-px h-6 bg-slate-700 mx-1"></div>

            <select className="px-2 py-1 text-sm bg-slate-800 text-gray-300 rounded border border-slate-600 hover:border-slate-500">
              <option>Normal text</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
              <option>Paragraph</option>
            </select>

            <div className="w-px h-6 bg-slate-700 mx-1"></div>

            <button className="p-2 text-gray-400 hover:bg-slate-800 rounded transition-colors" title="Bullet list">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:bg-slate-800 rounded transition-colors" title="Numbered list">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 6h12M9 12h12M9 18h12M5 6v6M5 12v6M3 8h2V6H3v2z"
                />
              </svg>
            </button>

            <div className="w-px h-6 bg-slate-700 mx-1"></div>

            <button className="p-2 text-gray-400 hover:bg-slate-800 rounded transition-colors" title="Bold">
              <strong>B</strong>
            </button>
            <button className="p-2 text-gray-400 hover:bg-slate-800 rounded transition-colors" title="Italic">
              <em>I</em>
            </button>
            <button className="p-2 text-gray-400 hover:bg-slate-800 rounded transition-colors" title="Underline">
              <u>U</u>
            </button>
            <button className="p-2 text-gray-400 hover:bg-slate-800 rounded transition-colors" title="Strikethrough">
              <s>S</s>
            </button>

            <div className="w-px h-6 bg-slate-700 mx-1"></div>

            <button className="p-2 text-gray-400 hover:bg-slate-800 rounded transition-colors" title="Link">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:bg-slate-800 rounded transition-colors" title="Code">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </button>

            <div className="w-px h-6 bg-slate-700 mx-1"></div>

            <button className="p-2 text-gray-400 hover:bg-slate-800 rounded transition-colors" title="Quote">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8c0 1.105-.895 2-2 2S3 9.105 3 8s.895-2 2-2 2 .895 2 2zm0 0c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm8-10c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm0 0c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z"
                />
              </svg>
            </button>

            <div className="w-px h-6 bg-slate-700 mx-1"></div>

            <button className="p-2 text-gray-400 hover:bg-slate-800 rounded transition-colors" title="More options">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>

          {/* Text Area */}
          <textarea
            value={answerText}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-64 p-4 bg-slate-950 text-white text-base focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  )
}
