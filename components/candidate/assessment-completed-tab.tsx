"use client"

import React, { useState } from "react"
import { Pagination } from "@/components/ui/pagination"

interface AssessmentCardProps {
  title: string
  tags: string[]
  date: string
  time: string
  duration: string
}

function UpcomingAssessmentCard({ title, tags, date, time, duration }: AssessmentCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 border-l-4 border-l-orange-500">
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
        <button className="px-6 py-2 border border-green-500 text-green-400 rounded-full text-sm font-medium hover:bg-green-500/10 transition-colors">
          Take Assessment
        </button>
      </div>

      <div className="flex items-center gap-8 text-sm text-slate-400">
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

      <div className="text-right mt-4">
        <a
          href="#"
          className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
        >
          View Syllabus →
        </a>
      </div>
    </div>
  )
}

interface ExamBoardRow {
  examName: string
  course: string
  date: string
  dueDate: string
  time: string
  seatedTime?: string
  status: string
}

function ExamBoardTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 2 // Example only — adjust for real data

  const exams: ExamBoardRow[] = [
    { examName: "Graphic Design Fundamentals", course: "ART101", date: "Jan 25, 2024", dueDate: "Jan 25, 2024", time: "10:00 AM", seatedTime: "-", status: "Completed" },
    { examName: "Digital Illustration", course: "ART101", date: "Feb 5, 2024", dueDate: "Feb 5, 2024", time: "10:00 AM", seatedTime: "-", status: "Completed" },
    { examName: "UX/UI Design Principles", course: "ART101", date: "Mar 10, 2024", dueDate: "Mar 10, 2024", time: "10:00 AM", seatedTime: "-", status: "Completed" },
    { examName: "History of Design Essay", course: "ART101", date: "Apr 2, 2024", dueDate: "Apr 2, 2024", time: "10:00 AM", seatedTime: "-", status: "Completed" },
    { examName: "Product Design Prototype", course: "ART101", date: "May 15, 2024", dueDate: "May 15, 2024", time: "10:00 AM", seatedTime: "-", status: "Completed" },
    { examName: "Color Theory and Application", course: "ART101", date: "June 8, 2024", dueDate: "June 8, 2024", time: "10:00 AM", seatedTime: "-", status: "Completed" },
    { examName: "Visual Communication Design", course: "ART101", date: "Nov 20, 2024", dueDate: "Nov 20, 2024", time: "10:00 AM", seatedTime: "-", status: "Completed" },
  ]

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <div className="border border-slate-700 rounded-xl p-6  bg-card">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg font-semibold">Exam Board</h2>
        <a href="#" className="text-orange-500 hover:text-orange-400 text-sm font-medium">
          View All
        </a>
      </div>

      <div className="bg-slate-800/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-black">
                {["Exam Name", "Course", "Date", "Due Date", "Time", "Seated Time", "Status"].map(
                  (header, index) => (
                    <th
                      key={index}
                      className="text-left py-4 px-6 text-slate-300 font-medium text-sm"
                    >
                      {header} <span className="ml-2 text-slate-600 text-xs">⇅</span>
                    </th>
                  )
                )}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors"
                >
                  <td className="py-4 px-6 text-white text-sm font-medium">{exam.examName}</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">{exam.course}</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">{exam.date}</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">{exam.dueDate}</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">{exam.time}</td>
                  <td className="py-4 px-6 text-slate-300 text-sm">{exam.seatedTime}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 border border-blue-500/40 bg-blue-500/10 text-blue-300 rounded text-xs font-medium">
                      {exam.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-slate-400 hover:text-white transition-colors text-lg">
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Reusable Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxVisiblePages={2}
      />
    </div>
  )
}

export function CompletedTab() {
  return (
    <div className="space-y-8">
      {/* Upcoming Assessment Cards */}
      <UpcomingAssessmentCard
        title="Fundamentals of Programming"
        tags={["UI/UX Design", "Web Dev", "Artificial Intelligence", "Data Analysis"]}
        date="12-01-2023"
        time="9:40 PM"
        duration="2 Hours"
      />
      <UpcomingAssessmentCard
        title="Advanced JavaScript"
        tags={["Frontend", "React", "TypeScript"]}
        date="15-01-2023"
        time="11:00 AM"
        duration="3 Hours"
      />

      {/* Exam Board Table */}
      <ExamBoardTable />
    </div>
  )
}
