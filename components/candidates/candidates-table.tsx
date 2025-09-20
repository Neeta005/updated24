"use client"
import { useState } from "react"
import { Plus } from "lucide-react"

interface CandidateGroup {
  id: string
  name: string
  category: string
  candidateCount: number
  createdDate: string
}

const candidateGroups: CandidateGroup[] = [
  {
    id: "1",
    name: "Python Developers",
    category: "Coding & Development",
    candidateCount: 40,
    createdDate: "09 Aug, 2024",
  },
  {
    id: "2",
    name: "Python Developers",
    category: "Coding & Development",
    candidateCount: 38,
    createdDate: "09 Aug, 2024",
  },
  {
    id: "3",
    name: "Python Developers",
    category: "Coding & Development",
    candidateCount: 35,
    createdDate: "09 Aug, 2024",
  },
  {
    id: "4",
    name: "Python Developers",
    category: "Coding & Development",
    candidateCount: 32,
    createdDate: "09 Aug, 2024",
  },
  {
    id: "5",
    name: "Python Developers",
    category: "Coding & Development",
    candidateCount: 42,
    createdDate: "09 Aug, 2024",
  },
  {
    id: "6",
    name: "Python Developers",
    category: "Coding & Development",
    candidateCount: 45,
    createdDate: "09 Aug, 2024",
  },
  {
    id: "7",
    name: "Python Developers",
    category: "Coding & Development",
    candidateCount: 26,
    createdDate: "09 Aug, 2024",
  },
  {
    id: "8",
    name: "Python Developers",
    category: "Coding & Development",
    candidateCount: 48,
    createdDate: "09 Aug, 2024",
  },
  {
    id: "9",
    name: "Python Developers",
    category: "Coding & Development",
    candidateCount: 50,
    createdDate: "09 Aug, 2024",
  },
]

interface CandidatesTableProps {
  onClose: () => void
  onViewGroup: (groupId: string) => void
  onEditGroup: (groupId: string) => void
}

export function CandidatesTable({ onClose, onViewGroup, onEditGroup }: CandidatesTableProps) {
  const [activeTab, setActiveTab] = useState("groups")

  return (
    <main className="flex-1 p-6 bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Candidates</h1>
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <img src="\icons\image 1.png" alt="Menu" className="size-8" />
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus className="size-4" />
            Create New Group
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full bg-slate-800 p-1.5 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("groups")}
            className={`flex items-center justify-center min-w-[93px] h-[32px] px-[12px] gap-[10px] rounded-md
              ${
                activeTab === "groups"
                  ? "bg-gradient-to-b from-[rgba(240,89,33,0.2)] to-[rgba(240,89,33,0)] text-[#F05921] font-semibold"
                  : "bg-transparent text-slate-400 font-semibold hover:text-slate-300"
              } 
              text-[12px] leading-[18px] font-poppins whitespace-nowrap`}
          >
            All Groups
          </button>

          <button
            onClick={() => setActiveTab("candidates")}
            className={`flex items-center justify-center min-w-[110px] h-[32px] px-[12px] gap-[10px] rounded-md
              ${
                activeTab === "candidates"
                  ? "bg-gradient-to-b from-[rgba(240,89,33,0.2)] to-[rgba(240,89,33,0)] text-[#F05921] font-semibold"
                  : "bg-transparent text-slate-400 font-semibold hover:text-slate-300"
              } 
              text-[12px] leading-[18px] font-poppins whitespace-nowrap`}
          >
            All Candidates
          </button>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="\icons\grupp 1.png"
              alt="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search Group"
              className="w-50 pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-slate-500 text-sm"
            />
          </div>
          <div className="relative">
            <img
              src="\icons\audience tarr 1.png"
              alt="Target"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search Target Audience"
              className="w-50 pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-slate-500 text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">Sort by</span>
          <select className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-slate-500">
            <option>Latest</option>
            <option>Oldest</option>
            <option>Name</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Group Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Audience Category</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">No. of Candidates</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Created Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {candidateGroups.map((group) => (
              <tr key={group.id} className="hover:bg-slate-700/50">
                <td className="px-6 py-4">
                  <span className="text-orange-400 hover:text-orange-300 cursor-pointer">{group.name}</span>
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
                    <button
                      onClick={() => onViewGroup(group.id)}
                      className="p-2 text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onEditGroup(group.id)}
                      className="p-2 text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 rounded-lg transition-colors">
                      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
          ← Prev
        </button>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg">1</button>
          <button className="w-8 h-8 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
            2
          </button>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition-opacity">
          Next →
        </button>
      </div>
    </main>
  )
}
