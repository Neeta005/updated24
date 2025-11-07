"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
import type { ExamItem } from "@/data/candidate-dashboard"
import { subjects } from "@/data/candidate-dashboard" // ✅ imported here
import { GradientButton } from "@/components/ui/gradient-button"

interface ExamDetailsModalProps {
  exam: ExamItem
  isOpen: boolean
  onClose: () => void
}

export function ExamDetailsModal({ exam, isOpen, onClose }: ExamDetailsModalProps) {
  const [expandedSubject, setExpandedSubject] = useState<number | null>(0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-[#0b1220] w-full max-w-2xl rounded-2xl border border-[#1e293b] shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-8 pt-8 pb-4">
          <h2 className="text-2xl font-semibold text-white">Exam Details</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-white text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Exam Title */}
        <div className="px-8 pb-6">
          <h3 className="text-lg font-semibold text-white mb-1">{exam.title}</h3>
          <div className="text-sm text-gray-400 flex items-center justify-between">
            <span>Schedule</span>
            <span>Total Marks: 50</span>
          </div>

          {/* Schedule Row */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2 bg-[#1a2234] border border-[#27344d] px-4 py-2 rounded-md text-gray-300 text-sm">
              📅 <span>{exam.schedule}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1a2234] border border-[#27344d] px-4 py-2 rounded-md text-gray-300 text-sm">
              ⏰ <span>{exam.duration}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1a2234] border border-[#27344d] px-4 py-2 rounded-md text-gray-300 text-sm">
              ⏳ <span>2:40 min</span>
            </div>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="px-8 pb-6 space-y-3">
          {subjects.map((subject, index) => (
            <div key={index} className="border border-[#27344d] rounded-lg bg-[#111827]">
              <button
                onClick={() => setExpandedSubject(expandedSubject === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-white text-sm font-medium">{subject.name}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    expandedSubject === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedSubject === index && (
                <div className="border-t border-[#27344d] px-4 py-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
                    {subject.topics.map((topic, i) => (
                      <div key={i} className="text-sm text-gray-300 flex items-center gap-2">
                        <span className="text-orange-500 text-base leading-none">•</span>
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Skills + Done Row */}
        <div className="px-8 pb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Skills */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {exam.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#1a2234] border border-[#27344d] text-gray-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Done Button (Reusable GradientButton) */}
          <GradientButton onClick={onClose} size="lg" className="sm:w-auto w-full rounded-lg">
            Done
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
