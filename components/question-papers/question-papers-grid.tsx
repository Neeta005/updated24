"use client"

import { useState } from "react"
import { QuestionPaperCard } from "./question-paper-card"
import { Plus, ChevronDown } from "lucide-react"
import { questionPapers } from "@/data/question-papers"
import { useRouter } from "next/navigation"
import { QUESTION_PAPER_ROUTES } from "@/data/question-papers-pages"
import { GradientButton } from "@/components/ui/gradient-button"
import { SearchInput } from "@/components/ui/search-input" // reusable SearchInput

export function QuestionPapersGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [topicTerm, setTopicTerm] = useState("")
  const [audienceTerm, setAudienceTerm] = useState("")
  const [sortBy, setSortBy] = useState("Latest")
  const router = useRouter()

  const handleEdit = (id: string) => {
    router.push(`${QUESTION_PAPER_ROUTES.create}?id=${encodeURIComponent(id)}`)
  }
  const handleDelete = (id: string) => router.push(`${QUESTION_PAPER_ROUTES.delete}?id=${id}`)
  const handleTogglePublish = (id: string, published: boolean) => {}
  const handleViewQuestions = (id: string) =>
    router.push(`${QUESTION_PAPER_ROUTES.preview}?id=${encodeURIComponent(id)}`)
  const handleCreateQuestionPaper = () => router.push(QUESTION_PAPER_ROUTES.create)

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Question Papers</h1>
        <div className="flex items-center gap-4">
          {/* Table View Button */}
          <button
            type="button"
            onClick={() => router.push(QUESTION_PAPER_ROUTES.table)}
            className="text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors p-2"
          >
            <img src="/icons/image 1.png" alt="Open table view" width={20} height={20} />
          </button>

          {/* Create Question Paper Button */}
          <GradientButton onClick={handleCreateQuestionPaper} className="flex items-center gap-2">
            <Plus size={16} />
            Create Question Papers
          </GradientButton>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Main Search */}
          <SearchInput
            placeholder="Search"
            value={searchTerm}
            onChange={setSearchTerm}
            width="w-40"
            icon="custom"
            customIcon="/icons/subject.png"
            iconAlt="Search Icon"
          />

          {/* Search Topic */}
          <SearchInput
            placeholder="Search Topic"
            value={topicTerm}
            onChange={setTopicTerm}
            className="w-full sm:w-56"
            icon="custom"
            customIcon="/icons/noun-topic-6799098 1.png"
            iconAlt="Topic Icon"
          />

          {/* Search Target Audience */}
          <SearchInput
            placeholder="Search Target Audience"
            value={audienceTerm}
            onChange={setAudienceTerm}
            className="w-full sm:w-56"
            icon="custom"
            customIcon="/icons/audience tarr 1 (1).png"
            iconAlt="Audience Icon"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span className="text-slate-400 text-sm">Sort by</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-secondary border border-white rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-white"
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="Name">High Degree</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>

      {/* Question Paper Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questionPapers.map((paper) => (
          <QuestionPaperCard
            key={paper.id}
            {...paper}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
            onViewQuestions={handleViewQuestions}
          />
        ))}
      </div>
    </div>
  )
}
