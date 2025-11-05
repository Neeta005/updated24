"use client"

import { ExamCard } from "./exam-card"
import type { ExamItem } from "@/data/candidate-dashboard"

interface TabsSectionProps {
  activeTab: "today" | "upcoming" | "completed"
  onTabChange: (tab: "today" | "upcoming" | "completed") => void
  exams: ExamItem[]
}

export function TabsSection({ activeTab, onTabChange, exams }: TabsSectionProps) {
  const tabs = [
    { id: "today", label: "Today" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ]

  return (
    <div className="bg-card backdrop-blur-sm rounded-xl border border-slate-700 p-6">
      {/* Tabs inside the card */}
      <div className="flex gap-2 bg-slate-900/50 p-1 rounded-lg w-fit mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as "today" | "upcoming" | "completed")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Header with See All */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-base font-semibold">Today Exams</h3>
        <button className="text-red-400 hover:text-red-300 text-xs font-medium">See All</button>
      </div>

      {/* Exam Cards */}
      <div className="space-y-4">
        {exams.length > 0 ? (
          exams.map((exam) => <ExamCard key={exam.id} exam={exam} />)
        ) : (
          <div className="text-center py-12 text-gray-400 text-sm">No exams in this category</div>
        )}
      </div>
    </div>
  )
}

