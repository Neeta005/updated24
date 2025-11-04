"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { examSession } from "@/data/exam-questions"
import { ChevronRight } from "lucide-react"

export default function ExamPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | null>>({})
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set())

  const question = examSession.questions[currentQuestion]
  const totalQuestions = examSession.questions.length

  const handleAnswerSelect = (optionId: string) => {
    setAnswers({
      ...answers,
      [question.id]: optionId,
    })
  }

  const handleBookmark = () => {
    const newBookmarked = new Set(bookmarked)
    if (newBookmarked.has(question.id)) {
      newBookmarked.delete(question.id)
    } else {
      newBookmarked.add(question.id)
    }
    setBookmarked(newBookmarked)
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

  const attemptedCount = Object.values(answers).filter((a) => a !== null && a !== undefined).length
  const skippedCount = totalQuestions - attemptedCount

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex">
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "" : ""}`}>
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
        <div className="p-8 max-w-3xl">
          {/* Bookmark Icon */}
          <div className="flex justify-end mb-6">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                bookmarked.has(question.id) ? "bg-orange-500 text-white" : "bg-slate-800 text-gray-400 hover:text-white"
              }`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3a2 2 0 012-2h10a2 2 0 012 2v18l-8-4-8 4V3z" />
              </svg>
            </button>
          </div>

          {/* Question Number and Text */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {currentQuestion + 1}. {question.text}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option) => (
              <label
                key={option.id}
                className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                  answers[question.id] === option.id
                    ? "bg-blue-900 border-blue-500"
                    : "bg-slate-800 border-slate-700 hover:border-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={answers[question.id] === option.id}
                  onChange={() => handleAnswerSelect(option.id)}
                  className="w-4 h-4"
                />
                <span className="text-gray-300">{option.text}</span>
              </label>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button className="text-orange-500 hover:text-orange-400 font-medium" onClick={handleSkip}>
              Skip
            </button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800 bg-transparent"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleNext}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  )
}
