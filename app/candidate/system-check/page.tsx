"use client"

import { useState } from "react"

// Simple UI Components
const Button = ({ children, onClick, disabled, variant = "default", className = "" }) => {
  const baseStyles = "px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  const variantStyles = {
    default: "bg-orange-500 hover:bg-orange-600 text-white",
    outline: "border border-slate-600 text-white hover:bg-slate-800 bg-transparent"
  }
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

const Checkbox = ({ id, checked, onCheckedChange }) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className="flex items-center justify-center w-5 h-5 border-2 border-slate-500 rounded cursor-pointer 
        peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all"
      >
        {checked && (
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </label>
    </div>
  )
}

const Switch = ({ checked, onCheckedChange }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-orange-500' : 'bg-slate-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

// System Check Page Component
function SystemCheckPage({ onStartExam }) {
  const [cameraAllowed, setCameraAllowed] = useState(true)
  const [microphoneAllowed, setMicrophoneAllowed] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", description: "", type: "error" })

  const systemChecksList = [
    { id: "os", label: "Operating System", value: "Windows", status: "compatible" },
    { id: "browser", label: "Browser", value: "Chrome", status: "incompatible", note: "To fix the issue contact us!" },
    { id: "version", label: "Browser Version", value: "135.0.0.0 Safari/537.36", status: "compatible" },
    { id: "resolution", label: "Screen Resolution", value: "1600×1000", status: "compatible" },
    { id: "connectivity", label: "Exam Server Connectivity", value: "18.01 Mbps", status: "compatible" },
    { id: "server", label: "Server Status", value: "200 Ok", status: "compatible" },
    { id: "js", label: "Javascript", value: "Enabled", status: "compatible" },
    { id: "mic1", label: "Microphone", value: "Enabled", status: "compatible" },
    { id: "mic2", label: "Microphone", value: "Enabled", status: "compatible" },
  ]

  const [systemChecksState, setSystemChecksState] = useState(
    systemChecksList.reduce((acc, check) => ({ ...acc, [check.id]: false }), {})
  )

  const allSystemsChecked = Object.values(systemChecksState).every((checked) => checked)
  const isAllComplete = allSystemsChecked

  const toast = (message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleContinue = () => {
    console.log("All systems checked:", allSystemsChecked)
    console.log("System checks state:", systemChecksState)

    if (!allSystemsChecked) {
      toast({
        title: "Incomplete",
        description: "Please check all system requirements before continuing.",
        type: "error"
      })
      return
    }

    toast({
      title: "Success",
      description: "System check passed. Starting exam...",
      type: "success"
    })

    setTimeout(() => {
      onStartExam()
    }, 500)
  }

  const handleRecheck = () => {
    setSystemChecksState(systemChecksList.reduce((acc, check) => ({ ...acc, [check.id]: false }), {}))
    toast({
      title: "Reset Complete",
      description: "Please check all requirements again.",
      type: "success"
    })
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Success Banner */}
      {isAllComplete && (
        <div className="bg-emerald-900 border-b border-emerald-700 px-6 py-3 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-emerald-200 text-sm">
            Your system is fully compatible with our software, you can take exams anytime
          </span>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-6 py-4 rounded-lg shadow-lg border ${
            toastMessage.type === "success" 
              ? "bg-emerald-900 border-emerald-700 text-emerald-200" 
              : "bg-red-900 border-red-700 text-red-200"
          }`}>
            <div className="font-semibold">{toastMessage.title}</div>
            <div className="text-sm mt-1">{toastMessage.description}</div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-3">Check your system compatibility</h1>
        <p className="text-gray-400 text-sm mb-8">
          To ensure uninterrupted exam delivery, please check your system compatibility and proximity to our exam
          server.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - System Checks Table */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              {systemChecksList.map((check) => (
                <div
                  key={check.id}
                  className="flex items-center justify-between px-6 py-4 border-b border-slate-700 last:border-0 bg-slate-800 hover:bg-slate-750 transition-colors"
                >
                  {/* Left: Labels */}
                  <div className="flex items-center gap-6 flex-1 min-w-0">
                    <span className="text-gray-300 text-sm font-medium whitespace-nowrap w-48">{check.label}</span>
                    <span className="text-gray-400 text-sm truncate">{check.value}</span>
                  </div>

                  {/* Right: Status + Checkbox */}
                  <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                    <span
                      className={`text-sm font-medium ${
                        check.status === "compatible" ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {check.status === "compatible" ? "Compatible" : "Incompatible"}
                    </span>
                    {check.note && <span className="text-gray-400 text-xs whitespace-nowrap">{check.note}</span>}
                    <Checkbox
                      id={check.id}
                      checked={systemChecksState[check.id]}
                      onCheckedChange={(checked) => {
                        console.log("Checkbox changed:", check.id, "to", checked)
                        setSystemChecksState((prev) => {
                          const newState = { ...prev, [check.id]: checked }
                          console.log("New state:", newState)
                          return newState
                        })
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Permissions Section */}
          <div className="space-y-6">
            {/* Camera Icon */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center aspect-square">
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-400 text-sm text-center">Camera & Microphone</p>
            </div>

            <div className="space-y-4">
              {/* Camera Permission */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm font-medium">Camera</span>
                  <Switch checked={cameraAllowed} onCheckedChange={setCameraAllowed} />
                </div>
                <p className="text-gray-400 text-xs">{cameraAllowed ? "Allowed Camera" : "Camera Not Allowed"}</p>
              </div>

              {/* Microphone Permission */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm font-medium">Microphone</span>
                  <Switch checked={microphoneAllowed} onCheckedChange={setMicrophoneAllowed} />
                </div>
                <p className="text-gray-400 text-xs">
                  {microphoneAllowed ? "Allowed Microphone" : "Microphone Not Allowed"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center gap-4 mt-12 pb-8">
          <Button variant="outline" onClick={handleRecheck}>
            Re-Check
          </Button>
          <Button onClick={handleContinue}>
            Continue to Exam
          </Button>
        </div>
      </div>
    </div>
  )
}

// Exam Page Component
function ExamPage({ onBackToCheck }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [answers, setAnswers] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2
    },
    {
      id: 2,
      question: "Which programming language is known as the 'language of the web'?",
      options: ["Python", "JavaScript", "Java", "C++"],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language"
      ],
      correctAnswer: 0
    },
    {
      id: 4,
      question: "Which company developed React?",
      options: ["Google", "Facebook", "Microsoft", "Amazon"],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1
    }
  ]

  // Timer countdown
  useState(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsSubmitted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex })
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  if (isSubmitted) {
    const score = calculateScore()
    const percentage = ((score / questions.length) * 100).toFixed(1)
    
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Exam Completed!</h2>
          <p className="text-gray-400 mb-8">Thank you for completing the exam.</p>
          
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-400">{score}</div>
                <div className="text-sm text-gray-400 mt-1">Correct</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-400">{questions.length - score}</div>
                <div className="text-sm text-gray-400 mt-1">Incorrect</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400">{percentage}%</div>
                <div className="text-sm text-gray-400 mt-1">Score</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={() => window.location.reload()} className="w-full">
              Take Another Exam
            </Button>
            <Button variant="outline" onClick={onBackToCheck} className="w-full">
              Back to System Check
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Header with Timer */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Online Examination</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className={`text-lg font-mono font-bold ${timeLeft < 300 ? 'text-red-400' : 'text-orange-400'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <Button variant="outline" onClick={handleSubmit}>
            Submit Exam
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Question Navigation */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-400">Question Navigation</h3>
            <span className="text-sm text-gray-400">
              {Object.keys(answers).length} / {questions.length} Answered
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentQuestion === idx
                    ? 'bg-orange-500 text-white'
                    : answers[q.id] !== undefined
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-orange-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              {answers[questions[currentQuestion].id] !== undefined && (
                <span className="text-sm text-emerald-400">✓ Answered</span>
              )}
            </div>
            <h2 className="text-2xl font-semibold text-white mb-8">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-3 mb-8">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(questions[currentQuestion].id, idx)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  answers[questions[currentQuestion].id] === idx
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0">
                    {answers[questions[currentQuestion].id] === idx && (
                      <span className="w-3 h-3 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('check') // 'check' or 'exam'

  return (
    <>
      {currentPage === 'check' && (
        <SystemCheckPage onStartExam={() => setCurrentPage('exam')} />
      )}
      {currentPage === 'exam' && (
        <ExamPage onBackToCheck={() => setCurrentPage('check')} />
      )}
    </>
  )
}