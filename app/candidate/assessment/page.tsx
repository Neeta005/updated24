"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TodayTab } from "@/components/candidate/assessment-today-tab"
import { UpcomingTab } from "@/components/candidate/assessment-upcoming-tab"
import { CompletedTab } from "@/components/candidate/assessment-completed-tab"
import { GradientButton } from "@/components/ui/gradient-button"

interface AssessmentCardProps {
  title: string
  tags: string[]
  date: string
  time: string
  duration: string
  status: string
}

function AssessmentCard({ title, tags, date, time, duration, status }: AssessmentCardProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border-l-4 border-l-orange-500">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-slate-600 rounded-full text-xs text-slate-300 hover:border-orange-500 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-xs font-medium border ${
            status === "Not Assessed"
              ? "border-red-500/30 bg-red-500/10 text-red-400"
              : "border-green-500/30 bg-green-500/10 text-green-400"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="flex items-center gap-8 text-sm text-slate-400 mb-4">
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>Schedule</span>
          <span className="text-white font-medium">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🕐</span>
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⏱️</span>
          <span>Duration</span>
          <span className="text-white font-medium">{duration}</span>
        </div>
      </div>

      <div className="text-right">
        <a href="#" className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
          View Syllabus →
        </a>
      </div>
    </div>
  )
}

export default function AssessmentPage() {
  const [activeTab, setActiveTab] = useState<"today" | "upcoming" | "completed">("today")
  const router = useRouter()

  const renderTabContent = () => {
    switch (activeTab) {
      case "today":
        return <TodayTab />
      case "upcoming":
        return <UpcomingTab />
      case "completed":
        return <CompletedTab />
      default:
        return <TodayTab />
    }
  }

  const handleScheduleExam = () => {
    router.push("/exams")
  }

  return (
    <div className="min-h-screen bg-slate-900  sm:px-6 lg:px-8 ">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Schedule Assessment</h1>
          </div>
          <GradientButton size="md" onClick={handleScheduleExam}>
            Schedule Exam
          </GradientButton>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {(["today", "upcoming", "completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-300 shadow-md ${
                activeTab === tab
                  ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white scale-[1.03]"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  )
}
