"use client"
import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"

interface ResultsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}

type TopicResult = {
  topicName: string
  questions: number
  correct: number
  incorrect: number
  skipped: number
  grade: string
  color: string
  textColor: string
}

// Circular Progress Component
function CircularProgress({
  percentage,
  size = 64,
  strokeWidth = 4,
  color = "#3b82f6",
  showPercentage = false,
  filled = false,
}: {
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
  showPercentage?: boolean
  filled?: boolean
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  
  // If filled is true, show 100% complete circle, otherwise use the percentage
  const displayPercentage = filled ? 100 : percentage
  const offset = circumference - (displayPercentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#334155" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap={filled ? "butt" : "round"}
          className="transition-all duration-500"
        />
      </svg>
      {showPercentage && <span className="absolute text-sm font-bold text-white">{percentage}%</span>}
    </div>
  )
}

// Share Modal Component
function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = "https://youtu.be/TGxkBC6L2k"

  const handleCopy = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Clipboard copy failed:", err)
      }
    } else {
      // fallback if clipboard API not supported
      const textArea = document.createElement("textarea")
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60]">
      <div className="bg-[#1e293b] rounded-lg w-full max-w-md p-6 border border-slate-700/50 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-8">Share</h2>

        {/* Share Options */}
        <div className="flex items-center justify-center gap-8 mb-8">
          {/* LinkedIn */}
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 rounded-full bg-[#0077b5] flex items-center justify-center hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">LinkedIn</span>
          </button>

          {/* Email */}
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="#EA4335" />
                <path d="M22 6l-10 7L2 6" fill="#C5221F" fillOpacity=".5" />
                <path d="M2 18l7-5.5" fill="#FBBC04" />
                <path d="M22 18l-7-5.5" fill="#34A853" />
              </svg>
            </div>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Email</span>
          </button>

          {/* PDF */}
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 rounded-full bg-[#f97316] flex items-center justify-center hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">PDF</span>
          </button>
        </div>

        {/* URL Copy Field */}
        <div className="flex items-center gap-2 bg-[#0f172a] rounded-lg p-3 border border-slate-700/50">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 bg-transparent text-gray-300 text-sm outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Results Modal Component - NAMED EXPORT
export function ResultsModal({ isOpen, onClose }: ResultsModalProps) {
  const router = useRouter()
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [filterText, setFilterText] = useState("")
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ view: "results" }, "", "/candidate/results")
    }
  }, [isOpen])

  const subjects = [
    { name: "Graphic Design", grade: "A1", percentage: 92, color: "#3b82f6" },
    { name: "Web Development", grade: "A2", percentage: 75, color: "#f97316" },
    { name: "Basic Computers", grade: "B1", percentage: 55, color: "#22c55e" },
    { name: "Basic Science", grade: "B2", percentage: 35, color: "#eab308" },
  ]

  const gradeLegend = [
    { grade: "A1", range: "90% - 100%", label: "Excellent", color: "#3b82f6", percentage: 95 },
    { grade: "A2", range: "70% - 80%", label: "Good", color: "#f97316", percentage: 75 },
    { grade: "B1", range: "50% - 60%", label: "Average", color: "#22c55e", percentage: 55 },
    { grade: "B2", range: "30% - 40%", label: "Below Average", color: "#eab308", percentage: 35 },
    { grade: "C1", range: "10% - 20%", label: "Poor", color: "#ef4444", percentage: 15 },
  ]

  const topicData: TopicResult[] = [
    {
      topicName: "Topic A",
      questions: 50,
      correct: 30,
      incorrect: 5,
      skipped: 5,
      grade: "A1",
      color: "bg-blue-600/20",
      textColor: "text-blue-400",
    },
    {
      topicName: "Topic B",
      questions: 50,
      correct: 30,
      incorrect: 5,
      skipped: 5,
      grade: "A2",
      color: "bg-orange-600/20",
      textColor: "text-orange-400",
    },
    {
      topicName: "Topic C",
      questions: 50,
      correct: 30,
      incorrect: 5,
      skipped: 5,
      grade: "B1",
      color: "bg-green-600/20",
      textColor: "text-green-400",
    },
  ]

  const processedData = useMemo(() => {
    const result = topicData.filter((item) => item.topicName.toLowerCase().includes(filterText.toLowerCase()))

    if (sortConfig) {
      result.sort((a, b) => {
        const key = sortConfig.key as keyof TopicResult
        const aVal = a[key]
        const bVal = b[key]

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal
        }

        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortConfig.direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
        }

        return 0
      })
    }

    return result
  }, [filterText, sortConfig])

  const handleSort = (key: string) => {
    setSortConfig((current) =>
      current?.key === key && current.direction === "asc" ? { key, direction: "desc" } : { key, direction: "asc" },
    )
  }

  const handleClose = () => {
    window.history.back()
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />

      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-slate-900 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto border border-slate-700/50">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50 sticky top-0 bg-slate-900 z-10">
            <h1 className="text-2xl font-bold text-white">Score Card</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
              <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Student Info & Result Summary */}
            <div className="grid grid-cols-2 gap-8">
              {/* Left: Student Info */}
              <div>
                <div className="flex gap-4 mb-6">
                  <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-white mb-1">Raj Anadkat</h2>
                    <p className="text-gray-400 text-sm">
                      <span className="font-bold text-white">Student ID :</span> TIPSG5682
                    </p>
                    <p className="text-gray-400 text-sm">
                      <span className="font-bold text-white">Field :</span> Computer Science
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-1">Fundamentals of Programming</h3>
                <p className="text-gray-400 text-sm mb-6">Course: B.Tech Spcl. in Health Informatics</p>

                {/* Marks & Percentage */}
                <div className="mt-6">
                  <p className="text-gray-400 text-sm mb-2">Total Marks : 50</p>
                  <p className="text-gray-400 text-sm mb-2">Passing Percentage</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 rounded-full bg-gray-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-500 ease-out"
                        style={{ width: "80%" }}
                      />
                    </div>
                    <span className="text-orange-500 font-bold text-sm">80%</span>
                  </div>
                </div>
              </div>

              {/* Right: Result Summary */}
              <div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Result</h3>

                  {/* Time, Date & Status */}
                  <div className="flex items-center justify-between mb-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>12:40 P.M</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>03 Jan 2023</span>
                    </div>
                    <div className="bg-green-100 px-2 py-1 rounded">
                      <span className="text-green-600 font-semibold text-sm">Status: Pass</span>
                    </div>
                  </div>

                  {/* Grade & Total Score */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center border border-gray-300/30 rounded-lg p-2">
                      <p className="text-gray-400 text-xs mb-2">Student Grade</p>
                      <div className="flex justify-center">
                        <div className="relative">
                          <CircularProgress
                            percentage={100}
                            size={64}
                            strokeWidth={4}
                            color="#1e40af"
                            showPercentage={false}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
                            A1
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-xs mb-2">Total Score</p>
                      <div className="inline-block border-2 border-green-500 rounded-lg px-3 py-1.5 mt-1">
                        <span className="text-green-500 text-lg font-bold">32/50</span>
                      </div>
                    </div>
                  </div>

                  {/* Subject Score */}
                  <div className="rounded-lg p-4 border border-slate-700/50 mt-4 flex flex-col gap-3">
                    <h3 className="text-base font-semibold text-white mb-1">Subject Score</h3>
                    {subjects.map((subject) => (
                      <div key={subject.name} className="flex items-center justify-between">
                        <span className="text-gray-300 font-medium text-sm">{subject.name}</span>
                        <div className="relative">
                          <CircularProgress
                            percentage={subject.percentage}
                            size={48}
                            strokeWidth={3}
                            color={subject.color}
                            showPercentage={false}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-base font-bold text-white">
                            {subject.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tables */}
            <div className="space-y-6">
              {/* Graphic Design Table */}
              <div className="rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200/50">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Graphic Design
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <div className="p-4 space-y-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          {[
                            { label: "Topic Name", key: "topicName" },
                            { label: "Questions", key: "questions" },
                            { label: "Correct", key: "correct" },
                            { label: "Incorrect", key: "incorrect" },
                            { label: "Skipped", key: "skipped" },
                            { label: "Grade", key: "grade" },
                          ].map((col) => (
                            <th
                              key={col.key}
                              onClick={() => handleSort(col.key)}
                              className="px-4 py-3 text-left text-gray-400 font-semibold uppercase text-xs tracking-wide cursor-pointer hover:text-gray-200 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                {col.label}
                                <span className={sortConfig?.key === col.key ? "text-gray-300" : "text-gray-600"}>
                                  {sortConfig?.key === col.key && sortConfig.direction === "desc" ? "↓" : "↑"}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {processedData.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                            <td className="px-4 py-3 text-gray-300">{row.topicName}</td>
                            <td className="px-4 py-3 text-gray-300">{row.questions}</td>
                            <td className="px-4 py-3 text-gray-300">{row.correct}</td>
                            <td className="px-4 py-3 text-gray-300">{row.incorrect}</td>
                            <td className="px-4 py-3 text-gray-300">{row.skipped}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-block px-3 py-1 rounded font-bold text-xs ${row.color} ${row.textColor}`}
                              >
                                {row.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Web Development Table */}
              <div className="rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-300/50">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Web Development
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <div className="p-4 space-y-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          {[
                            { label: "Topic Name", key: "topicName" },
                            { label: "Questions", key: "questions" },
                            { label: "Correct", key: "correct" },
                            { label: "Incorrect", key: "incorrect" },
                            { label: "Skipped", key: "skipped" },
                            { label: "Grade", key: "grade" },
                          ].map((col) => (
                            <th
                              key={col.key}
                              onClick={() => handleSort(col.key)}
                              className="px-4 py-3 text-left text-gray-400 font-semibold uppercase text-xs tracking-wide cursor-pointer hover:text-gray-200 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                {col.label}
                                <span className={sortConfig?.key === col.key ? "text-gray-300" : "text-gray-600"}>
                                  {sortConfig?.key === col.key && sortConfig.direction === "desc" ? "↓" : "↑"}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {processedData.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                            <td className="px-4 py-3 text-gray-300">{row.topicName}</td>
                            <td className="px-4 py-3 text-gray-300">{row.questions}</td>
                            <td className="px-4 py-3 text-gray-300">{row.correct}</td>
                            <td className="px-4 py-3 text-gray-300">{row.incorrect}</td>
                            <td className="px-4 py-3 text-gray-300">{row.skipped}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-block px-3 py-1 rounded font-bold text-xs ${row.color} ${row.textColor}`}
                              >
                                {row.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Grade Legend - WITH FILLED CIRCLES */}
            <div className="rounded-lg p-3 border border-slate-700/50">
              <div className="flex items-center justify-around gap-8">
                {gradeLegend.map((item) => (
                  <div key={item.grade} className="text-center">
                    <div className="flex justify-center mb-2 relative">
                      <CircularProgress
                        percentage={item.percentage}
                        size={56}
                        strokeWidth={4}
                        color={item.color}
                        showPercentage={false}
                        filled={true}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
                        {item.grade}
                      </span>
                    </div>
                    <p className="text-white font-medium text-sm mb-1">{item.range}</p>
                    <p className="text-gray-400 text-xs">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
