"use client"

import { useRouter } from "next/navigation"
import { Calendar, Clock } from "lucide-react"
import type { ExamItem } from "@/data/candidate-dashboard"

interface ExamCardProps {
  exam: ExamItem
}

export function ExamCard({ exam }: ExamCardProps) {
  const router = useRouter()

  const handleTakeAssessment = () => {
    router.push(`/candidate/take-exam?examId=${exam.id}`)
  }

  return (
    <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-white font-medium text-sm">{exam.title}</h3>
       <button
  className=" hover:bg-emerald-900 text-emerald-600 text-xs px-4 py-1.5 rounded font-medium transition-colors"
  onClick={handleTakeAssessment}
>
  Take Assessment
</button>

      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {exam.tags.map((tag) => (
          <span key={tag} className=" text-gray-300 text-xs px-2.5 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Schedule {exam.schedule}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Duration {exam.duration}
          </span>
        </div>
        <button className="text-red-400 hover:text-red-300 text-xs font-medium">View Syllabus</button>
      </div>
    </div>
  )
}

