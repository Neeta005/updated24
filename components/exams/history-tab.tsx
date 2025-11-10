"use client"

import type { Exam } from "@/types/exam"
import { GradientButton } from "@/components/ui/gradient-button"

interface HistoryTabProps {
  exams: Exam[]
}

export function HistoryTab({ exams }: HistoryTabProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {exams.map((exam) => (
        <div
          key={exam.id}
  className="bg-card rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors flex flex-col justify-between h-[400px] w-full sm:w-[360px]"
        >
          {/* Exam Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{exam.title}</h3>
            <p className="text-slate-400 text-sm">Course : {exam.course}</p>
            <p className="text-slate-400 text-sm">Subject : {exam.subject}</p>
          </div>

          {/* Date & Time */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 my-4 text-slate-300 text-sm">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>{exam.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🕐</span>
              <span>{exam.time}</span>
            </div>
          </div>

          {/* Marks & Progress */}
          <div className="mb-4">
            <p className="text-slate-400 text-sm mb-2">
              Marks : <span className="text-white font-medium">{exam.marks}</span>
            </p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Passing Percentage</span>
              <span className="text-orange-500 font-medium">{exam.passingPercentage}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full"
                style={{ width: `${exam.passingPercentage}%` }}
              />
            </div>
          </div>

          {/* Declare Result Button */}
          <GradientButton onClick={() => console.log("Declare Result clicked")} size="md" className="w-full">
            Declare Result
          </GradientButton>
        </div>
      ))}
    </div>
  )
}
