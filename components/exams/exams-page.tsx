"use client"

import { useState } from "react"
import { GradientButton } from "@/components/ui/gradient-button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ScheduledExamTab } from "./scheduled-exam-tab"
import { HistoryTab } from "./history-tab"
import { ScheduleNewExamForm } from "./schedule-new-exam-form"
import type { Exam } from "@/types/exam"

const examData: Exam[] = [
  {
    id: "1",
    title: "Articulate structure of C++ and Java in Semester 1",
    course: "B.Tech Specialization in Health Informatics",
    subject: "Network Engineering",
    date: "3-01-2023",
    time: "12:30 AM - 01:40 PM",
    marks: 50,
    passingPercentage: 70,
  },
]

export function ExamsPage() {
  const [activeTab, setActiveTab] = useState<"scheduled" | "history">("scheduled")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredExams = examData.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-slate-900 pt-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScheduleNewExamForm onClose={() => setShowCreateForm(false)} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-8 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-bold text-white">Exams</h1>
          <GradientButton size="md" onClick={() => setShowCreateForm(true)}>
            + Create Exam
          </GradientButton>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div className="flex gap-8">
            {(["scheduled", "history"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 font-medium text-lg transition-colors ${
                  activeTab === tab
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                {tab === "scheduled" ? "Scheduled Exam" : "History"}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 pl-4 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
        </div>

        {activeTab === "scheduled" ? <ScheduledExamTab exams={filteredExams} /> : <HistoryTab exams={filteredExams} />}
      </div>
    </div>
  )
}
