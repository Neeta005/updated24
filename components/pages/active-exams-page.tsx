"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { activeExams, upcomingExams, completedExams } from "@/data/activeexam"
import { ExamCard } from "@/components/ui/exam-card"

export function ActiveExamsPage() {
  const [activeTab, setActiveTab] = useState("Active")

  const tabs = ["Active", "Upcoming", "Completed"]

  const getCurrentExams = () => {
    switch (activeTab) {
      case "Active":
        return activeExams
      case "Upcoming":
        return upcomingExams
      case "Completed":
        return completedExams
      default:
        return activeExams
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-white text-green-600"
      case "Upcoming":
        return "bg-sky-100 text-blue-900"
      case "Completed":
        return "bg-gray-300 text-gray-600"
      default:
        return "bg-white text-gray-800"
    }
  }

  return (
    <div className="mx-auto sm:px-2 lg:px-2">
      <div className="bg-card rounded-xl p-4 sm:p-6 border border-gray-700">
        {/* Header with Back Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-white text-xl sm:text-2xl font-semibold">Active / Upcoming Exams</h1>
          <Link href="/dashboard">
            <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap">
              <ChevronLeft size={16} />
              Back
            </button>
          </Link>
        </div>

   <div className="mb-6 sm:mb-8 w-full bg-slate-800 rounded-lg px-4 py-1">
  <div className="flex space-x-0 justify-start">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`font-medium transition-colors rounded-md ${
          activeTab === tab
            ? "bg-gray-700 text-orange-500 px-5 py-2" // slightly smaller box
            : "text-gray-400 hover:text-white px-6 py-3"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
</div>


        <div className="space-y-4">
          {getCurrentExams().map((exam) => (
            <ExamCard
              key={exam.id}
              id={exam.id}
              title={exam.title}
              date={exam.date}
              time={exam.time}
              status={exam.status}
              badgeClass={getStatusBadge(exam.status)}
              info={exam.info}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
