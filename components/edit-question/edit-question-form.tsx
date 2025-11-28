"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronDown, Trash2, Plus, Bold, Italic, Underline, List, Code } from "lucide-react"
import { sampleQuestion, type Option, type QuestionData } from "@/data/questionData"
import { questionStatus, questionDifficulties, questionTypes, questionTopics } from "@/data/questionMeta"
import { GradientButton } from "@/components/ui/gradient-button"

interface EditQuestionFormProps {
  questionId: string
}

export default function EditQuestionForm({ questionId }: EditQuestionFormProps) {
  const router = useRouter()
  const [question, setQuestion] = useState<string>(sampleQuestion.question)
  const [topic, setTopic] = useState<typeof sampleQuestion.topic>(sampleQuestion.topic)
  const [type, setType] = useState<typeof sampleQuestion.type>(sampleQuestion.type)
  const [difficulty, setDifficulty] = useState<typeof sampleQuestion.difficulty>(sampleQuestion.difficulty)
  const [status, setStatus] = useState<typeof sampleQuestion.status>(sampleQuestion.status)
  const [marks, setMarks] = useState<string>(sampleQuestion.marks)
  const [options, setOptions] = useState<Option[]>(sampleQuestion.options)
  const [collapsed, setCollapsed] = useState(false)
  const [coding, setCoding] = useState(false)

  // ---------- Handlers ----------
  const handleBack = (): void => router.back()
  const handleSave = (): void => {
    const payload: QuestionData = { question, topic, type, difficulty, status, marks, options }
    // TODO: send payload to API or state management
    router.back()
  }
  const handleAddOption = (): void => {
    const newOption: Option = { id: Date.now().toString(), text: "", isCorrect: false }
    setOptions((prev) => [...prev, newOption])
  }
  const handleOptionChange = (optionId: string, text: string): void => {
    setOptions((prev) => prev.map((o) => (o.id === optionId ? { ...o, text } : o)))
  }
  const handleCorrectAnswerChange = (optionId: string): void => {
    setOptions((prev) => prev.map((o) => ({ ...o, isCorrect: o.id === optionId })))
  }

  // ---------- Render ----------
  return (
    <div className="min-h-screen text-white bg-gray-900 p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-card rounded-t-lg">
        <h1 className="text-2xl font-semibold">Edit Question</h1>
        <button
          onClick={handleBack}
          className="px-6 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
      </div>

      {/* Main content container */}
      <div className="bg-card rounded-b-lg relative">
        <div className="h-px bg-gray-700 mx-6"></div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
          {/* Expand button when collapsed */}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="absolute right-6 top-6 flex flex-col items-center gap-2 z-50 group"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-white bg-gray-800 group-hover:bg-gray-700 transition-colors">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-sm font-medium">Add Details</span>
            </button>
          )}

          {/* Left column */}
          <section className={`${collapsed ? "lg:col-span-11 pr-12" : "lg:col-span-8"} relative`}>
            {!collapsed && <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-px bg-gray-700"></div>}

            <div className="rounded-lg bg-card">
              {/* Toolbar + Question */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-lg">Question</h2>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={coding} onChange={() => setCoding(!coding)} className="sr-only" />
                    <div
                      className={`w-10 h-6 rounded-full transition-colors ${coding ? "bg-blue-500" : "bg-gray-600"}`}
                    ></div>
                    <span
                      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${coding ? "translate-x-6" : "translate-x-0"} flex items-center justify-center text-gray-800`}
                    >
                      <Code size={16} />
                    </span>
                  </label>
                </div>

                {/* Formatting toolbar */}
                <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-md">
                  <button className="p-2 rounded hover:bg-gray-700 transition-colors">
                    <Bold size={16} />
                  </button>
                  <button className="p-2 rounded hover:bg-gray-700 transition-colors">
                    <Italic size={16} />
                  </button>
                  <button className="p-2 rounded hover:bg-gray-700 transition-colors">
                    <Underline size={16} />
                  </button>
                  <button className="p-2 rounded hover:bg-gray-700 transition-colors">
                    <List size={16} />
                  </button>
                  <button className="p-2 rounded hover:bg-gray-700 transition-colors">
                    <Code size={16} />
                  </button>
                </div>

                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full min-h-28 bg-transparent px-4 py-3 text-white resize-none outline-none border border-gray-600 rounded-lg"
                  placeholder="Type your question..."
                />

                {/* Options */}
                <div className="space-y-3">
                  {options.map((opt, i) => (
                    <div
                      key={opt.id}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 max-w-3xl mx-auto transition-colors ${
                        opt.isCorrect ? "border-blue-500 bg-blue-500/10" : "border-gray-600 bg-gray-700/50"
                      }`}
                    >
                      <button
                        onClick={() => handleCorrectAnswerChange(opt.id)}
                        className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${opt.isCorrect ? "border-red-500" : "border-gray-400"}`}
                      >
                        {opt.isCorrect && <div className="h-2 w-2 rounded-full bg-red-500"></div>}
                      </button>

                      <input
                        value={opt.text}
                        onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                        className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                        placeholder={`Option ${i + 1}`}
                      />

                      <button
                        onClick={() => setOptions((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={handleAddOption}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors max-w-2xl justify-start"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Option</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 px-6 pb-6">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <GradientButton onClick={handleSave} size="md">
                  Save
                </GradientButton>
              </div>
            </div>
          </section>

          {/* Right column */}
      {/* Right column */}
{!collapsed && (
  <aside className="lg:col-span-4">
    <div className="rounded-lg bg-gray-900">
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
        
        {/* Topic */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Topic:</label>
          <div className="relative">
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value as typeof sampleQuestion.topic)}
              className="w-full appearance-none rounded-lg border border-gray-600 bg-gray-800 px-4 py-2.5 text-white pr-10 focus:border-orange-primary focus:outline-none"
            >
              {questionTopics.map((t) => (
                <option key={t} value={t} className="bg-gray-800">
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Type:</label>
          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof sampleQuestion.type)}
              className="w-full appearance-none rounded-lg border border-gray-600 bg-gray-800 px-4 py-2.5 text-white pr-10 focus:border-orange-primary focus:outline-none"
            >
              {questionTypes.map((qt) => (
                <option key={qt} value={qt} className="bg-gray-800">
                  {qt}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Difficulty:</label>
          <div className="flex gap-2">
            {questionDifficulties.map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  difficulty === level
                    ? level === "Easy"
                      ? "bg-green-primary text-white"
                      : level === "Medium"
                        ? "bg-yellow-primary text-white"
                        : "bg-red-primary text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* STATUS — now READONLY TAGS */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Status:</label>
          <div className="flex gap-2">
            {questionStatus.map((s) => (
              <div
                key={s}
                className={`flex-1 py-2 rounded-md text-sm text-center font-medium border ${
                  status === s
                    ? "border-green-primary text-green-primary bg-green-primary/10"
                    : "border-gray-700 text-gray-400 bg-gray-800"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* MARKS — now proper text input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Marks:</label>
          <input
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2.5 text-white focus:border-orange-primary focus:outline-none"
            placeholder="Enter marks"
          />
        </div>

      </div>
    </div>
  </aside>
)}

        </div>
      </div>
    </div>
  )
}
