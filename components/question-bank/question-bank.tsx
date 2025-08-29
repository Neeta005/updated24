"use client"

import React, { useState, useMemo } from "react"
import { ChevronDown, ChevronRight, Plus, Filter, Eye, Edit3, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { ImportCSVModal } from "@/components/modals/import-csv-modal"
import { MappedImportModal } from "@/components/modals/mapped-import-modal"
import { QuestionSection } from "@/components/question-section/question-section"
import { UnifiedBadge } from "@/components/ui/unified-badge"
import { EditTopicModal } from "@/components/modals/edit-topic-modal"
import { QuestionBankHeader } from "./question-bank-header"
import { gradientButtonStyle } from "@/data/syllabus"

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
}

const TargetBadge = React.memo(({ text }: { text: string }) => (
  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-gray-500 rounded-full">
    {text}
  </span>
))
TargetBadge.displayName = "TargetBadge"

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
    <div className="grid grid-cols-12 gap-6 items-center py-2 px-3 bg-gray-900 rounded-lg">
      <div className="col-span-3 flex items-center space-x-2">
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 ml-1"></div>
        <span className="text-gray-300 font-medium text-sm">{subtopic.name}</span>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2">
        <UnifiedBadge value="01" variant="primary" />
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-3 flex items-center space-x-2">
        <button className="p-1.5 border border-orange-500 rounded-lg transition-colors hover:bg-orange-500/10">
          <Trash2 className="size-3 text-orange-500" />
        </button>
        <button
          onClick={() => onEyeClick(subtopic.name)}
          className="p-1.5 border border-white hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Eye className="size-3 text-white" />
        </button>
        <button
          onClick={() => onEditClick(subtopic.name)}
          className="p-1.5 border border-red-500 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Edit3 className="size-3 text-red-500" />
        </button>
      </div>
    </div>
  ),
)
SubtopicRow.displayName = "SubtopicRow"

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

  const handleImportCSV = () => {
    setState((prev) => ({ ...prev, isImportModalOpen: true }))
  }

  const handleCloseImportModal = () => {
    setState((prev) => ({ ...prev, isImportModalOpen: false }))
  }

  const handleTemplateSelect = (type: "xls" | "csv" | "google-sheet") => {
    setState((prev) => ({
      ...prev,
      selectedFileType: type,
      isImportModalOpen: false,
      isMappedModalOpen: true,
    }))
  }

  const handleCloseMappedModal = () => {
    setState((prev) => ({
      ...prev,
      isMappedModalOpen: false,
      selectedFileType: null,
    }))
  }

  const handleEyeClick = (topicName: string) => {
    setState((prev) => ({
      ...prev,
      selectedTopic: topicName,
      showQuestionSection: true,
    }))
  }

  const handleEditClick = (topicName: string) => {
    setState((prev) => ({
      ...prev,
      selectedTopicForEdit: {
        subject: "Design",
        name: topicName,
        description: "",
      },
      isEditTopicModalOpen: true,
    }))
  }

  const handleCloseEditTopicModal = () => {
    setState((prev) => ({
      ...prev,
      isEditTopicModalOpen: false,
      selectedTopicForEdit: null,
    }))
  }

  const handleBackFromQuestionSection = () => {
    setState((prev) => ({
      ...prev,
      showQuestionSection: false,
      selectedTopic: "",
    }))
  }

  if (state.showQuestionSection) {
    return <QuestionSection topicName={state.selectedTopic} onBack={handleBackFromQuestionSection} />
  }

  return (
    <div className="flex-1 p-4 bg-background min-h-screen">
      <div className="bg-card rounded-xl p-5 ">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Question Bank</h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium text-sm transition-colors">
              Back
            </button>
            <button
              onClick={handleImportCSV}
              className={`flex items-center justify-center px-4 py-2 gap-2 ${gradientButtonStyle} rounded-md text-white font-semibold text-sm shadow-md transition-all duration-200`}
            >
              <Plus className="size-4 text-white" />
              <span>Import CSV</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 w-96 text-sm transition-colors"
            />
          </div>
          <div className="flex items-center space-x-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700 transition-colors">
            <Filter className="size-4 text-gray-400" />
            <span className="text-gray-300 text-sm font-medium">Filter By</span>
            <ChevronDown className="size-4 text-gray-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
          <QuestionBankHeader />

          {Object.keys(state.expandedSections).map((sectionId, idx) => (
            <div
              key={sectionId}
              className="px-6 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
            >
              <div className="grid grid-cols-12 gap-6 items-center">
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
                <div className="col-span-2">
                  <TargetBadge text="Graphic Designers" />
                </div>
                <div className="col-span-2">
                  <UnifiedBadge value="03" variant="primary" />
                </div>
                <div className="col-span-2">
                  <UnifiedBadge value="18" variant="danger" />
                </div>
                <div className="col-span-3">
                  <button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-1.5 rounded-lg text-sm transition-colors font-semibold">
                    Add Question
                  </button>
                </div>
              </div>

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
      </div>

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
