"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MCQQuestion } from "./mcq-question"
import { QuestionNavigator } from "./question-navigator"
import { ExamTimer } from "./exam-timer"

export interface Question {
  id: number
  question: string
  subject: string
  topic: string
  options: Array<{
    id: string
    text: string
  }>
  correctAnswer: string
}

interface ExamLayoutProps {
  questions: Question[]
  examTitle?: string
  totalTime?: number // in seconds
  onSubmitExam?: (answers: Record<number, string>) => void
  onTimeUp?: () => void
}

export function ExamLayout({
  questions,
  examTitle = "Online Examination",
  totalTime = 1800, // 30 minutes default
  onSubmitExam,
  onTimeUp,
}: ExamLayoutProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set())
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const currentQuestion = questions[currentQuestionIdx]

  // Build question status array for navigator
  const questionStatuses = questions.map((q, idx) => {
    if (bookmarked.has(q.id)) {
      return { id: idx + 1, status: "bookmarked" as const }
    }
    if (answers[q.id]) {
      return { id: idx + 1, status: "attempted" as const }
    }
    return { id: idx + 1, status: "unanswered" as const }
  })

  const handleAnswerSelect = (optionId: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId,
    })
  }

  const handleToggleBookmark = () => {
    const newBookmarked = new Set(bookmarked)
    if (newBookmarked.has(currentQuestion.id)) {
      newBookmarked.delete(currentQuestion.id)
    } else {
      newBookmarked.add(currentQuestion.id)
    }
    setBookmarked(newBookmarked)
  }

  const handlePrevious = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1)
    }
  }

  const handleSubmit = () => {
    onSubmitExam?.(answers)
  }

  const handleSkip = () => {
    handleNext()
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-full flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">{examTitle}</h1>
          <div className="flex items-center gap-6">
            <ExamTimer totalSeconds={totalTime} onTimeUp={onTimeUp} />
            <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 text-white">
              Submit Exam
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Question */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
              <MCQQuestion
                questionNumber={currentQuestionIdx + 1}
                totalQuestions={questions.length}
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedAnswer={answers[currentQuestion.id] || null}
                isBookmarked={bookmarked.has(currentQuestion.id)}
                subject={currentQuestion.subject}
                topic={currentQuestion.topic}
                onAnswerSelect={handleAnswerSelect}
                onToggleBookmark={handleToggleBookmark}
              />

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-700">
                <button
                  onClick={() => handleSkip()}
                  className="text-red-500 hover:text-red-400 font-semibold transition-colors"
                >
                  Skip
                </button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handlePrevious}
                    disabled={currentQuestionIdx === 0}
                    className="gap-2 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleNext}
                    disabled={currentQuestionIdx === questions.length - 1}
                    className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
                  >
                    Next
                    
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Question Navigator Sidebar */}
          <div>
            <QuestionNavigator
              totalQuestions={questions.length}
              currentQuestion={currentQuestionIdx}
              questions={questionStatuses}
              onQuestionSelect={setCurrentQuestionIdx}
              onCollapse={setSidebarCollapsed}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
