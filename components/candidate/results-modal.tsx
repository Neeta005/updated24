"use client"
import Image from "next/image"
import { CircularProgress } from "@/components/ui/circular-progress"

interface ResultsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResultsModal({ isOpen, onClose }: ResultsModalProps) {
  if (!isOpen) return null

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

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto border border-slate-700/50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50 sticky top-0 bg-card z-10">
          <h1 className="text-2xl font-bold text-white">Score Card</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Image
                src="/icons/editdotconnector.png"
                alt="Info Icon"
                width={16}
                height={16}
              />
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>12:40 P.M</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                      <CircularProgress
                        percentage={100}
                        size={64}
                        strokeWidth={4}
                        color="#1e40af"
                        showPercentage={false}
                        className="relative"
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
                          A1
                        </span>
                      </CircularProgress>
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
        {["Graphic Design", "Web Development"].map((subject) => (
  <div key={subject} className="p-6">
    {/* Heading with bottom border */}
    <h4 className="text-white font-semibold mb-2 flex items-center gap-2 border-b border-slate-200 pb-2">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
      </svg>
      {subject}
    </h4>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="">
            <th className="text-left py-3 px-4 text-gray-400 font-medium text-xs">Topic Name</th>
            <th className="text-center py-3 px-4 text-gray-400 font-medium text-xs">no. of Questions</th>
            <th className="text-center py-3 px-4 text-gray-400 font-medium text-xs">Correct Answers</th>
            <th className="text-center py-3 px-4 text-gray-400 font-medium text-xs">Incorrect</th>
            <th className="text-center py-3 px-4 text-gray-400 font-medium text-xs">Skipped</th>
            <th className="text-center py-3 px-4 text-gray-400 font-medium text-xs">Grade</th>
          </tr>
        </thead>
        <tbody>
          {[
            { topic: "Topic A", grade: "A1", color: "bg-blue-600" },
            { topic: "Topic B", grade: "A2", color: "bg-orange-500" },
            { topic: "Topic C", grade: "B1", color: "bg-green-500" }
          ].map((item, index) => (
            <tr key={index} className="border-b border-slate-700/30 hover:bg-slate-700/20">
              <td className="py-3 px-4 text-white text-sm">{item.topic}</td>
              <td className="text-center py-3 px-4 text-gray-300">50</td>
              <td className="text-center py-3 px-4 text-gray-300">30</td>
              <td className="text-center py-3 px-4 text-gray-300">05</td>
              <td className="text-center py-3 px-4 text-gray-300">05</td>
              <td className="text-center py-3 px-4">
                <span className={`px-3 py-1 rounded text-white font-bold text-xs ${item.color}`}>
                  {item.grade}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
))}


          {/* Grade Legend */}
          <div className="bg-[#151925] rounded-lg p-6 border border-slate-700/50">
            <div className="flex items-center justify-center gap-8">
              {gradeLegend.map((item) => (
                <div key={item.grade} className="text-center">
                  <div className="flex justify-center mb-2 relative">
                    <CircularProgress
                      percentage={item.percentage}
                      size={56}
                      strokeWidth={4}
                      color={item.color}
                      showPercentage={false}
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
  )
}