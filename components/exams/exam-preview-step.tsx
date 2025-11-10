"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

interface ExamPreviewStepProps {
  formData: {
    category: string
    examName: string
    subject: string
    questionPaper: string
  }
  scheduledSlots: Array<{ date: string; time: string }>
  onSuccess: () => void
}

export function ExamPreviewStep({ formData, scheduledSlots, onSuccess }: ExamPreviewStepProps) {
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>(["Subject 1"])

  const toggleSubject = (subject: string) => {
    setExpandedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const syllabusSections = [
    {
      id: "Subject 1",
      title: "Subject 1: Networking",
      topics: ["Introduction to Network", "Routing & Switching", "HTML & CSS", "Client vs Server", "TCP/IP"],
    },
    {
      id: "Subject 2",
      title: "Subject 2: Networking",
      topics: ["Introduction to Network", "Routing & Switching", "HTML & CSS", "Client vs Server"],
    },
    {
      id: "Subject 3",
      title: "Subject 3: Networking",
      topics: ["Introduction to Network"],
    },
  ]

  const skills = ["UI/UX Design", "Web Dev", "Artificial Intelligence", "Data Analysis"]

  return (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* Left Column - Exam Details */}
  <div className="lg:col-span-2 space-y-6">
    {/* Exam Title and Marks */}
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-2xl text-white mb-2">Fundamentals of Programming</h3>
        <p className="text-slate-400">Schedule</p>
      </div>
      <div className="text-right">
        <p className="text-slate-400 text-sm">Total Marks 50</p>
      </div>
    </div>

    {/* Schedule Info */}
    <div className="flex gap-4 flex-wrap">
      {scheduledSlots.length > 0 && (
        <>
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-2">
            <span className="text-slate-400">📅</span>
            <span className="text-white">{scheduledSlots[0].date}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-2">
            <span className="text-slate-400">🕐</span>
            <span className="text-white">{scheduledSlots[0].time}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-2">
            <span className="text-slate-400">⏱️</span>
            <span className="text-white">2:40 min</span>
          </div>
        </>
      )}
    </div>

    {/* Syllabus */}
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <div className="space-y-2">
        {syllabusSections.map((section) => (
          <Collapsible key={section.id} open={expandedSubjects.includes(section.id)}>
            <CollapsibleTrigger
              onClick={() => toggleSubject(section.id)}
              className="flex items-center gap-2 w-full text-left text-white hover:text-orange-500 transition-colors"
            >
              {expandedSubjects.includes(section.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span className="font-medium">{section.title}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 pt-2">
              <div className="grid grid-cols-3 gap-3">
                {section.topics.map((topic) => (
                  <div key={topic} className="text-slate-400 text-sm flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>

    {/* Skills + Done Button in same row */}
    <div className="flex flex-wrap items-center gap-4 mt-4">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="bg-slate-700 text-slate-300 text-sm px-3 py-1 rounded-full">
            {skill}
          </span>
        ))}
      </div>
      <Button
        onClick={onSuccess}
        className="ml-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium"
      >
        Done
      </Button>
    </div>
  </div>

  {/* Remove Right Column - Done button moved */}
</div>

  )
}
