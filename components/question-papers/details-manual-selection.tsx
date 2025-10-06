"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Eye } from "lucide-react"
import { QUESTION_PAPER_ROUTES } from "@/data/question-papers-pages"
import type { SubjectSection, QuestionItem } from "@/data/question-paper-details"
import { questionPaperDetails } from "@/data/question-paper-details"
import { Pagination } from "@/components/ui/pagination"

function LevelBadge({ level }: { level: SubjectSection["level"] }) {
  const styles =
    level === "Easy"
      ? "bg-green-700/30 text-green-400"
      : level === "Medium"
        ? "bg-yellow-700/30 text-yellow-400"
        : "bg-red-700/30 text-red-400"
  return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${styles}`}>{level}</span>
}

function MethodPill({ method }: { method: SubjectSection["selection"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-slate-700/50 px-2 py-1.5 rounded-full text-slate-200 text-sm">
      <span className="flex size-5 items-center justify-center rounded-full bg-white">
        <img src="/icons/Knob.png" alt="Method Icon" className="h-3 w-3 object-contain" />
      </span>
      {method === "manual" ? "Manual" : "Random"}
    </span>
  )
}

function TableHeader() {
  return (
    <div className="bg-black px-4 py-3 grid grid-cols-12 gap-2 text-slate-300 text-sm font-medium">
      <div className="col-span-4">Subject</div>
      <div className="col-span-2">Percentage</div>
      <div className="col-span-2">Level</div>
      <div className="col-span-2">Selection</div>
      <div className="col-span-2 text-right">Actions</div>
    </div>
  )
}

function SectionRow({
  section,
  isExpanded,
  onToggle,
}: {
  section: SubjectSection
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="px-4 py-4 bg-slate-800/60 grid grid-cols-12 gap-2 items-center border-t border-slate-700 cursor-pointer hover:bg-slate-800/80"
      onClick={onToggle}
    >
      <div className="col-span-4 flex items-center gap-2">
        <button className="text-slate-400 hover:text-white">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
        <div>
          <div className="text-white font-medium">{section.name}</div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="text-slate-300">{section.percentage}%</div>
      </div>
      <div className="col-span-2">
        <LevelBadge level={section.level} />
      </div>
      <div className="col-span-2">
        <MethodPill method={section.selection} />
      </div>
      <div className="col-span-2 flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="inline-flex items-center justify-center size-8 rounded-md border border-red-400 hover:bg-slate-700/50"
          aria-label="Delete"
          title="Delete"
        >
          <span className="size-5 text-red-400">🗑</span>
        </button>

        <button
          type="button"
          className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-white hover:bg-slate-700/50"
          aria-label="View"
          title="View"
        >
          <Eye className="size-4 text-slate-300" />
        </button>
        <span className="inline-flex items-center justify-center rounded-md  border border-red-300 ">
          <span className="flex items-center justify-center size-8 rounded-md bg-black">
            <img src="/icons/edit-2.png" alt="Edit" className="size-4 object-contain" />
          </span>
        </span>
      </div>
    </div>
  )
}

function QuestionsHeader() {
  return (
    <div className="px-4 py-3 bg-slate-800/20 grid grid-cols-10 gap-4 items-center border-t border-slate-700">
      <div className="col-span-6 flex items-center gap-4">
        <div className="text-white text-sm font-medium">Questions</div>

        {/* Wrapper to push both elements further from left */}
        <div className="flex items-center gap-4 ml-42">
          <select className="bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-slate-200 text-sm min-w-[100px]">
            <option>Topic</option>
          </select>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-gradient-to-r from-orange-primary to-red-primary text-white text-sm font-medium"
          >
            + Add Question
          </button>
        </div>
      </div>

      <div className="col-span-2 text-white text-sm font-medium">Type</div>
      <div className="col-span-2 text-white text-sm font-medium text-center">Marks</div>
    </div>
  )
}

function QuestionRow({
  q,
  onToggle,
}: {
  q: QuestionItem
  onToggle: (id: string, checked: boolean) => void
}) {
  return (
    <div className="px-4 py-3 grid grid-cols-10 gap-4 items-center border-t border-slate-700 bg-slate-800/60 text-slate-200">
      <div className="col-span-6 flex items-start gap-3">
        <input
          type="checkbox"
          checked={q.checked}
          onChange={(e) => onToggle(q.id, e.target.checked)}
          className="mt-1.5 h-4 w-4 accent-orange-500 flex-shrink-0"
          aria-label="Select question"
        />
        <span className="text-sm leading-relaxed">{q.text}</span>
      </div>
      <div className="col-span-2 text-sm text-slate-200">{q.type}</div>
      <div className="col-span-2 text-sm text-center text-slate-200">{q.marks}</div>
    </div>
  )
}

export default function DetailsManualSelection() {
  const router = useRouter()
  const [sections, setSections] = useState<SubjectSection[]>(questionPaperDetails)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([sections[0]?.id]))
  const [sectionPages, setSectionPages] = useState<Record<string, number>>({})

  const questionsPerPage = 5 // Reduced to 5 to make pagination more visible

  const totalQuestions = useMemo(
    () => sections.reduce((acc, s) => acc + s.questions.filter((q) => q.checked).length, 0),
    [sections],
  )
  const totalMarks = useMemo(
    () => sections.reduce((acc, s) => acc + s.questions.filter((q) => q.checked).reduce((m, q) => m + q.marks, 0), 0),
    [sections],
  )

  const toggleQuestion = (sectionId: string, id: string, checked: boolean) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, questions: s.questions.map((q) => (q.id === id ? { ...q, checked } : q)) } : s,
      ),
    )
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
        // Initialize page to 1 if not already set
        if (!sectionPages[sectionId]) {
          setSectionPages((prevPages) => ({ ...prevPages, [sectionId]: 1 }))
        }
      }
      return newSet
    })
  }

  const handlePageChange = (sectionId: string, page: number) => {
    setSectionPages((prev) => ({ ...prev, [sectionId]: page }))
  }

  const getPaginatedQuestions = (section: SubjectSection) => {
    const currentPage = sectionPages[section.id] || 1
    const startIndex = (currentPage - 1) * questionsPerPage
    const endIndex = startIndex + questionsPerPage
    return {
      questions: section.questions.slice(startIndex, endIndex),
      totalPages: Math.ceil(section.questions.length / questionsPerPage),
      currentPage,
    }
  }

  return (
    <main className="flex-1 p-6">
      <div className="rounded-2xl bg-card border border-slate-700 p-4 md:p-6 space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-semibold">Manual Question Selection</h1>
          <div className="flex items-center gap-2">
            {/* Add Question button */}
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <span>Add Question</span>
            </button>

            {/* Preview button */}
            <button
              type="button"
              onClick={() => router.push(QUESTION_PAPER_ROUTES.preview)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-primary to-red-primary text-white"
            >
              <Eye className="size-4" />
              Preview
            </button>
          </div>
        </div>

        {/* Single Combined Table */}
        <div className="rounded-xl border border-slate-700 overflow-hidden">
          {/* Table Header */}
          <TableHeader />

          {/* Sections with Expandable Questions */}
          {sections.map((section) => {
            const { questions: paginatedQuestions, totalPages, currentPage } = getPaginatedQuestions(section)

            return (
              <div key={section.id}>
                {/* Section Row */}
                <SectionRow
                  section={section}
                  isExpanded={expandedSections.has(section.id)}
                  onToggle={() => toggleSection(section.id)}
                />

                {/* Expanded Questions Section */}
                {expandedSections.has(section.id) && (
                  <>
                    <QuestionsHeader />

                    {/* Questions for this section (paginated) */}
                    {paginatedQuestions.map((q) => (
                      <QuestionRow
                        key={q.id}
                        q={q}
                        onToggle={(id, checked) => toggleQuestion(section.id, id, checked)}
                      />
                    ))}

                    {/* Custom Pagination Component */}
                    {/* Debug: Always show pagination for testing - remove in production */}
                    <div className="p-2 bg-slate-700/30 text-xs text-slate-400">
                      Debug: Section {section.id} - Current Page: {currentPage}, Total Pages: {totalPages}, Questions: {section.questions.length}
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.max(totalPages, 2)} // Force at least 2 pages for testing
                      onPageChange={(page) => handlePageChange(section.id, page)}
                      maxVisiblePages={5}
                    />
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer Actions */}
       <div className="flex items-center justify-end gap-3">
  <button
    type="button"
    onClick={() => router.push(QUESTION_PAPER_ROUTES.create)}
    className="px-4 py-2 rounded-lg bg-transparent border border-slate-600 text-slate-200 hover:bg-slate-800 inline-flex items-center gap-2"
  >
   
    Back
  </button>
  <button
    type="button"
    onClick={() => router.push(QUESTION_PAPER_ROUTES.preview)}
    className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-primary to-red-primary text-white inline-flex items-center gap-2"
  >
    Next
    <ChevronRight className="size-4" />
  </button>
</div>

      </div>
    </main>
  )
}
