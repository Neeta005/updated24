"use client"

import { useRouter } from 'next/navigation'
import { ChevronRight, Trash2, Bold, Italic, Underline, List, ListOrdered, Quote, Code, Link, Smile, ChevronDown, Check, Square } from 'lucide-react'
import { useState, useRef, useEffect } from "react"
import { defaultAddMcq } from "@/data/question-papers/add-mcq"
import { GradientButton } from "@/components/ui/gradient-button"

export function AddQuestionMcq() {
  const router = useRouter()
  const [question, setQuestion] = useState(defaultAddMcq.question)
  const [options, setOptions] = useState<string[]>([...defaultAddMcq.options])
  const [selectedIndex, setSelectedIndex] = useState<number>(defaultAddMcq.selectedIndex)
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]) // For multi-select
  const [subject, setSubject] = useState(defaultAddMcq.subject)
  const [topic, setTopic] = useState(defaultAddMcq.topic)
  const [type, setType] = useState(defaultAddMcq.type)
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">(defaultAddMcq.difficulty)
  const [status, setStatus] = useState<"Draft" | "Published">(defaultAddMcq.status)
  const [marks, setMarks] = useState(defaultAddMcq.marks)
  const [coding, setCoding] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [trueFalseAnswer, setTrueFalseAnswer] = useState<"True" | "False">("True")
  const [shortAnswer, setShortAnswer] = useState("")
  const [showSubjectList, setShowSubjectList] = useState(false)
  const subjects = ["Math", "Physics", "Biology", "Chemistry", "English"]

  const [codeContent, setCodeContent] = useState(`def calculate(val):
    if val % 2 == 0:
        return "Even"
    elif val % 3 == 0:
        return "Divisible by 3"
    else:
        return "Odd"

print(calculate(9))`)
  const [optionCoding, setOptionCoding] = useState<Record<number, boolean>>({})
  const [optionCodeContent, setOptionCodeContent] = useState<Record<number, string>>({})
  
  // Custom dropdown state
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLElement>(null)
  const optionCodeRefs = useRef<Record<number, HTMLElement | null>>({})

  // Load highlight.js
  useEffect(() => {
    const loadHighlightJS = async () => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
      document.head.appendChild(link)

      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js'
      script.onload = () => {
        const pythonScript = document.createElement('script')
        pythonScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/python.min.js'
        pythonScript.onload = () => {
          if ((window as any).hljs) {
            (window as any).hljs.highlightAll()
          }
        }
        document.body.appendChild(pythonScript)
      }
      document.body.appendChild(script)
    }

    loadHighlightJS()
  }, [])

  useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.closest(".subject-box")) {
        setShowSubjectList(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // Highlight code when it changes
  useEffect(() => {
    if ((window as any).hljs && codeRef.current) {
      (window as any).hljs.highlightElement(codeRef.current)
    }
  }, [codeContent, coding, type])

  // Highlight option code when it changes
  useEffect(() => {
    if ((window as any).hljs) {
      Object.keys(optionCodeRefs.current).forEach(key => {
        const ref = optionCodeRefs.current[parseInt(key)]
        if (ref) {
          (window as any).hljs.highlightElement(ref)
        }
      })
    }
  }, [optionCodeContent, optionCoding])

  const addOption = () => setOptions((prev) => [...prev, ""])
  const updateOption = (i: number, val: string) => setOptions((prev) => prev.map((o, idx) => (idx === i ? val : o)))
  const removeOption = (i: number) => {
    setOptions((prev) => prev.filter((_, idx) => idx !== i))
    // Clean up coding state for removed option
    const newOptionCoding = { ...optionCoding }
    const newOptionCodeContent = { ...optionCodeContent }
    delete newOptionCoding[i]
    delete newOptionCodeContent[i]
    setOptionCoding(newOptionCoding)
    setOptionCodeContent(newOptionCodeContent)
    
    // Remove from selected indices if multi-select
    if (type === "MCQ (Multi Answers)") {
      setSelectedIndices(prev => prev.filter(idx => idx !== i))
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePublish = () => {
    setStatus("Published")
    console.log("Question published!")
  }

  // Handle single answer selection
  const handleSingleSelect = (i: number) => {
    setSelectedIndex(i)
  }

  // Handle multi-answer selection
  const handleMultiSelect = (i: number) => {
    setSelectedIndices(prev => {
      if (prev.includes(i)) {
        return prev.filter(idx => idx !== i)
      } else {
        return [...prev, i]
      }
    })
  }

  const typeOptions = [
    { value: "MCQ (Single Answer)", label: "MCQ (Single Answer)", icon: "/icons/icon.png" },
    { value: "MCQ (Multi Answers)", label: "MCQ (Multi Answers)", icon: "/icons/check-square.png" },
    { value: "True/False", label: "True / False", icon: "/icons/tick-circle.png" },
    { value: "Short Answer", label: "Descriptive", icon: "/icons/Menu.png" },
    { value: "Coding", label: "Coding", icon: "/icons/code.png" },
  ]

  const selectedType = typeOptions.find(option => option.value === type) || typeOptions[0]

  return (
    <div className="min-h-screen text-white bg-gray-900 p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-card rounded-t-lg">
        <h1 className="text-2xl font-semibold">Add Question</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePublish}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium"
          >
            Publish
          </button>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
        </div>
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
                <img src="/icons/edit-2 (1).png" alt="Add details" className="w-5 h-5" />
              </div>
              <span className="text-white text-sm font-medium">Add Details</span>
            </button>
          )}

          {/* Left: Question editor */}
          <section className={`${collapsed ? "lg:col-span-11 pr-12" : "lg:col-span-9"} relative`}>
            {!collapsed && <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-px bg-gray-700"></div>}

            <div className="rounded-lg bg-card">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <h2 className="font-semibold text-lg">
                  {type === "MCQ (Single Answer)"
                    ? "Multiple Choice Question (Single Answer)"
                    : type === "MCQ (Multi Answers)"
                      ? "Multiple Choice Question (Multi Answers)"
                      : type === "True/False"
                        ? "True / False"
                        : type === "Coding"
                          ? "Coding Question"
                          : "Short Answer"}
                </h2>
                {type !== "Coding" && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-300">Coding</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={coding} onChange={() => setCoding(!coding)} className="sr-only" />
                      <div
                        className={`w-10 h-6 rounded-full transition-colors ${coding ? "bg-green-500" : "bg-gray-600"}`}
                      ></div>
                      <span
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                          coding ? "translate-x-6" : "translate-x-0"
                        } flex items-center justify-center text-gray-800`}
                      >
                        {coding && <Code size={12} />}
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-6">
                {/* Toolbar */}
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

                  {/* Question textarea */}
                  {type !== "Coding" && (
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="w-full min-h-28 bg-transparent px-4 py-3 text-white resize-none outline-none"
                      placeholder={
                        type === "True/False"
                          ? "Write a Statement..."
                          : type === "Short Answer"
                            ? "Write your question..."
                            : "Type your question..."
                      }
                    />
                  )}
                </div>

                {/* Code Editor */}
                {(coding || type === "Coding") && (
                  <div className="border border-gray-600 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between bg-gray-700 px-4 py-2 border-b border-gray-600">
                      <span className="text-sm font-medium text-gray-300">Python</span>
                      <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                        <Code size={16} className="text-green-500" />
                      </button>
                    </div>
                    <div className="bg-gray-900 p-4 min-h-56">
                      <pre className="!bg-transparent !p-0 !m-0"><code 
                        ref={codeRef}
                        className="language-python !bg-transparent text-sm"
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => setCodeContent(e.currentTarget.textContent || "")}
                      >{codeContent}</code></pre>
                    </div>
                  </div>
                )}

                {/* MCQ Options for Single and Multi Answer */}
                {(type === "MCQ (Single Answer)" || type === "MCQ (Multi Answers)") && (
                  <>
                    <div className="space-y-3">
                      {options.map((opt, i) => (
                        <div key={i} className="space-y-2">
                          <div
                            className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                              (type === "MCQ (Single Answer)" && i === selectedIndex) ||
                              (type === "MCQ (Multi Answers)" && selectedIndices.includes(i))
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-gray-600 bg-gray-700/50"
                            }`}
                          >
                            {/* Selection indicator */}
                            {type === "MCQ (Single Answer)" ? (
                              // Radio button for single select
                              <button
                                onClick={() => handleSingleSelect(i)}
                                className={`h-4 w-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  i === selectedIndex ? "border-red-500" : "border-gray-400"
                                }`}
                              >
                                {i === selectedIndex && <div className="h-2 w-2 rounded-full bg-red-500"></div>}
                              </button>
                            ) : (
                              // Checkbox for multi select
                              <button
                                onClick={() => handleMultiSelect(i)}
                                className={`h-4 w-4 rounded border flex items-center justify-center flex-shrink-0 ${
                                  selectedIndices.includes(i) ? "border-blue-500 bg-blue-500" : "border-gray-400"
                                }`}
                              >
                                {selectedIndices.includes(i) && (
                                  <Check size={12} className="text-white" />
                                )}
                              </button>
                            )}

                            <input
                              value={opt}
                              onChange={(e) => updateOption(i, e.target.value)}
                              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                              placeholder={`Option ${i + 1}`}
                            />

                            {coding && (
                              <>
                                <span className="text-xs font-medium text-gray-400">Coding</span>
                                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                  <input
                                    type="checkbox"
                                    checked={optionCoding[i] || false}
                                    onChange={() => {
                                      const newState = !optionCoding[i]
                                      setOptionCoding((prev) => ({ ...prev, [i]: newState }))
                                      if (newState && !optionCodeContent[i]) {
                                        setOptionCodeContent((prev) => ({
                                          ...prev,
                                          [i]: `def solution():
    # Write solution here
    pass`
                                        }))
                                      }
                                    }}
                                    className="sr-only"
                                  />
                                  <div
                                    className={`w-8 h-5 rounded-full transition-colors ${
                                      optionCoding[i] ? "bg-green-500" : "bg-gray-600"
                                    }`}
                                  ></div>
                                  <span
                                    className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                                      optionCoding[i] ? "translate-x-3.5" : "translate-x-0"
                                    }`}
                                  ></span>
                                </label>
                              </>
                            )}

                            <button
                              onClick={() => removeOption(i)}
                              className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {coding && optionCoding[i] && (
                            <div className="border border-gray-600 rounded-lg overflow-hidden ml-8">
                              <div className="flex items-center justify-between bg-gray-700 px-4 py-2 border-b border-gray-600">
                                <span className="text-sm font-medium text-gray-300">Python</span>
                                <button className="p-1 text-green-500 hover:text-green-400 transition-colors">
                                  <Code size={16} />
                                </button>
                              </div>
                              <div className="bg-gray-900 p-4 min-h-40">
                                <pre className="!bg-transparent !p-0 !m-0"><code
                                  ref={(el) => { optionCodeRefs.current[i] = el }}
                                  className="language-python !bg-transparent text-sm"
                                  contentEditable
                                  suppressContentEditableWarning
                                  onInput={(e) => {
                                    setOptionCodeContent((prev) => ({
                                      ...prev,
                                      [i]: e.currentTarget.textContent || ""
                                    }))
                                  }}
                                >{optionCodeContent[i] || `def solution():
    # Write solution here
    pass`}</code></pre>
                              </div>
                            </div>
                          )}
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
                    
                    {/* Selected answers info for multi-select */}
                    {type === "MCQ (Multi Answers)" && selectedIndices.length > 0 && (
                      <div className="mt-4 p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="font-medium text-green-400">{selectedIndices.length}</span> 
                          {selectedIndices.length === 1 ? " option selected" : " options selected"}
                          {selectedIndices.length > 0 && (
                            <span className="text-gray-400 ml-2">
                              (Option{selectedIndices.length > 1 ? 's' : ''}: {selectedIndices.map(i => i + 1).join(', ')})
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {type === "True/False" && (
                  <>
                    <div className="space-y-3">
                      {["True", "False"].map((option) => (
                        <button
                          key={option}
                          onClick={() => setTrueFalseAnswer(option as "True" | "False")}
                          className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                            trueFalseAnswer === option
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-gray-600 bg-gray-700/50 hover:border-gray-500"
                          }`}
                        >
                          <div
                            className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                              trueFalseAnswer === option ? "border-red-500" : "border-gray-400"
                            }`}
                          >
                            {trueFalseAnswer === option && <div className="h-2 w-2 rounded-full bg-red-500"></div>}
                          </div>
                          <span className="text-white font-medium">{option}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {type === "Short Answer" && (
                  <>
                    <div className="border border-gray-600 rounded-lg">
                      <textarea
                        value={shortAnswer}
                        onChange={(e) => setShortAnswer(e.target.value)}
                        className="w-full min-h-24 bg-transparent px-4 py-3 text-white resize-none outline-none"
                        placeholder="Enter the expected answer..."
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <GradientButton size="md">Save</GradientButton>
            </div>
          </section>

          {/* Right: Meta panel */}
          {!collapsed ? (
            <aside className="lg:col-span-3">
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
                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 mt-2">Subject:</label>
                    <div className="relative">
                      <div className="relative">
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => {
                            setSubject(e.target.value)
                            setShowSubjectList(true)
                          }}
                          onFocus={() => setShowSubjectList(true)}
                          placeholder="Search subject..."
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 outline-none"
                        />
                        {showSubjectList && (
                          <div className="absolute z-50 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {subjects
                              .filter((s) => s.toLowerCase().includes(subject.toLowerCase()))
                              .map((s) => (
                                <div
                                  key={s}
                                  onClick={() => {
                                    setSubject(s)
                                    setShowSubjectList(false)
                                  }}
                                  className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                                >
                                  {s}
                                </div>
                              ))}
                            {subjects.filter((s) => s.toLowerCase().includes(subject.toLowerCase())).length === 0 && (
                              <div className="px-4 py-2 text-gray-400">No results found</div>
                            )}
                          </div>
                        )}
                      </div>
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

                  <div className="h-px bg-gray-700"></div>

                  <div className="bg-card rounded-lg p-6 border border-gray-600 space-y-6">
                    {/* Type - Custom Dropdown */}
                    <div className="space-y-2">
                      <label className="text-md font-medium text-gray-300 block">Type</label>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                          className="w-full flex items-center justify-between rounded-lg border border-gray-600 bg-gray-900 px-4 py-2.5 text-white pr-10 focus:border-blue-500 focus:outline-none"
                        >
                          <div className="flex items-center gap-2">
                            {type === "MCQ (Single Answer)" && (
                              <div className="w-4 h-4 rounded-full border border-blue-400 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                              </div>
                            )}
                            {type === "MCQ (Multi Answers)" && (
                              <div className="w-4 h-4 rounded border border-blue-400 flex items-center justify-center">
                                <Check size={12} className="text-blue-400" />
                              </div>
                            )}
                            {type === "True/False" && <img src="/icons/tick-circle.png" alt="True/False" className="w-4 h-4" />}
                            {type === "Short Answer" && <img src="/icons/Menu.png" alt="Descriptive" className="w-4 h-4" />}
                            {type === "Coding" && <img src="/icons/code.png" alt="Coding" className="w-4 h-4" />}
                            <span>{selectedType.label}</span>
                          </div>
                          <ChevronDown 
                            className={`w-4 h-4 text-gray-400 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} 
                          />
                        </button>

                        {isTypeDropdownOpen && (
                          <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg">
                            {typeOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                  setType(option.value)
                                  setIsTypeDropdownOpen(false)
                                  // Reset selection states when changing type
                                  if (option.value !== "MCQ (Single Answer)") {
                                    setSelectedIndex(-1)
                                  }
                                  if (option.value !== "MCQ (Multi Answers)") {
                                    setSelectedIndices([])
                                  }
                                }}
                                className={`w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-700 transition-colors ${
                                  type === option.value ? 'bg-blue-500/20 text-blue-400' : 'text-white'
                                } first:rounded-t-lg last:rounded-b-lg`}
                              >
                                {option.value === "MCQ (Single Answer)" && (
                                  <div className="w-4 h-4 rounded-full border border-blue-400 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                  </div>
                                )}
                                {option.value === "MCQ (Multi Answers)" && (
                                  <div className="w-4 h-4 rounded border border-blue-400 flex items-center justify-center">
                                    <Check size={12} className="text-blue-400" />
                                  </div>
                                )}
                                {option.value === "True/False" && <img src="/icons/tick-circle.png" alt="True/False" className="w-4 h-4" />}
                                {option.value === "Short Answer" && <img src="/icons/Menu.png" alt="Descriptive" className="w-4 h-4" />}
                                {option.value === "Coding" && <img src="/icons/code.png" alt="Coding" className="w-4 h-4" />}
                                <span>{option.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
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