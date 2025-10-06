"use client"
import { useState } from "react"
import { candidateGroups } from "@/data/candidates"
import { gradientButtonStyle } from "@/data/syllabus"
import { CandidatesTable } from "./candidates-table"
import { GroupView } from "./group-view"
import { GroupEdit } from "./group-edit"

export function CandidatesMain() {
  const [activeTab, setActiveTab] = useState("groups")
  const [currentView, setCurrentView] = useState<"main" | "table" | "view" | "edit">("main")
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)

  const handleMenuClick = () => {
    setCurrentView("table")
  }

  const handleViewGroup = (groupId: string) => {
    setSelectedGroupId(groupId)
    setCurrentView("view")
  }

  const handleEditGroup = (groupId: string) => {
    setSelectedGroupId(groupId)
    setCurrentView("edit")
  }

  const handleBackToMain = () => {
    setCurrentView("main")
    setSelectedGroupId(null)
  }

  const handleBackToTable = () => {
    setCurrentView("table")
  }

  const handleSave = () => {
    // Handle save logic here
    setCurrentView("view")
  }

  if (currentView === "table") {
    return <CandidatesTable onClose={handleBackToMain} onViewGroup={handleViewGroup} onEditGroup={handleEditGroup} />
  }

  if (currentView === "view") {
    return <GroupView onBack={handleBackToTable} onEdit={() => setCurrentView("edit")} />
  }

  if (currentView === "edit") {
    return <GroupEdit onBack={() => setCurrentView("view")} onSave={handleSave} />
  }

  return (
    <main className="flex-1 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Candidates</h1>
        <div className="flex items-center gap-3">
          <button onClick={handleMenuClick}>
            <img src="\icons\image 1.png" alt="Menu" className="size-8" />
          </button>

          <button
            className={`px-4 py-2 bg-orange-600 ${gradientButtonStyle} hover:bg-orange-700 text-white rounded-lg text-sm font-medium`}
          >
            + Create New Group
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

      {/* Search and Sort Controls */}
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
          <div className="relative">
            <select className="appearance-none bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm pr-10 focus:outline-none focus:border-slate-500">
              <option>Latest</option>
              <option>Oldest</option>
              <option>Name</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="size-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidateGroups.map((group) => (
          <div key={group.id} className="bg-card rounded-2xl border border-slate-600/50 p-5 relative flex flex-col">
            {/* Action buttons */}
            <div className="absolute top-5 right-5 flex items-center gap-2">
              <button
                onClick={() => handleEditGroup(group.id)}
                className="flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <img src="\icons\Frame 1618874043 (1).png" alt="Edit" className="size-8" />
              </button>
              <button className="flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                <img src="\icons\Frame 1618874044.png" alt="Delete" className="size-11" />
              </button>
            </div>

            {/* Card content */}
            <div className="flex-1 flex flex-col justify-between mt-2">
              {/* Top content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white pr-16">{group.name}</h3>
                <span className="inline-block px-3 py-1 bg-orange-900/30 border border-orange-600/40 text-orange-400 text-xs rounded-sm font-medium">
                  {group.category}
                </span>
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mt-2">{group.description}</p>
              </div>

              {/* Bottom content: Candidate count + Date + View button */}
              <div className="mt-4 space-y-2">
                <div className="text-center text-white font-medium text-base">{group.count} Candidates</div>
                <div className="text-right text-slate-400 text-sm mt-2">Date Created: {group.createdAt}</div>
                <button
                  onClick={() => handleViewGroup(group.id)}
                  className={`${gradientButtonStyle} mt-2 w-full py-3 text-white rounded-lg font-medium transition-all duration-200 text-base`}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
