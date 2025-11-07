"use client"

import { useState } from "react"
import { TabsSection } from "./tabs-section"
import { PerformanceGraph } from "./performance-graph"
import { SkillsCard } from "./skills-card"
import { ViolationsList } from "./violations-list"
import { CalendarSection } from "./calendar-section"
import { ExamDetailsModal } from "./exam-details-modal"
import { performanceGraphData, todayExams, skillsData, violationsData } from "@/data/candidate-dashboard"
import type { ExamItem } from "@/data/candidate-dashboard"

export function CandidateDashboardContent() {
  const [activeTab, setActiveTab] = useState<"today" | "upcoming" | "completed">("today")
  const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null)

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Performance Graph - Full Width */}
        <PerformanceGraph data={performanceGraphData} />

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Left - Exam Tabs */}
          <TabsSection
            activeTab={activeTab}
            onTabChange={setActiveTab}
            exams={todayExams}
            onViewSyllabus={setSelectedExam}
          />

          {/* Top Right - Calendar */}
          <CalendarSection />

          {/* Bottom Left - Skills Learned */}
          <div className="bg-card backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <h3 className="text-white text-base font-semibold mb-6">Skills Earned</h3>
            <div className="space-y-4">
              {skillsData.map((skill) => (
                <SkillsCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>

          {/* Bottom Right - Exam Violations */}
          <div className="bg-card backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <h3 className="text-white text-base font-semibold mb-6">Exam Violations</h3>
            <ViolationsList violations={violationsData} />
          </div>
        </div>
      </div>

      {selectedExam && (
        <ExamDetailsModal exam={selectedExam} isOpen={!!selectedExam} onClose={() => setSelectedExam(null)} />
      )}
    </>
  )
}
