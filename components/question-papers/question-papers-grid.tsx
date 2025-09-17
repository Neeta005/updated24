"use client"

import { useState } from "react"
import { QuestionPaperCard } from "./question-paper-card"
import { Search, Plus, ChevronDown } from "lucide-react"
import { questionPapers } from "@/data/question-papers" // <-- import your data
import { useRouter } from "next/navigation"
// centralize routes
import { QUESTION_PAPER_ROUTES } from "@/data/question-papers-pages"

export function QuestionPapersGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Latest")
  const router = useRouter()

  const handleEdit = (id: string) => {}

  const handleDelete = (id: string) => {
    router.push(`${QUESTION_PAPER_ROUTES.delete}?id=${id}`)
  }

  const handleTogglePublish = (id: string, published: boolean) => {}

  const handleViewQuestions = (id: string) => {
    // Optionally include id in querystring for future use
    router.push(`${QUESTION_PAPER_ROUTES.preview}?id=${encodeURIComponent(id)}`)
  }

  const handleCreateQuestionPaper = () => {
    router.push(QUESTION_PAPER_ROUTES.create)
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
        <h1 className="text-2xl font-bold text-white">Question Papers</h1>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push(QUESTION_PAPER_ROUTES.table)}
            className=" text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <img src="/icons/image 1.png" alt="Open table view" width={20} height={20} />
          </button>

          <button
            onClick={handleCreateQuestionPaper}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-primary to-red-primary text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={16} />
            Create Question Papers
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full">
      <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* Main Search */}
              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-900 border border-gray-700 rounded-full pl-10 pr-4 py-2 
                           text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 
                           focus:ring-2 focus:ring-purple-500/30 w-full text-sm transition-all duration-200"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"
                  />
                </svg>
              </div>

              {/* Search Topic */}
              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  placeholder="Search Topic"
                  className="bg-gray-900 border border-gray-700 rounded-full px-4 py-2 
                           text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 
                           focus:ring-2 focus:ring-purple-500/30 w-full text-sm transition-all duration-200"
                />
              </div>

              {/* Search Target Audience */}
              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  placeholder="Search Target Audience"
                  className="bg-gray-900 border border-gray-700 rounded-full px-4 py-2 
                           text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 
                           focus:ring-2 focus:ring-purple-500/30 w-full text-sm transition-all duration-200"
                />
              </div>
            </div>
        <div className="flex items-center gap-2">
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>

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
