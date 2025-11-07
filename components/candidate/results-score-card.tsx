"use client"

import Image from "next/image"
import { CircularProgressBar } from "./circular-progress-bar"
import type { ResultsData } from "@/data/results-data"

interface ResultsScoreCardProps {
  data: ResultsData
}

export function ResultsScoreCard({ data }: ResultsScoreCardProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with Student Info */}
      <div className="flex items-start gap-6 mb-8">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-orange-500 flex-shrink-0">
          <Image
            src={data.student.photoUrl || "/placeholder.svg"}
            alt={data.student.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">{data.student.name}</h2>
          <p className="text-sm text-gray-400 mb-3">Student ID : {data.student.studentId}</p>
          <p className="text-sm text-gray-400">{data.student.field}</p>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-400 mb-1">Result</div>
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs text-gray-500">{data.result.time}</div>
              <div className="text-xs text-gray-500">{data.result.date}</div>
            </div>
            {data.result.status === "Pass" && (
              <span className="px-3 py-1 bg-green-900 text-green-400 text-xs font-semibold rounded">Status : Pass</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Exam Info & Passing Percentage */}
        <div className="col-span-1 space-y-6">
          {/* Exam Title */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">{data.exam.title}</h3>
            <p className="text-xs text-gray-400">{data.exam.course}</p>
          </div>

          {/* Total Marks Info */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Total Marks : {data.exam.totalMarks}</p>
            <p className="text-xs text-gray-400 mb-3">Passing Percentage</p>
            <p className="text-3xl font-bold text-orange-500 mb-3">80%</p>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "80%" }}></div>
            </div>
          </div>
        </div>

        {/* Middle: Grade & Score */}
        <div className="col-span-1">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">Student Grade</p>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <CircularProgressBar value={64} maxValue={100} color="blue" label={data.studentGrade} />
              </div>
              <p className="text-sm text-gray-400 mb-1">Total Score</p>
              <p className="text-2xl font-bold text-orange-400">
                {data.exam.totalScore}/{data.exam.totalMarks}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Subject Scores */}
        <div className="col-span-1">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h4 className="text-white font-semibold mb-4">Subject Score</h4>
            <div className="space-y-4">
              {data.subjectScores.map((subject) => (
                <div key={subject.name} className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">{subject.name}</span>
                  <div className="w-8 h-8 rounded-full border-2 border-slate-600 flex items-center justify-center">
                    <span
                      className={`text-xs font-bold ${
                        subject.gradeColor === "blue"
                          ? "text-blue-400"
                          : subject.gradeColor === "orange"
                            ? "text-orange-400"
                            : subject.gradeColor === "green"
                              ? "text-green-400"
                              : "text-yellow-400"
                      }`}
                    >
                      {subject.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
