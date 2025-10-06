"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

import type { Question } from "@/types"  // ✅ you already have this in types folder

// Props for this component
export interface AddQuestionMCQProps {
  onBack: () => void
}

// Option type
export interface Option {
  id: string
  text: string
  isCorrect: boolean
}

// Enums/unions for dropdowns
export type Subject = "Design" | "Development" | "Security"
export type Topic = "UI Design" | "UX Design" | "Interactive Design"
export type QuestionType = "MCQS" | "Text" | "Code"

// Component
export function AddQuestionMCQ({ onBack }: AddQuestionMCQProps) {
  // States
  const [question, setQuestion] = useState<string>(
    'Which of the following best describes "Visual Hierarchy" in UI design'
  )
  const [subject, setSubject] = useState<Subject>("Design")
  const [topic, setTopic] = useState<Topic>("UI Design")
  const [type, setType] = useState<QuestionType>("MCQS")
  const [difficulty, setDifficulty] = useState<Question["difficulty"]>("Easy") // ✅ uses your types file
  const [status, setStatus] = useState<Question["status"]>("Draft")
  const [marks, setMarks] = useState<number>(5)
  const [options, setOptions] = useState<Option[]>([
    { id: "1", text: "Using random colors to make UI attractive", isCorrect: false },
    { id: "2", text: "Organizing elements to guide the user's attention", isCorrect: true },
    { id: "3", text: "Adding animations to every UI element", isCorrect: false },
    { id: "4", text: "Using only black and white colors", isCorrect: false },
  ])

  // Handlers
  const addOption = (): void => {
    const newOption: Option = {
      id: Date.now().toString(),
      text: "",
      isCorrect: false,
    }
    setOptions((prev: Option[]) => [...prev, newOption])
  }

  const removeOption = (id: string): void => {
    setOptions((prev: Option[]) => prev.filter((option) => option.id !== id))
  }

  const updateOption = (id: string, text: string): void => {
    setOptions((prev: Option[]) =>
      prev.map((option) => (option.id === id ? { ...option, text } : option))
    )
  }

  const setCorrectOption = (id: string): void => {
    setOptions((prev: Option[]) =>
      prev.map((option) => ({ ...option, isCorrect: option.id === id }))
    )
  }

  return (
    <div className="p-4">
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium mb-4">
        <ArrowLeft size={16} /> Back
      </button>

      {/* Question Input */}
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        rows={3}
      />

      {/* Options Section */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Options</h3>
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              checked={option.isCorrect}
              onChange={() => setCorrectOption(option.id)}
            />
            <input
              type="text"
              value={option.text}
              onChange={(e) => updateOption(option.id, e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Enter option text"
            />
            <button onClick={() => removeOption(option.id)} className="text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button onClick={addOption} className="flex items-center gap-2 text-blue-500 mt-2">
          <Plus size={16} /> Add Option
        </button>
      </div>

      {/* Question Meta */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value as Subject)}
            className="w-full border p-2 rounded"
          >
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Security">Security</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value as Topic)}
            className="w-full border p-2 rounded"
          >
            <option value="UI Design">UI Design</option>
            <option value="UX Design">UX Design</option>
            <option value="Interactive Design">Interactive Design</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as QuestionType)}
            className="w-full border p-2 rounded"
          >
            <option value="MCQS">MCQS</option>
            <option value="Text">Text</option>
            <option value="Code">Code</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Question["difficulty"])}
            className="w-full border p-2 rounded"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marks</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      {/* Status Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Question["status"])}
          className="w-full border p-2 rounded"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
      </div>
    </div>
  )
}
