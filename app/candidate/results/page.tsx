"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { CircularProgress, ShareModal, type TopicResult } from "@/components/candidate/results-modal"

export default function CandidateResultsPage() {
  const router = useRouter()
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [filterText, setFilterText] = useState("")
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

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

  return (
    <>
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />

      <div className="min-h-screen bg-slate-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Score Card</h1>
           
          </div>

          {/* Content */}
          <div className="space-y-6">
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
              {["Graphic Design", "Web Development"].map((subject) => (
                <div key={subject} className="rounded-lg overflow-hidden">
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
                      {subject}
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
              ))}
            </div>

            {/* Grade Legend */}
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

            {/* Optional Back Button at Bottom */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
