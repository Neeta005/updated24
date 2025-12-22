"use client"

import React, { useState, useMemo } from "react"
import { ChevronDown, ChevronRight, Plus, Eye, Edit3, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { ImportCSVModal } from "@/components/modals/import-csv-modal"
import { MappedImportModal } from "@/components/modals/mapped-import-modal"
import { QuestionSection } from "@/components/question-section/question-section"
import { EditTopicModal } from "@/components/modals/edit-topic-modal"
import { Pagination } from "@/components/ui/pagination"
import { GradientButton } from "@/components/ui/gradient-button"
import { SearchInput } from "@/components/ui/search-input"


// ---------------------- UnifiedBadge Component ----------------------
interface UnifiedBadgeProps {
  value: string
  className?: string
}

export const UnifiedBadge = ({ value, className }: UnifiedBadgeProps) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center ${className ?? ""}`}
    >
      {value}
    </span>
  )
}

// ---------------------- Main Component ----------------------
interface QuestionBankState {
  expandedSections: Record<string, boolean>
  isImportModalOpen: boolean
  isMappedModalOpen: boolean
  showQuestionSection: boolean
  selectedFileType: "xls" | "csv" | "google-sheet" | null
  selectedTopic: string
  isEditTopicModalOpen: boolean
  selectedTopicForEdit: {
    subject: string
    name: string
    description?: string
  } | null
  currentPage: number
}

// Target Badge
const TargetBadge = React.memo(({ text }: { text: string }) => (
  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-green-500/20 rounded-full">
    {text}
  </span>
))
TargetBadge.displayName = "TargetBadge"

// Subtopic Row
const SubtopicRow = React.memo(
  ({
    subtopic,
    onEyeClick,
    onEditClick,
  }: {
    subtopic: { name: string; questions: number }
    onEyeClick: (topicName: string) => void
    onEditClick: (topicName: string) => void
  }) => (
    <div className="grid grid-cols-12 gap-12 items-center py-2 px-3 bg-gray-900 rounded-lg">
      <div className="col-span-3 flex items-center space-x-2">
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 ml-1"></div>
        <span className="text-gray-300 font-medium text-sm">{subtopic.name}</span>
      </div>

      {/* Target Audience column */}
      <div className="col-span-2 flex justify-center"></div>

      {/* Topics column */}
      <div className="col-span-2 flex justify-center">
        <UnifiedBadge value="01" className="bg-blue-500/30 text-white" />
      </div>

      {/* Questions column */}
      <div className="col-span-2 flex justify-center">
        <UnifiedBadge value={String(subtopic.questions)} className="bg-pink-600/30 text-white" />
      </div>

      {/* Actions */}
      <div className="col-span-3 flex justify-center items-center space-x-2">
        <button className="p-1.5 border border-orange-500 rounded-lg transition-colors hover:bg-orange-500/10">
          <Trash2 className="size-3 text-orange-500" />
        </button>
        <button
          onClick={() => onEyeClick(subtopic.name)}
          className="p-1.5 border border-white hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Eye className="size-3 text-white" />
        </button>
        {/* <button
          onClick={() => onEditClick(subtopic.name)}
          className="p-1.5 border border-red-500 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Edit3 className="size-3 text-red-500" />
        </button> */}
      </div>
    </div>
  ),
)

SubtopicRow.displayName = "SubtopicRow"

// ---------------------- QuestionBank Component ----------------------
export default function QuestionBank() {
  const router = useRouter()

  const [state, setState] = useState<QuestionBankState>({
    expandedSections: {
      design1: false,
      design2: true,
      design3: false,
      design4: false,
      design5: false,
    },
    isImportModalOpen: false,
    isMappedModalOpen: false,
    showQuestionSection: false,
    selectedFileType: null,
    selectedTopic: "",
    isEditTopicModalOpen: false,
    selectedTopicForEdit: null,
    currentPage: 1,
  })

  const designSubtopics = useMemo(
    () => [
      { name: "UI Design", questions: 18 },
      { name: "UX Design", questions: 12 },
      { name: "Interactive Design", questions: 8 },
      { name: "Universal Design", questions: 15 },
    ],
    [],
  )

  const toggleSection = (sectionId: string) => {
    setState((prev) => ({
      ...prev,
      expandedSections: {
        ...prev.expandedSections,
        [sectionId]: !prev.expandedSections[sectionId],
      },
    }))
  }

  const handleImportCSV = () => setState((prev) => ({ ...prev, isImportModalOpen: true }))
  const handleCloseImportModal = () => setState((prev) => ({ ...prev, isImportModalOpen: false }))

  const handleTemplateSelect = (type: "xls" | "csv" | "google-sheet") => {
    setState((prev) => ({
      ...prev,
      selectedFileType: type,
      isImportModalOpen: false,
      isMappedModalOpen: true,
    }))
  }

  const handleCloseMappedModal = () =>
    setState((prev) => ({ ...prev, isMappedModalOpen: false, selectedFileType: null }))

  const handleEyeClick = (topicName: string) =>
    setState((prev) => ({ ...prev, selectedTopic: topicName, showQuestionSection: true }))

  const handleEditClick = (topicName: string) =>
    setState((prev) => ({
      ...prev,
      selectedTopicForEdit: { subject: "Design", name: topicName, description: "" },
      isEditTopicModalOpen: true,
    }))
// Add these (TypeScript) states for the three search inputs
const [searchMain, setSearchMain] = useState<string>("")
const [searchTopic, setSearchTopic] = useState<string>("")
const [searchAudience, setSearchAudience] = useState<string>("")

  const handleCloseEditTopicModal = () =>
    setState((prev) => ({ ...prev, isEditTopicModalOpen: false, selectedTopicForEdit: null }))

  const handleBackFromQuestionSection = () =>
    setState((prev) => ({ ...prev, showQuestionSection: false, selectedTopic: "" }))

  const handlePageChange = (page: number) => setState((prev) => ({ ...prev, currentPage: page }))

    const handleAddQuestion = () => router.push("/question-papers/add")

  if (state.showQuestionSection)
    return <QuestionSection topicName={state.selectedTopic} onBack={handleBackFromQuestionSection} />

  return (
    <div className="flex-1 p-4 bg-background min-h-screen">
      <div className="bg-card rounded-xl p-5 ">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Question Bank</h1>
        <div className="flex items-center justify-end">
  <GradientButton
    onClick={handleImportCSV}
    size="sm"
    className="flex items-center justify-center gap-2 font-semibold text-sm shadow-md px-4 py-2"
  >
    <Plus className="size-4 text-white" />
    <span>Import CSV</span>
  </GradientButton>
</div>

        </div>

        {/* Search & Stats */}
     {/* Search & Stats Row */}
<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
  {/* Left side — Search Inputs */}
  <div className="flex flex-wrap sm:flex-row gap-4 w-full sm:w-auto">
    <SearchInput
      placeholder="Search"
      value={searchMain}
      onChange={setSearchMain}
      className="w-full sm:w-56"
      icon="custom"
      customIcon="/icons/subject.png"
      iconAlt="Search icon"
    />

    <SearchInput
      placeholder="Search Topic"
      value={searchTopic}
      onChange={setSearchTopic}
      className="w-full sm:w-56"
      icon="custom"
      customIcon="/icons/noun-topic-6799098 1.png"
      iconAlt="Topic icon"
    />

    <SearchInput
      placeholder="Search Target Audience"
      value={searchAudience}
      onChange={setSearchAudience}
      className="w-full sm:w-56"
      icon="custom"
      customIcon="/icons/audience tarr 1 (1).png"
      iconAlt="Users icon"
    />
  </div>

  {/* Right side — Totals */}
  <div className="text-gray-300 text-sm font-medium whitespace-nowrap text-right">
    Total subjects: <span className="text-white font-semibold">12</span> |{" "}
    Total topics: <span className="text-white font-semibold">32</span> |{" "}
    Total questions: <span className="text-white font-semibold">128</span>
  </div>
</div>


        {/* Table */}
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
          {/* Table header */}
          <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-12 items-center ">
              <div className="col-span-3 text-gray-400 font-medium text-sm">Subject</div>
              <div className="col-span-2 flex justify-center text-gray-400 font-medium text-sm">Target Audience</div>
              <div className="col-span-2 flex justify-center text-gray-400 font-medium text-sm">Topics</div>
              <div className="col-span-2 flex justify-center text-gray-400 font-medium text-sm">Questions</div>
              <div className="col-span-3 flex justify-center text-gray-400 font-medium text-sm">Actions</div>
            </div>
          </div>

          {/* Table rows */}
          {Object.keys(state.expandedSections).map((sectionId) => (
            <div
              key={sectionId}
              className="px-6 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
            >
              <div className="grid grid-cols-12 gap-12 items-center">
                <div className="col-span-3 flex items-center space-x-3">
                  <button
                    onClick={() => toggleSection(sectionId)}
                    className="hover:bg-gray-600 p-1 rounded transition-colors"
                  >
                    {state.expandedSections[sectionId] ? (
                      <ChevronDown className="size-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="size-4 text-gray-400" />
                    )}
                  </button>
                  <span className="text-white font-medium text-sm">Design</span>
                </div>
                <div className="col-span-2 flex justify-center">
                  <TargetBadge text="Graphic Designers" />
                </div>
                <div className="col-span-2 flex justify-center">
                  <UnifiedBadge value="03" className="bg-blue-500/30 text-white" />
                </div>
                <div className="col-span-2 flex justify-center">
                  <UnifiedBadge value="18" className="bg-pink-600/30 text-white" />
                </div>
                <div className="col-span-3 flex justify-center">
                  <button
                    onClick={handleAddQuestion}
                    className="bg-pink-500 hover:bg-pink-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-200"
                  >
                    Add Question
                  </button>
                </div>
              </div>

              {/* Subtopics */}
              {state.expandedSections[sectionId] && (
                <div className="mt-3 ml-6 space-y-1 rounded-lg bg-gray-800">
                  {designSubtopics.map((subtopic, index) => (
                    <SubtopicRow
                      key={`${sectionId}-${index}`}
                      subtopic={subtopic}
                      onEyeClick={handleEyeClick}
                      onEditClick={handleEditClick}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={state.currentPage}
            totalPages={2}
            onPageChange={handlePageChange}
            maxVisiblePages={2}
          />
        </div>
      </div>

      {/* Modals */}
      <ImportCSVModal
        isOpen={state.isImportModalOpen}
        onClose={handleCloseImportModal}
        onTemplateSelect={handleTemplateSelect}
      />
      <MappedImportModal
        isOpen={state.isMappedModalOpen}
        onClose={handleCloseMappedModal}
        fileType={state.selectedFileType}
      />
      <EditTopicModal
        isOpen={state.isEditTopicModalOpen}
        onClose={handleCloseEditTopicModal}
        topic={state.selectedTopicForEdit}
      />
    </div>
  )
}
