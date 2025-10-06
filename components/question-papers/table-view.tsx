"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronDown, Plus } from "lucide-react"
import { DataTable } from "@/components/tables/data-table"
import type { Column } from "@/components/tables/data-table"
import { questionPapers } from "@/data/question-papers"
import { Tag } from "@/components/ui/tag"
import { StatusBadge } from "@/components/ui/status-badge"
import { QUESTION_PAPER_ROUTES } from "@/data/question-papers-pages"
import { Pagination } from "@/components/ui/pagination" // Import the pagination component

type QuestionPaperRow = (typeof questionPapers)[number]

export default function TableView() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [searchSubject, setSearchSubject] = useState("")
  const [searchAudience, setSearchAudience] = useState("")
  const [showDraft, setShowDraft] = useState(false)
  const [sortBy, setSortBy] = useState("Latest")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Reduced for testing

  const filtered = useMemo(() => {
    let list = questionPapers.filter((p) => {
      const matchesTitle = p.title.toLowerCase().includes(search.toLowerCase())
      const matchesSubject =
        searchSubject.trim().length === 0 ||
        p.tags.some((t) => t.name.toLowerCase().includes(searchSubject.toLowerCase()))
      const matchesAudience =
        searchAudience.trim().length === 0 ||
        p.targetAudience.toLowerCase().includes(searchAudience.toLowerCase())
      const matchesDraft = showDraft ? !p.isPublished : true
      return matchesTitle && matchesSubject && matchesAudience && matchesDraft
    })

    if (sortBy === "Latest") list = [...list].sort((a, b) => Number(b.id) - Number(a.id))
    else if (sortBy === "Oldest") list = [...list].sort((a, b) => Number(a.id) - Number(b.id))
    else if (sortBy === "Name") list = [...list].sort((a, b) => a.title.localeCompare(b.title))

    return list
  }, [search, searchSubject, searchAudience, showDraft, sortBy])

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
  }, [filtered, currentPage, itemsPerPage])

  // Calculate total pages
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of table when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const columns: Column<QuestionPaperRow>[] = [
    { key: "title", header: "Title", className: "text-white", headerClassName: "text-white" },
    {
      key: "tags",
      header: "Subject",
      render: (_v, row) => (
        <div className="flex flex-wrap gap-2">
          {row.tags.map((t, i) => (
            <Tag key={i} variant={t.variant} className="text-xs px-2 py-0.5">
              {t.name}
            </Tag>
          ))}
        </div>
      ),
      className: "text-white",
      headerClassName: "text-white",
    },
    {
      key: "questionCount",
      header: "Total Question",
      render: (value) => (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-white">
          {value}
        </span>
      ),
      className: "text-white",
      headerClassName: "text-white",
    },
    {
      key: "marks",
      header: "Total Marks",
      render: (value) => (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-white">
          {value}
        </span>
      ),
      className: "text-white",
      headerClassName: "text-white",
    },
    {
      key: "targetAudience",
      header: "Target Audience",
      className: "text-slate-300",
      headerClassName: "text-white",
    },
    {
      key: "isPublished",
      header: "Status",
      render: (_v, row) => <StatusBadge status={row.isPublished ? "published" : "unpublished"} />,
      className: "text-white",
      headerClassName: "text-white",
    },
    {
      key: "actions",
      header: "Actions",
      render: (_v, row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              router.push(`${QUESTION_PAPER_ROUTES.delete}?id=${row.id}`)
            }}
            className="rounded-full px-2.5 py-1 text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            •••
          </button>
        </div>
      ),
      className: "text-right",
      headerClassName: "text-right text-white",
    },
  ]

  return (
    <main className="flex-1 p-6">
      <div className="rounded-2xl bg-card border border-slate-700 p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-semibold">Question Papers</h1>

          <div className="flex items-center gap-2">
            {/* Custom icon from /public/icons */}
            <img
              src="\icons\material-symbols-light_table.png"
              alt="Paper Icon"
              className="w-6 h-6"
            />

            <button
              onClick={() => router.push(QUESTION_PAPER_ROUTES.create)}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-primary to-red-primary text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={16} />
              Create Question Papers
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Subject"
                className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-white rounded-full text-white placeholder-slate-300 focus:outline-none focus:border-white"
              />
            </div>
            <input
              value={searchSubject}
              onChange={(e) => setSearchSubject(e.target.value)}
              placeholder="Search Topic"
              className="w-full px-4 py-2.5 bg-secondary border border-white rounded-full text-white placeholder-slate-300 focus:outline-none focus:border-white"
            />
            <input
              value={searchAudience}
              onChange={(e) => setSearchAudience(e.target.value)}
              placeholder="Search Target Audience"
              className="w-full px-4 py-2.5 bg-secondary border border-white rounded-full text-white placeholder-slate-300 focus:outline-none focus:border-white"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Show Draft:</span>
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showDraft}
                onChange={(e) => setShowDraft(e.target.checked)}
              />
              <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-slate-600 peer-checked:bg-green-500 transition-colors">
                <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
              </span>
            </label>

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
                  <option value="Name">Name</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <DataTable
          data={paginatedData}
          columns={columns}
          className="border border-slate-700 bg-slate-900/40 table-fixed w-full"
          headerClassName="bg-black text-white text-left px-4 py-3"
          rowClassName="text-slate-300 px-4 py-3 align-middle"
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              maxVisiblePages={5}
            />
          </div>
        )}
      </div>
    </main>
  )
}
