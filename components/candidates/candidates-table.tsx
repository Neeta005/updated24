"use client"
import { useState } from "react"
import { Plus, Eye, Edit3, Trash2 } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { SearchInput } from "@/components/ui/search-input"
import { Pagination } from "@/components/ui/pagination" // import reusable pagination

interface CandidateGroup {
  id: string
  name: string
  category: string
  candidateCount: number
  createdDate: string
}

const candidateGroups: CandidateGroup[] = [
  { id: "1", name: "Python Developers", category: "Coding & Development", candidateCount: 40, createdDate: "09 Aug, 2024" },
  { id: "2", name: "Python Developers", category: "Coding & Development", candidateCount: 38, createdDate: "09 Aug, 2024" },
  { id: "3", name: "Python Developers", category: "Coding & Development", candidateCount: 35, createdDate: "09 Aug, 2024" },
  { id: "4", name: "Python Developers", category: "Coding & Development", candidateCount: 32, createdDate: "09 Aug, 2024" },
  { id: "5", name: "Python Developers", category: "Coding & Development", candidateCount: 42, createdDate: "09 Aug, 2024" },
  { id: "6", name: "Python Developers", category: "Coding & Development", candidateCount: 45, createdDate: "09 Aug, 2024" },
  { id: "7", name: "Python Developers", category: "Coding & Development", candidateCount: 26, createdDate: "09 Aug, 2024" },
  { id: "8", name: "Python Developers", category: "Coding & Development", candidateCount: 48, createdDate: "09 Aug, 2024" },
  { id: "9", name: "Python Developers", category: "Coding & Development", candidateCount: 50, createdDate: "09 Aug, 2024" },
]

interface CandidatesTableProps {
  onClose: () => void
  onViewGroup: (groupId: string) => void
  onEditGroup: (groupId: string) => void
}

export function CandidatesTable({ onClose, onViewGroup, onEditGroup }: CandidatesTableProps) {
  const [activeTab, setActiveTab] = useState("groups")
  const [groupSearch, setGroupSearch] = useState("")
  const [audienceSearch, setAudienceSearch] = useState("")
  const [sortBy, setSortBy] = useState("Latest")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // filter & search logic
  const filteredGroups = candidateGroups.filter(group =>
    group.name.toLowerCase().includes(groupSearch.toLowerCase())
  )

  const sortedGroups = [...filteredGroups].sort((a, b) => {
    if (sortBy === "Latest") return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    if (sortBy === "Oldest") return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
    if (sortBy === "Name") return a.name.localeCompare(b.name)
    return 0
  })

  const totalPages = Math.ceil(sortedGroups.length / itemsPerPage)
  const paginatedGroups = sortedGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <main className="flex-1 p-6 bg-gray-900 min-h-screen">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-semibold text-white">Candidates</h1>
    <div className="flex items-center gap-3">
      <button onClick={onClose} className="text-slate-400 hover:text-white">
        <img src="/icons/Vector (4).png" alt="Close" className="size-6" />
      </button>

      <GradientButton className="flex items-center gap-2" onClick={() => console.log("Create New Group clicked")}>
        <Plus className="size-4" />
        Create New Group
      </GradientButton>
    </div>
  </div>

  {/* Tabs */}
  <div className="w-full bg-slate-800 p-1.5 mb-6 rounded-md">
    <div className="flex gap-2">
      <button
        onClick={() => setActiveTab("groups")}
        className={`flex items-center justify-center min-w-[93px] h-[32px] px-[12px] gap-[10px] rounded-md
          ${activeTab === "groups" ? "bg-gradient-to-b from-[rgba(240,89,33,0.2)] to-[rgba(240,89,33,0)] text-[#F05921] font-semibold" : "bg-transparent text-slate-400 font-semibold hover:text-slate-300"} 
          text-[12px] leading-[18px] font-poppins whitespace-nowrap`}
      >
        All Groups
      </button>

      <button
        onClick={() => setActiveTab("candidates")}
        className={`flex items-center justify-center min-w-[110px] h-[32px] px-[12px] gap-[10px] rounded-md
          ${activeTab === "candidates" ? "bg-gradient-to-b from-[rgba(240,89,33,0.2)] to-[rgba(240,89,33,0)] text-[#F05921] font-semibold" : "bg-transparent text-slate-400 font-semibold hover:text-slate-300"} 
          text-[12px] leading-[18px] font-poppins whitespace-nowrap`}
      >
        All Candidates
      </button>
    </div>
  </div>

  {/* Wrap search, table, pagination into a single div with darker background */}
  <div className="bg-card rounded-lg p-6 shadow-lg">
    {/* Search & Sort */}
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
      <div className="flex gap-4 flex-1">
        <SearchInput
          placeholder="Search Group"
          value={groupSearch}
          onChange={setGroupSearch}
          icon="custom"
          customIcon="/icons/grupp 1.png"
          iconAlt="Group Icon"
          className="w-full sm:w-60"
        />
        <SearchInput
          placeholder="Search Target Audience"
          value={audienceSearch}
          onChange={setAudienceSearch}
          icon="custom"
          customIcon="/icons/audience tarr 1.png"
          iconAlt="Audience Icon"
          className="w-full sm:w-60"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-400">Sort by</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-slate-500"
        >
          <option>Latest</option>
          <option>Oldest</option>
          <option>Name</option>
        </select>
      </div>
    </div>

    {/* Table */}
    <div className="rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-black">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Group Name</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Audience Category</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">No. of Candidates</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Created Date</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y bg-slate-900">
          {paginatedGroups.map((group) => (
            <tr key={group.id} className="hover:bg-slate-700/50">
              <td className="px-6 py-4">
                <span className="text-red-500 hover:text-red-400 cursor-pointer underline">
                  {group.name}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-orange-900/30 border border-orange-600/40 text-orange-400 text-xs rounded-sm font-medium">
                  {group.category}
                </span>
              </td>
              <td className="px-6 py-4 text-white">{group.candidateCount}</td>
              <td className="px-6 py-4 text-slate-300">{group.createdDate}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button className="p-1.5 border border-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 className="size-3 text-red-500" />
                  </button>
                  <button
                    onClick={() => onViewGroup(group.id)}
                    className="p-1.5 border border-white hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Eye className="size-3 text-white" />
                  </button>
                  <button
                    onClick={() => onEditGroup(group.id)}
                    className="p-1.5 border border-orange-500 hover:bg-orange-500/10 rounded-lg transition-colors"
                  >
                    <Edit3 className="size-3 text-orange-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Reusable Pagination */}
    <div className="mt-6">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  </div>
</main>

  )
}
