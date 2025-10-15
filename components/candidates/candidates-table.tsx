
"use client"

import { useState, useEffect } from "react"
import { Plus, Eye, Edit3, Trash2 } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { SearchInput } from "@/components/ui/search-input"
import { Pagination } from "@/components/ui/pagination"
import { useRouter, useSearchParams } from "next/navigation"
import { candidateGroups, allCandidatesTable, type CandidateWithGroup } from "@/data/candidates"
import EditCandidateModal from "@/components/candidates/edit-candidate-modal"
import Image from "next/image"

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
  const itemsPerPageCandidates = 10
  const router = useRouter()
  const searchParams = useSearchParams()

  const [editOpen, setEditOpen] = useState(false)
  const [editingCandidate, setEditingCandidate] = useState<CandidateWithGroup | null>(null)

  // 🔍 Filter & Sort
  const filteredGroups = candidateGroups.filter((group) =>
    group.name.toLowerCase().includes(groupSearch.toLowerCase()),
  )

  const sortedGroups = [...filteredGroups].sort((a, b) => {
    if (sortBy === "Latest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    if (sortBy === "Oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    if (sortBy === "Name") return a.name.localeCompare(b.name)
    return 0
  })

  const totalPages = Math.ceil(sortedGroups.length / itemsPerPage)
  const paginatedGroups = sortedGroups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const [nameSearch, setNameSearch] = useState("")
  const [emailSearch, setEmailSearch] = useState("")
  const [phoneSearch, setPhoneSearch] = useState("")

  const filteredCandidates: CandidateWithGroup[] = allCandidatesTable.filter((c) => {
    const nameOk = c.name.toLowerCase().includes(nameSearch.toLowerCase())
    const emailOk = c.email.toLowerCase().includes(emailSearch.toLowerCase())
    const phoneOk = c.phone.toLowerCase().includes(phoneSearch.toLowerCase())
    return nameOk && emailOk && phoneOk
  })

  const totalPagesCandidates = Math.ceil(filteredCandidates.length / itemsPerPageCandidates)
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPageCandidates,
    currentPage * itemsPerPageCandidates,
  )

  // Initialize tab from URL
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "groups" || tab === "candidates") {
      setActiveTab(tab)
      setCurrentPage(1)
    }
  }, [searchParams])

  // Handle ?edit= param
  useEffect(() => {
    const editId = searchParams.get("edit")
    if (editId) {
      setActiveTab("candidates")
      const match = allCandidatesTable.find((c) => c.id === editId) || null
      setEditingCandidate(match)
      setEditOpen(Boolean(match))
    } else {
      setEditOpen(false)
      setEditingCandidate(null)
    }
  }, [searchParams])

  return (
    <main className="flex-1 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Candidates</h1>
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <img src="/icons/Vector (4).png" alt="Close" className="size-6" />
          </button>

          {activeTab === "candidates" ? (
            <>
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-white text-gray-900 text-sm font-medium border border-slate-300 hover:bg-gray-100"
                onClick={() => router.push("/candidates/import")}
              >
                <Image src="/icons/import (1).png" alt="Import Icon" width={18} height={18} />
                Import List
              </button>

              <GradientButton
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium"
                onClick={() => {
                  /* Export logic */
                }}
              >
                <Image src="/icons/folder-2.png" alt="Export Icon" width={18} height={18} />
                Export List
              </GradientButton>
            </>
          ) : (
            <GradientButton className="flex items-center gap-2" onClick={() => router.push("/candidates/create")}>
              <Plus className="size-4" />
              Create New Group
            </GradientButton>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full bg-slate-800 p-1.5 mb-6 rounded-md">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setActiveTab("groups")
              setCurrentPage(1)
              router.replace("/candidates/table?tab=groups")
            }}
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
            onClick={() => {
              setActiveTab("candidates")
              setCurrentPage(1)
              router.replace("/candidates/table?tab=candidates")
            }}
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

      {/* Content */}
      {activeTab === "groups" ? (
        <div className="bg-card rounded-lg p-6 shadow-lg">
          {/* Search + Sort */}
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

          {/* Groups Table */}
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
                  <tr
                    key={group.id}
                    className="hover:bg-slate-700/50 cursor-pointer"
                    onClick={() => onViewGroup(group.id)}
                  >
                    <td className="px-6 py-4 text-white">{group.name}</td>
                    <td className="px-6 py-4 text-slate-300">{group.category}</td>
                    <td className="px-6 py-4 text-white">{group.count}</td>
                    <td className="px-6 py-4 text-slate-300">{group.createdAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // delete logic
                          }}
                          className="p-1.5 border border-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="size-3 text-red-500" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onViewGroup(group.id)
                          }}
                          className="p-1.5 border border-white hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <Eye className="size-3 text-white" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onEditGroup(group.id)
                          }}
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

          <div className="mt-6">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-lg p-6 shadow-lg">
          {/* Candidate search */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
            <div className="flex gap-4 flex-1">
              <SearchInput
                placeholder="Search Candidate"
                value={nameSearch}
                onChange={setNameSearch}
                icon="custom"
                customIcon="/icons/grupp 1.png"
                iconAlt="Candidate"
                className="w-full sm:w-60"
              />
              <SearchInput
                placeholder="Search Email"
                value={emailSearch}
                onChange={setEmailSearch}
                icon="custom"
                customIcon="/icons/audience tarr 1.png"
                iconAlt="Email"
                className="w-full sm:w-60"
              />
              <SearchInput
                placeholder="Search Phone"
                value={phoneSearch}
                onChange={setPhoneSearch}
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

          {/* Candidates Table */}
          <div className="rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-black">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Candidate Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Group</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y bg-slate-900">
                {paginatedCandidates.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-700/50 cursor-pointer"
                    onClick={() => router.push(`/candidates/view/${c.id}`)}
                  >
                    <td className="px-6 py-4 text-white">{c.name}</td>
                    <td className="px-6 py-4 text-slate-300">{c.email}</td>
                    <td className="px-6 py-4 text-slate-300">{c.phone}</td>
                    <td className="px-6 py-4 text-slate-300">{c.group}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          c.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-300"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // delete logic
                          }}
                          className="p-1.5 border border-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="size-3 text-red-500" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/candidates/table?tab=candidates&edit=${c.id}`)
                          }}
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

          <div className="mt-6">
            <Pagination currentPage={currentPage} totalPages={totalPagesCandidates} onPageChange={setCurrentPage} />
          </div>
        </div>
      )}

      {/* Edit Candidate Modal */}
      <EditCandidateModal
        open={editOpen}
        onOpenChange={(isOpen) => {
          setEditOpen(isOpen)
          if (!isOpen) {
            const params = new URLSearchParams(searchParams.toString())
            params.delete("edit")
            if (!params.get("tab")) params.set("tab", "candidates")
            router.replace(`/candidates/table?${params.toString()}`)
          }
        }}
        candidate={editingCandidate}
        onSave={(updated) => {
        }}
      />
    </main>
  )
}
