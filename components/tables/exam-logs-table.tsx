"use client"

import { useState, useMemo } from "react"
import { Clock, Eye } from "lucide-react"
import type { StudentExamLog } from "@/types"
import { CircularProgress } from "@/components/ui/circular-progress"
import { useRouter } from "next/navigation"
import { Pagination } from "@/components/ui/pagination" // ✅ Your existing component

interface ExamLogsTableProps {
  searchTerm?: string
  data: StudentExamLog[]
}

export function ExamLogsTable({ searchTerm = "", data }: ExamLogsTableProps) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm) return data
    return data.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm, data])

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleViewLogs = (studentId: string) => {
    router.push(`/exam-logs/${studentId}`)
  }

  const getViolationColor = (violations: number) => {
    if (violations <= 3) return "bg-green-500/20 text-green-400"
    if (violations <= 7) return "bg-orange-500/20 text-orange-400"
    return "bg-red-500/20 text-red-400"
  }

  const getStatusBadge = (status: string) => {
    if (status === "completed") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
          Completed
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
        In Progress
      </span>
    )
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-black">
              <th className="text-left py-2 px-4 text-slate-300 font-medium">Student</th>
              <th className="text-left py-2 px-4 text-slate-300 font-medium">Status</th>
              <th className="text-left py-2 px-4 text-slate-300 font-medium">Duration</th>
              <th className="text-left py-2 px-4 text-slate-300 font-medium">Violations</th>
              <th className="text-left py-2 px-4 text-slate-300 font-medium">Focus Score</th>
              <th className="text-left py-2 px-4 text-slate-300 font-medium">Seated Time</th>
              <th className="text-left py-2 px-4 text-slate-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((student: StudentExamLog) => (
              <tr key={student.id} className="border-b border-border/30 bg-card hover:bg-muted">
                <td className="py-2 px-4 text-white font-medium">{student.name}</td>
                <td className="py-2 px-4">{getStatusBadge(student.status)}</td>
                <td className="py-2 px-4 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-400" />
                    {student.duration}
                  </div>
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`inline-flex items-center justify-center size-9 h-5 rounded-full text-[11px] font-medium ${getViolationColor(
                      student.violations,
                    )}`}
                  >
                    {student.violations < 10 ? `0${student.violations}` : student.violations}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <CircularProgress percentage={student.focusScore} color="#3b82f6" />
                </td>
                <td className="py-2 px-4">
                  <CircularProgress percentage={student.seatedTime} color="#10b981" />
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleViewLogs(student.id)}
                    className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <Eye size={14} />
                    <span className="text-sm font-medium underline underline-offset-2 decoration-orange-400">
                      View Logs
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Your existing Pagination component - Simple & Clean */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {filteredData.length === 0 && searchTerm && (
        <div className="text-center py-8 text-slate-400">No students found matching "{searchTerm}"</div>
      )}
    </div>
  )
}