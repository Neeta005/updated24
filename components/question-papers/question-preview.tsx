"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { sections, examInfo } from "@/data/question-preview"
import { SectionAccordion } from "./section-accordion"

interface QuestionPreviewProps {
  onBack?: () => void
  showShell?: boolean // when false, do not render the internal sidebar/header
}

export function QuestionPreview({ onBack, showShell = true }: QuestionPreviewProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["fundamentals", "network-security"])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const renderQuestion = (question: any, index: number, sectionColor: string) => {
    const questionNumber = index + 1

    switch (question.type) {
      case "multiple-choice":
      case "true-false":
        return (
          <div key={question.id} className="border border-gray-600 rounded-lg p-4 bg-card">
            <div className={`border-l-4 border-${sectionColor}-400 pl-4`}>
              <h3 className="text-white font-medium mb-3">
                Q{questionNumber}) {question.text}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {question.options?.map((option: string, i: number) => (
                  <label key={i} className="flex items-center gap-2 text-gray-300">
                    <input type="radio" name={question.id} className={`text-${sectionColor}-500`} />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case "text":
        return (
          <div key={question.id} className="border border-gray-600 rounded-lg p-4 bg-card">
            <div className={`border-l-4 border-${sectionColor}-400 pl-4`}>
              <h3 className="text-white font-medium mb-3">
                Q{questionNumber}) {question.text}
              </h3>
              <textarea
                className="w-full h-24 bg-card border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none"
                placeholder="Write your answer here..."
              />
            </div>
          </div>
        )

      case "code":
        if (question.codeSnippet) {
          // Code output question
          return (
            <div key={question.id} className="border border-gray-600 rounded-lg p-4 bg-card">
              <div className={`border-l-4 border-${sectionColor}-400 pl-4`}>
                <h3 className="text-white font-medium mb-3">
                  Q{questionNumber}) {question.text}
                </h3>
                <div className="bg-gray-700 p-4 rounded-lg border border-green-500 mb-4">
                  <div className="text-green-400 text-xs mb-2">{question.language}</div>
                  <code className="text-green-300">{question.codeSnippet}</code>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {question.options?.map((option: string, i: number) => (
                    <label key={i} className="flex items-center gap-2 text-gray-300">
                      <input type="radio" name={question.id} className={`text-${sectionColor}-500`} />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )
        } else {
          // Code selection question
          return (
            <div key={question.id} className="border border-gray-600 rounded-lg p-4 bg-card">
              <div className={`border-l-4 border-${sectionColor}-400 pl-4`}>
                <h3 className="text-white font-medium mb-3">
                  Q{questionNumber}) {question.text}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {question.options?.slice(0, 2).map((option: string, i: number) => (
                      <label key={i} className="flex items-start gap-2 text-gray-300">
                        <input type="radio" name={question.id} className={`text-${sectionColor}-500 mt-1`} />
                        <div className="bg-gray-700 p-3 rounded-lg border border-green-500">
                          <div className="text-green-400 text-xs mb-1">{question.language}</div>
                          <code className="text-green-300 text-sm">{option}</code>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {question.options?.slice(2, 4).map((option: string, i: number) => (
                      <label key={i} className="flex items-start gap-2 text-gray-300">
                        <input type="radio" name={question.id} className={`text-${sectionColor}-500 mt-1`} />
                        <div className="bg-gray-700 p-3 rounded-lg border border-green-500">
                          <div className="text-green-400 text-xs mb-1">{question.language}</div>
                          <code className="text-green-300 text-sm">{option}</code>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        }

      default:
        return null
    }
  }

  return (
    <div className={showShell ? "min-h-screen bg-card" : ""}>
      {/* Main Content */}
      <div className={showShell ? "ml-64 p-6" : "p-6"}>
        {/* Header - Always visible */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-2xl font-bold">Question Paper Preview</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400">{examInfo.totalQuestions} Questions</span>
          </div>
        </div>

        {/* Exam Info */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-400 rounded-xl p-6 mb-6 flex items-center justify-between">
          {/* Left side: Exam info */}
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="pr-6 border-r border-blue-700">
              <h3 className="text-white text-sm font-medium mb-2">Exam Title</h3>
              <p className="text-white text-lg font-semibold">{examInfo.title}</p>
            </div>
            <div className="pl-6">
              <h3 className="text-white text-sm font-medium mb-2">Target Audience</h3>
              <p className="text-white text-lg font-semibold">{examInfo.targetAudience}</p>
            </div>
          </div>

          {/* Right side: Export button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg hover:from-red-700 hover:to-orange-600 transition-all">
            <Download size={16} />
            Export PDF
          </button>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {sections.map((section) => (
            <SectionAccordion
              key={section.id}
              section={section}
              isExpanded={expandedSections.includes(section.id)}
              onToggle={toggleSection}
              renderContent={() => (
                <>{section.questions.map((question, index) => renderQuestion(question, index, section.color))}</>
              )}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
  onClick={onBack ?? (() => window.history.back())}
  className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
>
  Back
</button>

          <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg hover:from-red-700 hover:to-orange-600 transition-all">
            Publish
          </button>
        </div>
      </div>
    </div>
  )
}
