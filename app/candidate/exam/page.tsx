"use client"

import { useState } from "react"
import { examSession } from "@/data/exam-questions"
import { ChevronRight } from "lucide-react"
import { MCQQuestion } from "@/components/exam/mcq-question"
import { EssayQuestion } from "@/components/exam/essay-question"
import { SubmissionModal } from "@/components/exam/submission-modal"
import { SuccessModal } from "@/components/exam/SuccessModal"
import { useRouter } from "next/navigation"

export default function ExamPage() {
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | null>>({})
  const [essayAnswers, setEssayAnswers] = useState<Record<number, string>>({})
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set())
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const question = examSession.questions[currentQuestion]
  const totalQuestions = examSession.questions.length

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleEssayChange = (questionId: number, text: string) => {
    setEssayAnswers((prev) => ({ ...prev, [questionId]: text }))
  }

  const handleBookmark = (questionId: number) => {
    setBookmarked((prev) => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(questionId)) newBookmarks.delete(questionId)
      else newBookmarks.add(questionId)
      return newBookmarks
    })
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSkip = () => {
    handleNext()
  }

  const handleSubmit = () => {
    setShowSubmissionModal(true)
  }

  const handleSubmitAnyway = () => {
    console.log("Exam submitted with answers:", { answers, essayAnswers })
    setShowSubmissionModal(false)
    setShowSuccessModal(true)
  }

  const attemptedCount =
    Object.values(answers).filter((a) => a).length +
    Object.values(essayAnswers).filter((a) => a?.trim().length > 0).length

  const skippedCount = totalQuestions - attemptedCount

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex">
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-700 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-gray-400 text-sm">
                Subject: <span className="text-white">{examSession.subject}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Topic: <span className="text-white">{examSession.topic}</span>
              </p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Question Content */}
        <div className="p-8 max-w-4xl">
          {question.type === "mcq" ? (
            <MCQQuestion
              questionNumber={currentQuestion + 1}
              totalQuestions={totalQuestions}
              question={question.text}
              options={question.options || []}
              selectedAnswer={answers[question.id] || null}
              isBookmarked={bookmarked.has(question.id)}
              subject={examSession.subject}
              topic={examSession.topic}
              imageUrl={question.imageUrl}
              codeSnippet={question.codeSnippet}
              codeLanguage={question.codeLanguage}
              onAnswerSelect={handleAnswerSelect}
              onToggleBookmark={handleBookmark}
            />
          ) : (
            <EssayQuestion
              questionNumber={currentQuestion + 1}
              question={question.text}
              answerText={essayAnswers[question.id] || ""}
              isBookmarked={bookmarked.has(question.id)}
              subject={examSession.subject}
              topic={examSession.topic}
              codeSnippet={question.codeSnippet}
              codeLanguage={question.codeLanguage}
              onAnswerChange={handleEssayChange}
              onToggleBookmark={handleBookmark}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button className="text-orange-500 hover:text-orange-400 font-medium" onClick={handleSkip}>
              Skip
            </button>
            <div className="flex gap-3">
              {currentQuestion === totalQuestions - 1 ? (
                <button
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
              <button
                className="px-6 py-2 rounded-lg border border-slate-600 text-white hover:bg-slate-800 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      {sidebarOpen && (
        <div className="w-80 bg-slate-900 border-l border-slate-700 p-6 overflow-y-auto flex flex-col">
          {/* Collapse Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Timer */}
          <div className="mb-8">
            <div className="text-right mb-2">
              <p className="text-gray-400 text-sm">{examSession.startTime}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">Timer</p>
              <p className="text-green-400 font-mono text-3xl font-bold">
                00<span className="text-lg">min</span> 010<span className="text-lg">sec</span>
              </p>
            </div>
          </div>

          {/* Questions Info */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3">
              Questions {currentQuestion + 1}/{totalQuestions}
            </p>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: Math.ceil(totalQuestions / 6) }).map((_, row) =>
                Array.from({ length: 6 }).map((_, col) => {
                  const qNum = row * 6 + col + 1
                  if (qNum > totalQuestions) return null
                  return (
                    <button
                      key={qNum}
                      onClick={() => setCurrentQuestion(qNum - 1)}
                      className={`w-full aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                        currentQuestion === qNum - 1
                          ? "bg-blue-500 text-white"
                          : answers[examSession.questions[qNum - 1].id]
                            ? "bg-green-500 text-white"
                            : "bg-slate-700 text-gray-400 hover:bg-slate-600"
                      }`}
                    >
                      {qNum}
                    </button>
                  )
                }),
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-slate-800 rounded-lg p-3 mb-6 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-400">{attemptedCount} Attempted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-400">{bookmarked.size} Bookmarked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-gray-400">{skippedCount} Skipped</span>
            </div>
          </div>

          {/* Camera Status */}
          <div className="bg-slate-800 rounded-lg p-4 mb-6 text-center">
            <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-xs">Camera working</p>
          </div>

          {/* IP Address */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-xs">
              IP Address: <span className="text-white">123.123.123.123</span>
            </p>
          </div>

          {/* Warning Alert */}
          <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-3 flex gap-2">
            <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-yellow-200 text-xs">2 people in same room, using mobile phone when exam</p>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      <SubmissionModal
        isOpen={showSubmissionModal}
        unattemptedCount={totalQuestions - attemptedCount}
        bookmarkedCount={bookmarked.size}
        skippedCount={skippedCount}
        onReviewUnattempted={() => setShowSubmissionModal(false)}
        onSubmitAnyway={handleSubmitAnyway}
      />

      {/* ✅ Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        attempted={attemptedCount}
        bookmarked={bookmarked.size}
        skipped={skippedCount}
        onViewResult={() => router.push("/candidate/results")}
        onGoToDashboard={() => router.push("/candidate/dashboard")}
      />
    </div>
  )
}
