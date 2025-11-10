"use client"

import type { Exam } from "@/types/exam"

interface ScheduledExamTabProps {
  exams: Exam[]
}

export function ScheduledExamTab({ exams }: ScheduledExamTabProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.map((exam) => (
        <div
          key={exam.id}
          className="bg-card rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all shadow-md flex flex-col hover:scale-[1.02]"
        >
          {/* Header */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
              {exam.title}
            </h3>
            <p className="text-slate-400 text-sm">Course: {exam.course}</p>
            <p className="text-slate-400 text-sm mb-3">Subject: {exam.subject}</p>

            <div className="text-slate-300 text-sm space-y-1 mb-3">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{exam.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🕐</span>
                <span>{exam.time}</span>
              </div>
            </div>
          </div>

          {/* Marks & Progress */}
          <div>
            <p className="text-slate-400 text-sm mb-1">
              Marks: <span className="text-white font-medium">{exam.marks}</span>
            </p>
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-400 text-sm">Passing %</span>
              <span className="text-orange-500 font-medium">
                {exam.passingPercentage}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full"
                style={{ width: `${exam.passingPercentage}%` }}
              />
            </div>

            <div className="text-center">
              <a
                href="#"
                className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
              >
                View details
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
