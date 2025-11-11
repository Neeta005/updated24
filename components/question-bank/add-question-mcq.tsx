"use client"

import { useRouter } from "next/navigation"
import { ChevronDown, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { gradientButtonStyle } from "@/data/syllabus"

export function AddQuestionMCQ() {
  const router = useRouter()
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState<string[]>(["", "", "", ""])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [topic, setTopic] = useState("UI Design")
  const [type, setType] = useState("MCQs")
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy")
  const [status, setStatus] = useState<"Draft" | "Published">("Draft")
  const [marks, setMarks] = useState("05")

  const addOption = () => setOptions((prev) => [...prev, ""])
  const updateOption = (i: number, val: string) => setOptions((prev) => prev.map((o, idx) => (idx === i ? val : o)))
  const removeOption = (i: number) => setOptions((prev) => prev.filter((_, idx) => idx !== i))

  return (
    <div className="min-h-screen text-white bg-gray-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Add Question</h1>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 rounded-lg border border-gray-400 text-white hover:bg-gray-700 transition-colors font-medium"
        >
          Back
        </button>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Question Editor */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-6">
            {/* Question Text Area */}
            <div>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Write a Question..."
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white text-base placeholder-gray-400 focus:outline-none focus:border-blue-500 min-h-32 resize-none"
              />
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {options.map((opt, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                    i === selectedIndex ? "border-blue-500 bg-blue-500/10" : "border-gray-600 bg-gray-700/50"
                  }`}
                >
                  <button
                    onClick={() => setSelectedIndex(i)}
                    className={`h-4 w-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      i === selectedIndex ? "border-red-500" : "border-gray-400"
                    }`}
                  >
                    {i === selectedIndex && <div className="h-2 w-2 rounded-full bg-red-500"></div>}
                  </button>

                  <input
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-sm"
                    placeholder={`Option ${i + 1}`}
                  />

                  {options.length > 2 && (
                    <button
                      onClick={() => removeOption(i)}
                      className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Option Button */}
            <button
              onClick={addOption}
              className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Option</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              className={`px-6 py-2 ${gradientButtonStyle} rounded-lg text-white font-semibold text-sm shadow-md transition-all duration-200 flex items-center gap-2`}
            >
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Right Panel: Question Details */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white">Question Details</h3>

            {/* Topic */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Topic:</label>
              <div className="relative">
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-600 bg-gray-900 px-4 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="UI Design">UI Design</option>
                  <option value="UX Design">UX Design</option>
                  <option value="Interactive Design">Interactive Design</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Type</label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-600 bg-gray-900 px-4 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="MCQs">MCQs</option>
                  <option value="True/False">True/False</option>
                  <option value="Short Answer">Short Answer</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Difficulty</label>
              <div className="flex gap-2">
                {(["Easy", "Medium", "Hard"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                      difficulty === d
                        ? d === "Easy"
                          ? "bg-green-500/30 text-green-400 border border-green-500"
                          : d === "Medium"
                            ? "bg-yellow-500/30 text-yellow-400 border border-yellow-500"
                            : "bg-red-500/30 text-red-400 border border-red-500"
                        : "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Status</label>
              <div className="flex gap-2">
                {(["Draft", "Published"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`flex-1 py-2 rounded-full text-xs font-medium transition-colors ${
                      status === s
                        ? s === "Draft"
                          ? "bg-pink-500/30 text-pink-400 border border-pink-500"
                          : "bg-green-500/30 text-green-400 border border-green-500"
                        : "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Marks */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Marks</label>
              <input
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-2.5 text-white text-center focus:border-blue-500 focus:outline-none text-sm"
                placeholder="Enter marks"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
