"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { examOptions, kpis, resultsRows, gradeLegend } from "@/data/results"
import { CircularProgress } from "@/components/ui/circular-progress"
import { Pagination } from "@/components/ui/reusable-pagination"
import { SelectDropdown } from "@/components/ui/SelectDropdown"
import Image from "next/image"
import { Eye } from "lucide-react"

export function ResultsPage() {
  const [exam, setExam] = useState(examOptions[0]?.label ?? "")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7
  const totalItems = resultsRows.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => setCurrentPage(page)

  const currentResults = resultsRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const router = useRouter()

  return (
    <main className="flex-1 p-6 text-white min-h-screen ">
      <h1 className="text-2xl font-semibold text-white px-7 mt-2">Exam Results</h1>

      <div className="rounded-2xl p-6">
        {/* Select Exam Section */}
        <div className="mb-8 p-5 rounded-lg bg-card border border-slate-800">
          <h2 className="text-lg font-medium text-white mb-4">Select Exam</h2>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 w-full">
              <SelectDropdown
                value={exam}
                onChange={setExam}
                options={[
                  { label: "UI Designer Level 1 Assessment", value: "UI Designer Level 1 Assessment" },
                  ...examOptions,
                ]}
              />
            </div>

            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2">
              <Image src="/icons/export.png" alt="PDF Icon" width={16} height={16} />
              PDF Export
            </button>
          </div>
        </div>

        {/* KPI Cards with images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-card rounded-xl pt-1 px-3 pb-3 border border-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-md font-bold leading-tight">{kpi.title}</span>
                <div className="size-10 mt-2 relative">
                  <Image
                    src={kpi.iconPath || "/placeholder.svg"}
                    alt={kpi.title}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>

              <div className="text-2xl font-bold text-white mt-1 mb-1">{kpi.value}</div>

              <div
                className={`text-xs flex items-center gap-1 font-medium
                  ${
                    i === 1
                      ? "text-blue-400" // center card -> neutral (blue)
                      : kpi.delta.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                  }`}
              >
                <span
                  className={`text-sm leading-none ${
                    i === 1 ? "text-blue-300" : kpi.delta.startsWith("+") ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {i === 1
                    ? "−" // Dash for center card
                    : kpi.delta.startsWith("+")
                      ? "↑" // Small upward arrow
                      : "↓"}{" "}
                  {/* Small downward arrow */}
                </span>
                <span className="tracking-wide">{kpi.delta} from last exams</span>
              </div>
            </div>
          ))}
        </div>

        {/* Student Results Table */}
        <div className="bg-card rounded-xl border border-slate-900 overflow-hidden">
          {/* Header + Search */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Student Results</h3>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search by Student Name */}
              <div className="relative max-w-xs w-full">
                <Image
                  src="\icons\studenttt 1.png" // <-- place your icon here
                  alt="Search Student"
                  width={16}
                  height={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70"
                />
                <input
                  type="text"
                  placeholder="Search Student"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Search by Email */}
              <div className="relative max-w-xs w-full">
                <Image
                  src="\icons\mail.png" // <-- another icon for email search
                  alt="Search Email"
                  width={16}
                  height={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70"
                />
                <input
                  type="text"
                  placeholder="Search Email"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Table - Its Own Div */}
          <div className="p-6">
            <div className="overflow-x-auto rounded-lg border border-slate-700">
              <table className="w-full">
                <thead className="bg-black">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Student Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Score</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Violations</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Grade</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>

                <tbody className="bg-slate-800">
                  {currentResults.map((student) => {
                    const gradeColor = gradeLegend.find((g) => g.code === student.grade)?.color || "#94a3b8"
                    return (
                      <tr
                        key={student.id}
                        className="border-t border-slate-600 hover:bg-slate-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-white font-medium">{student.name}</td>
                        <td className="px-6 py-4 text-slate-300">{student.email}</td>
                        <td className="px-6 py-4 text-white">{student.score}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center justify-center min-w-[2rem] h-6 px-2 rounded-full text-xs font-medium text-white ${
                              student.violations > 5 ? "bg-red-500/30" : "bg-green-500/30"
                            }`}
                          >
                            {student.violations}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center justify-center min-w-[2rem] h-6 px-2 rounded-full text-xs font-medium text-white ${
                              student.grade === "A1"
                                ? "bg-[#7dafc6]/30"
                                : student.grade === "A2"
                                  ? "bg-[#ff1818]/30"
                                  : student.grade === "B1"
                                    ? "bg-[#4bd164]/30"
                                    : student.grade === "B2"
                                      ? "bg-[#fbbf24]/30"
                                      : student.grade === "C1"
                                        ? "bg-[#ef4444]/30"
                                        : "bg-slate-500/30"
                            }`}
                          >
                            {student.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => router.push(`/exam-logs/${student.id}`)}
                            className="p-2 rounded-lg border border-white hover:bg-white/10 transition-colors flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4 text-white" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>

                {/* ✅ Pagination inside tfoot */}
                <tfoot className="bg-slate-800 border-t border-slate-600">
                  <tr>
                    <td colSpan={6} className="">
                      <div className="">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Grade Legend */}
          <div className="mt-6 rounded-2xl p-6 border border-slate-600">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {gradeLegend.map((grade) => (
                <div key={grade.code} className="flex items-center gap-4 rounded-lg">
                  {/* Circular Progress */}
                  <div className="relative flex-shrink-0">
                    <CircularProgress
                      percentage={grade.percentage}
                      size={60}
                      strokeWidth={4}
                      color={grade.color}
                      showPercentage={false} // hide default percentage
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm">
                      {grade.code}
                    </div>
                  </div>

                  {/* Texts on the right of circle */}
                  <div className="flex flex-col justify-center">
                    <span className="text-white font-semibold text-sm">
                      {grade.label.split(" ")[0]} {/* e.g., 50%-70% */}
                    </span>
                    <span className="text-slate-400 text-xs">
                      {grade.label.split(" ").slice(1).join(" ")} {/* e.g., Good */}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
