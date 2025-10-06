"use client"

import { useRouter } from "next/navigation"
import {
  ChevronRight,
  Trash2,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Smile,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"
import { defaultAddMcq } from "@/data/question-papers/add-mcq"
import { gradientButtonStyle } from "@/data/syllabus"


export function AddQuestionMcq() {
  const router = useRouter()
  const [question, setQuestion] = useState(defaultAddMcq.question)
  const [options, setOptions] = useState<string[]>([...defaultAddMcq.options])
  const [selectedIndex, setSelectedIndex] = useState<number>(defaultAddMcq.selectedIndex)
  const [subject, setSubject] = useState(defaultAddMcq.subject)
  const [topic, setTopic] = useState(defaultAddMcq.topic)
  const [type, setType] = useState(defaultAddMcq.type)
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">(defaultAddMcq.difficulty)
  const [status, setStatus] = useState<"Draft" | "Published">(defaultAddMcq.status)
  const [marks, setMarks] = useState(defaultAddMcq.marks)
  const [coding, setCoding] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const addOption = () => setOptions((prev) => [...prev, ""])
  const updateOption = (i: number, val: string) =>
    setOptions((prev) => prev.map((o, idx) => (idx === i ? val : o)))
  const removeOption = (i: number) => setOptions((prev) => prev.filter((_, idx) => idx !== i))

  return (
    <div className="min-h-screen text-white bg-gray-900 p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-card rounded-t-lg">
        <h1 className="text-2xl font-semibold">Add Question</h1>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
      </div>

      {/* Main content container */}
      <div className="bg-card rounded-b-lg relative">
        {/* Horizontal divider */}
        <div className="h-px bg-gray-700 mx-6"></div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
          {/* Expand button when collapsed - on top-right */}
       {collapsed && (
  <button
    onClick={() => setCollapsed(false)}
    className="absolute right-6 top-6 flex flex-col items-center gap-2 z-50 group"
  >
    {/* Icon inside white-bordered box */}
    <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-white bg-gray-800 group-hover:bg-gray-700 transition-colors">
      <img
        src="\icons\edit-2 (1).png" // 👉 place pencil.png inside /public
        alt="Add details"
        className="w-5 h-5"
      />
    </div>

    {/* Label below box */}
    <span className="text-white text-sm font-medium">Add Details</span>
  </button>
)}


          {/* Left: Question editor */}
          <section className={`${collapsed ? "lg:col-span-11 pr-12" : "lg:col-span-8"} relative`}>
            {!collapsed && (
              <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-px bg-gray-700"></div>
            )}

            <div className="rounded-lg bg-card">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <h2 className="font-semibold text-lg">Multiple Choice Question (MCQ)</h2>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={coding}
                    onChange={() => setCoding(!coding)}
                    className="sr-only"
                  />
                  <div
                    className={`w-10 h-6 rounded-full transition-colors ${
                      coding ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  ></div>
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      coding ? "translate-x-6" : "translate-x-0"
                    } flex items-center justify-center text-gray-800`}
                  >
                    <Code size={16} />
                  </span>
                </label>
              </div>

              <div className="p-6 space-y-6">
                {/* Toolbar + Question Input */}
                <div className="border border-gray-600 rounded-lg">
                  <div className="flex items-center gap-1 bg-gray-700 px-3 py-2 border-b border-gray-600">
                    <button className="p-2 rounded hover:bg-gray-600 transition-colors">
                      <Bold size={16} />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-600 transition-colors">
                      <Italic size={16} />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-600 transition-colors">
                      <Underline size={16} />
                    </button>
                    <div className="w-px h-6 bg-gray-600 mx-1"></div>
                    <button className="p-2 rounded hover:bg-gray-600 transition-colors">
                      <List size={16} />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-600 transition-colors">
                      <ListOrdered size={16} />
                    </button>
                    <div className="w-px h-6 bg-gray-600 mx-1"></div>
                    <button className="p-2 rounded hover:bg-gray-600 transition-colors">
                      <Quote size={16} />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-600 transition-colors">
                      <Link size={16} />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-600 transition-colors">
                      <Smile size={16} />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-600 transition-colors">
                      <Code size={16} />
                    </button>
                  </div>

                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full min-h-28 bg-transparent px-4 py-3 text-white resize-none outline-none"
                    placeholder="Type your question..."
                  />
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {options.map((opt, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 max-w-3xl mx-auto transition-colors ${
                        i === selectedIndex
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-600 bg-gray-700/50"
                      }`}
                    >
                      <button
                        onClick={() => setSelectedIndex(i)}
                        className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                          i === selectedIndex ? "border-red-500" : "border-gray-400"
                        }`}
                      >
                        {i === selectedIndex && (
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        )}
                      </button>

                      <input
                        value={opt}
                        onChange={(e) => updateOption(i, e.target.value)}
                        className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                        placeholder={`Option ${i + 1}`}
                      />

                      <button
                        onClick={() => removeOption(i)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                 <button
  onClick={addOption}
  className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors max-w-2xl justify-start"
>
  <span className="text-lg leading-none">+</span>
  <span>Add Option</span>
</button>

                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
         <button
  className={`flex items-center justify-center px-6 py-2 gap-2 ${gradientButtonStyle} rounded-md text-white font-semibold text-sm shadow-md transition-all duration-200`}
>
  Save
</button>

            </div>
          </section>

          {/* Right: Meta panel */}
          {!collapsed ? (
            <aside className="lg:col-span-4">
              <div className="rounded-lg bg-gray-900">
                {/* Sidebar header with collapse button */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                  <h3 className="font-semibold text-lg">Details</h3>
                  <button
                    onClick={() => setCollapsed(true)}
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors z-50"
                  >
                    <ChevronRight size={20} className="text-gray-300" />
                  </button>
                </div>

                <div className="px-6 pb-6 space-y-6">
                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 mt-2">Subject:</label>
                    <div className="relative">
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-600 bg-gray-900 px-4 py-2.5 text-white pr-10 focus:border-blue-500 focus:outline-none"
                      >
                        {defaultAddMcq.subjectOptions.map((s) => (
                          <option key={s} value={s} className="bg-gray-700">
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Topic */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Topic:</label>
                    <div className="relative">
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-600 bg-gray-900 px-4 py-2.5 text-white pr-10 focus:border-blue-500 focus:outline-none"
                      >
                        {defaultAddMcq.topicOptions.map((t) => (
                          <option key={t} value={t} className="bg-gray-700">
                            {t}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-700"></div>

                  {/* Type, Difficulty, Status, Marks */}
                  <div className="bg-card rounded-lg p-6 border border-gray-600 space-y-6">
                    {/* Type */}
                    <div className="space-y-2">
                      <label className="text-md font-medium text-gray-300 block">Type</label>
                      <div className="relative">
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full appearance-none rounded-lg border border-gray-600 bg-gray-900 px-4 py-2.5 text-white pr=10 focus:border-blue-500 focus:outline-none"
                        >
                          {defaultAddMcq.typeOptions.map((t) => (
                            <option key={t} value={t} className="bg-gray-700">
                              {t}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Difficulty */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 block">Difficulty</label>
                      <div className="flex gap-2">
                        {(["Easy", "Medium", "Hard"] as const).map((d) => (
                          <button
                            key={d}
                            onClick={() => setDifficulty(d)}
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                              difficulty === d
                                ? d === "Easy"
                                  ? "bg-green-500/20 text-green-400 border border-green-500"
                                  : d === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500"
                                  : "bg-red-500/20 text-red-400 border border-red-500"
                                : "bg-gray-700 text-gray-3... hover:bg-gray-600"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 block">Status</label>
                      <div className="flex gap-2">
                        {(["Draft", "Published"] as const).map((s) => (
                          <button
                            key={s}
                            onClick={() => setStatus(s)}
                            className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
                              status === s
                                ? s === "Draft"
                                  ? "bg-purple-500/20 text-purple-400 border border-purple-500"
                                  : "bg-green-500/20 text-green-400 border border-green-500"
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
                      <label className="text-sm font-medium text-gray-300 block">Marks</label>
                      <input
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none text-center"
                        placeholder="Enter marks"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  )
}
