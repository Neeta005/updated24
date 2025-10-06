"use client"

import { useState } from "react"
import { Clock, Eye } from "lucide-react"
import { mockStudentData } from "@/data/exam-logs"
import type { StudentExamLog } from "@/types"
import { Pagination } from "@/components/ui/pagination"
import { DataTable } from "@/components/tables/data-table"
import { StatusBadge } from "@/components/tables/status-badge"
import { CircularProgress } from "@/components/tables/circular-progress"
import { ViolationBadge } from "@/components/tables/violation-badge"

interface Column<T> {
  key: keyof T | string
  header: string
  render: (row: T) => React.ReactNode
}

export function ExamLogsTable(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(mockStudentData.length / itemsPerPage)

  const handleViewLogs = (studentId: string): void => {
    // View logs logic would go here
  }

  const columns: Column<StudentExamLog>[] = [
    {
      key: "name",
      header: "Student",
      render: (student) => <span className="text-white font-medium">{student.name}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (student) => <StatusBadge status={student.status} />,
    },
    {
      key: "duration",
      header: "Duration",
      render: (student) => (
        <div className="flex items-center gap-2 text-slate-300">
          <Clock size={14} className="text-slate-400" />
          {student.duration}
        </div>
      ),
    },
    {
      key: "violations",
      header: "Violations",
      render: (student) => <ViolationBadge violations={student.violations} />,
    },
    {
      key: "focusScore",
      header: "Focus Score",
      render: (student) => <CircularProgress percentage={student.focusScore} color="#3b82f6" />,
    },
    {
      key: "seatedTime",
      header: "Seated Time",
      render: (student) => <CircularProgress percentage={student.seatedTime} color="#10b981" />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (student) => (
        <button
          onClick={() => handleViewLogs(student.id)}
          className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
        >
          <Eye size={14} />
          <span className="text-sm font-medium underline underline-offset-2 decoration-orange-400">View Logs</span>
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <DataTable<StudentExamLog> data={mockStudentData} columns={columns} className="rounded-lg" />

      <div className="pt-3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={mockStudentData.length}
        />
      </div>
    </div>
  )
}
